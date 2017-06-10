import Component, { tracked } from "@glimmer/component";

export default class GlimmerDemos extends Component {
  @tracked currentDemo;
  demos = ['uptime-boxes', 'ripples-demo'];

  setCurrentDemo(demo) {
    this.currentDemo = demo;
  }
}
