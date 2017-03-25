import Component, { tracked } from "@glimmer/component";

export default class UptimeBoxes extends Component {
  servers = generateServers()

  // didInsertElement() {
  //   setInterval(() => {
  //     // this.servers = generateServers();
  //   }, 1);
  // }
}

function generateServers() {
  return [
    generateServer("Stefan's Server"),
    generateServer("Godfrey's Server"),
    generateServer("Yehuda's Server")
  ];
}

function generateServer(name: string) {
  let days = [];

  for (let i=0; i<=364; i++) {
    let up = Math.random() > 0.2;
    days.push({ number: i, up });
  }

  return { name, days };
}
