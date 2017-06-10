import Component, { tracked } from "@glimmer/component";

export default class GlimmerDemos extends Component {
  @tracked currentDemo;
  demos = ['uptime-boxes', 'ripples-demo', 'db-monster', 'conways-demo', 'glimmer-visualizer'];

  setCurrentDemo(demo) {
    this.currentDemo = demo;
  }
}
