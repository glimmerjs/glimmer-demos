export default function ppOpcode(arr) {
  let opcode = <any>arr[0];
  let output = opcode.type.toUpperCase();

  if (opcode.args || opcode.details) {
    output += '(';

    if (opcode.args && opcode.args.length) {
      output += opcode.args.join(', ');
    }

    if (opcode.details) {
      let keys = Object.keys(opcode.details);

      if (keys.length) {
        if (opcode.args && opcode.args.length) {
          output += ', ';
        }

        output += keys.map(key => `${key}=${opcode.details[key]}`).join(', ');;
      }
    }

    output += ')';
  }

  return output;
};
