import Component from "@glimmer/component";

export default class ServerUptime extends Component {
  args: { days: any[] };

  get upDays() {
    return this.args.days.reduce((upDays, day) => {
      return upDays += (day.up ? 1 : 0);
    }, 0);
  }

  get streak() {
    let [max] = this.args.days.reduce(([max, streak], day) => {
      if (day.up && streak + 1 > max) {
        return [streak + 1, streak + 1];
      } else if (day.up) {
        return [max, streak + 1];
      } else {
        return [max, 0];
      }
    }, [0, 0]);

    return max;
  }
}
