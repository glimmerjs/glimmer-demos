import Component, { tracked } from '@glimmer/component';
import ExponentialMovingAverage from './ema';

const ROWS = 100;

export default class DbMonster extends Component {
  @tracked playing = false;
  @tracked model = null;
  @tracked fps: number;

  lastFrame: number;
  fpsMeter: ExponentialMovingAverage;
  animationFrameRequestId: number;

  didInsertElement() {
    this.model = this.generateData();
  }

  willDestroy() {
    this.stop();
  }

  toggle() {
    if (this.playing) {
      this.stop();
    } else {
      this.start();
    }
  }

  start() {
    this.playing = true;
    this.fpsMeter = new ExponentialMovingAverage(2/121);
    this.update();
  }

  stop() {
    this.playing = false;
    this.fps = null;
    this.lastFrame = null;
    cancelAnimationFrame(this.animationFrameRequestId);
  }

  update = () => {
    let thisFrame = window.performance.now();

    this.model = this.generateData(this.model);

    if (this.lastFrame) {
      this.fps = Math.round(this.fpsMeter.push(1000 / (thisFrame - this.lastFrame)));
    }

    this.lastFrame = thisFrame;
    this.animationFrameRequestId = requestAnimationFrame(this.update);
  }

  generateData(oldData: any = {}) {
    let rawData = this.getData();

    let databases = (oldData && oldData.databases) || {};
    let databaseArray = [];

    let data = { databases, databaseArray };

    Object.keys(rawData.databases).forEach((name) => {
      let sampleInfo = rawData.databases[name];

      if (!databases[name]) {
        databases[name] = { name, samples: [] };
      }

      let samples = databases[name].samples;

      samples.push({
        time: rawData.start_at,
        queries: sampleInfo.queries,
      });

      if (samples.length > 5) {
        samples.splice(0, samples.length - 5);
      }

      databaseArray.push(databases[name]);
    });

    return data;
  }

  getData() {
    // generate some dummy data
    let data = {
      start_at: new Date().getTime() / 1000,
      databases: {},
    };

    for (let i = 1; i <= ROWS; i++) {
      data.databases['cluster' + i] = { queries: [] };
      data.databases['cluster' + i + 'slave'] = { queries: [] };
    }

    Object.keys(data.databases).forEach((name) => {
      let database = data.databases[name];
      let r = Math.floor((Math.random() * 10) + 1);

      for (let i = 0; i < r; i++) {
        let q = {
          canvas_action: null,
          canvas_context_id: null,
          canvas_controller: null,
          canvas_hostname: null,
          canvas_job_tag: null,
          canvas_pid: null,
          elapsed: Math.random() * 15,
          query: 'SELECT blah FROM something',
          waiting: Math.random() < 0.5,
        };

        if (Math.random() < 0.2) {
          q.query = '<IDLE> in transaction';
        }

        if (Math.random() < 0.1) {
          q.query = 'vacuum';
        }

        database.queries.push(q);
      }

      database.queries = database.queries.sort((a, b) => b.elapsed - a.elapsed);
    });

    return data;
  }
}
