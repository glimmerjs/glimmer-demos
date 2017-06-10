import Component, { tracked } from "@glimmer/component";

export default class GlimmerDemos extends Component {
  @tracked currentDemo: string;
  demos = [
    { component: 'uptime-boxes', name: '📦 Uptime Boxes' },
    { component: 'ripples-demo', name: '💧 Ripples' },
    { component: 'db-monster', name: '👹 DB Monster' },
    { component: 'conways-demo', name: '🐛 Conway\'s Game of Life' },
    { component: 'glimmer-visualizer', name: '✨ Glimmer Visualizer' },
  ];

  setCurrentDemo(demo: string) {
    this.currentDemo = demo;
  }
}
