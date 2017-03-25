import Component, { tracked } from "@glimmer/component";

export default class UptimeDay extends Component {
  @tracked color: string;
  @tracked memo: string;

  didUpdate() {
    this.color = this.args.day.up ? '#8cc665' : '#ccc';
    this.memo = this.args.day.up ? 'Servers operational!' : 'Red alert!';
  }
}
