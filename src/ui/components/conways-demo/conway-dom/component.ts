import Component from "@glimmer/component";

interface State {
  isAlive: boolean[];
  elements: HTMLElement[];
}

export default class ConwayDOM extends Component {
  state: State = { isAlive: [], elements: [] };
  animationFrameRequestId: number;

  didInsertElement() {
    this.insertCells();
    this.animationFrameRequestId = requestAnimationFrame(this.rerenderDOM);
  }

  willDestroy() {
    cancelAnimationFrame(this.animationFrameRequestId);
  }

  rerenderDOM = () => {
    this.args.world.advance();
    this.args.world.forEach(this.updateCell);
    this.animationFrameRequestId = requestAnimationFrame(this.rerenderDOM);
  }

  updateCell = (cell, i) => {
    let el = this.state.elements[i];
    let oldAlive = this.state.isAlive[i];
    let newAlive = cell.isAlive;

    if (oldAlive !== newAlive) {
      this.state.isAlive[i] = newAlive;
      newAlive ? el.classList.add('alive') : el.classList.remove('alive');
    }
  }

  insertCells() {
    let div = document.querySelector('.world');

    this.args.world.forEach((cell, i) => {
      this.state.isAlive[i] = cell.isAlive;

      let el = this.state.elements[i] = document.createElement('div');
      el.classList.add('organism-cell');
      el.style.top = cell.y + 'px';
      el.style.left = cell.x + 'px';

      if (cell.isAlive) {
        el.classList.add('alive');
      }

      div.appendChild(el);
    });
  }
}
