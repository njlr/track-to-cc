import trackParser from './track-parser.js';

const input = document.getElementById('input');

const output = document.getElementById('output');

const convert = () => {
  const parsedData = input.value.split(/[\s]+/)
    .map(x => x.trim())
    .filter(x => x.length > 0)
    .map(x => {
      try {
        return x + '\n' + new trackParser(x).dump();
      } catch (error) {
        return 'INVALID';
      }
    });
  output.value = parsedData.join('\n\n');
};

document.getElementById('convert').onclick = convert;
