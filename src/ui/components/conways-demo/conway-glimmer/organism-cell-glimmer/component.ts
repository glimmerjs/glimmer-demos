import Component, { tracked } from "@glimmer/component";

export default class OrganismCellGlimmer extends Component {
  @tracked('args')
  get elementClass() {
    if (this.args.cell.isAlive) {
      return 'alive';
    }
  }
}
