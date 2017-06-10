import Component from "@glimmer/component";

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
  private actions: object;

  private demo: 'Glimmer' | 'DOM' | null = null;
  private world: World = getWorld();

  constructor(injections: object) {
    super(injections);

    this.actions = {
      startGlimmer: () => this.start('Glimmer'),
      startDOM: () => this.start('DOM'),
      stop: () => this.stop(),
      tick: () => this.tick()
    };
  }

  get isRunning(): boolean {
    return this.demo !== null;
  }

  get isGlimmer(): boolean {
    return this.demo === 'Glimmer';
  }

  get isDOM(): boolean {
    return this.demo === 'DOM';
  }

  start(demo: 'Glimmer' | 'DOM') {
    this.demo = demo;
    this.tick();
  }

  stop() {
    this.demo = null;
    rerender();
  }

  tick() {
    if (this.isRunning) {
      this.world.advance();
      rerender();
      requestAnimationFrame(this.actions['tick']);
    }
  }
}
