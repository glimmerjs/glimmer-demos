import Component, { tracked } from '@glimmer/component';

function elapsedClass(elapsed) {
  if (elapsed >= 10.0) {
    return 'elapsed warn_long';
  } else if (elapsed >= 1.0) {
    return 'elapsed warn';
  } else {
    return 'elapsed short';
  }
}

function lpad(str, padding, toLength) {
  return padding.repeat((toLength - str.length) / padding.length).concat(str);
}

function formatElapsed(value) {
  let str = parseFloat(value).toFixed(2);
  if (value > 60) {
    let minutes = Math.floor(value / 60);
    let comps = (value % 60).toFixed(2).split('.');
    let seconds = lpad(comps[0], '0', 2);
    let ms = comps[1];
    str = minutes + ':' + seconds + '.' + ms;
  }
  return str;
}

export default class DbmonDatabase extends Component {
  @tracked('args')
  get queries() {
    let samples = this.args.db.samples;
    return samples[samples.length - 1].queries;
  }

  @tracked('queries')
  get topFiveQueries() {
    let { queries } = this;
    let topFiveQueries = queries.slice(0, 5);

    while (topFiveQueries.length < 5) {
      topFiveQueries.push({ query: '' });
    }

    return topFiveQueries.map((query, index) => ({
      key: index + '',
      query: query.query,
      elapsed: query.elapsed ? formatElapsed(query.elapsed) : '',
      className: elapsedClass(query.elapsed),
    }));
  }

  @tracked('queries')
  get countClassName() {
    let { queries } = this;
    let countClassName = 'label';

    if (queries.length >= 20) {
      countClassName += ' label-important';
    } else if (queries.length >= 10) {
      countClassName += ' label-warning';
    } else {
      countClassName += ' label-success';
    }

    return countClassName;
  }
}
