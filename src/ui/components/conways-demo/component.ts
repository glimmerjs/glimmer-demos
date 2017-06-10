import Component, { tracked } from "@glimmer/component";

interface World {
  advance(): void;
  forEach(callback: (cell: Cell, index: number) => void): void;
}

interface Cell {
  key: string;
  x: number;
  y: number;
  isAlive: boolean;
}

function rerender() {
  window['rerender']();
}

function getWorld(): World {
  return window['require']('worlds/one').default;
}

export default class ConwayDemo extends Component {
  @tracked private demo: 'Glimmer' | 'DOM' | null = null;
  @tracked private world: World = getWorld();

  willDestroy() {
    this.stop();
  }

  @tracked('demo')
  get isRunning(): boolean {
    return this.demo !== null;
  }

  @tracked('demo')
  get isGlimmer(): boolean {
    return this.demo === 'Glimmer';
  }

  @tracked('demo')
  get isDOM(): boolean {
    return this.demo === 'DOM';
  }

  start(demo: 'Glimmer' | 'DOM') {
    this.demo = demo;
    this.tick();
  }

  stop() {
    this.demo = null;
  }

  tick = () => {
    if (this.isRunning) {
      this.world.advance();
      rerender();
      requestAnimationFrame(this.tick);
    }
  }
}
