import Component, { tracked } from "@glimmer/component";

export default class GlimmerDemos extends Component {
  @tracked currentDemo;
  demos = ['uptime-boxes'];

  setCurrentDemo(demo) {
    this.currentDemo = demo;
  }
}
