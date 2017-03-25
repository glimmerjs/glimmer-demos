import Component from "@glimmer/component";

export default class UptimeDay extends Component {
  get color() {
    return this.args.day.up ? '#8cc665' : '#ccc';
  }

  get memo() {
    return this.args.day.up ? 'Servers operational!' : 'Red alert!';
  }
}
