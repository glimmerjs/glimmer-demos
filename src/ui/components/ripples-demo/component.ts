import Component, { tracked } from '@glimmer/component';

interface Point {
  timestamp: number;
  opacity: number;
  size: number;
  x: number;
  y: number;
}

export default class RipplesDemo extends Component {
  @tracked width = window.innerWidth;
  @tracked height = window.innerHeight;
  @tracked count = 0;
  @tracked points: Point[] = [];
  refreshScheduled = false;

  constructor(options) {
    super(options);

    window.addEventListener('resize', this.windowResizeHandler);
    document.addEventListener('mousemove', this.mouseMoveHandler);
  }

  willDestroy() {
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    window.removeEventListener('resize', this.windowResizeHandler);
  }

  windowResizeHandler = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  mouseMoveHandler = (event: MouseEvent) => {
    this.points = [ ...this.points, {
      timestamp: window.performance.now(),
      opacity: 1.0,
      size: 0.0,
      x: event.layerX,
      y: event.layerY,
    }];

    if (!this.refreshScheduled) {
      this.tick();
    }
  }

  tick = () => {
    let timestamp = window.performance.now();
    this.refreshScheduled = false;

    if (!this.points.length) {
      return;
    }

    this.points = this.points.map((point) => {
      let delta = timestamp - point.timestamp;
      let opacity = Math.exp(-delta / 250);
      let size = Math.max(delta / 10, 0);

      if (opacity > 0.001) {
        return { ...point, opacity, size };
      }
    }).filter(v => v);

    this.count = this.points.length;

    window.requestAnimationFrame(this.tick);
    this.refreshScheduled = true;
  }
}
