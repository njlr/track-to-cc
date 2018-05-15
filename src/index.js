import trackParser from './track-parser.js';

const input = document.getElementById('input');

const outputCsv = document.getElementById('output-csv');
const outputFull = document.getElementById('output-full');

const convert = () => {

  const csvData = input.value.split(/[\s]+/)
    .map(x => x.trim())
    .filter(x => x.length > 0)
    .map(x => {
      try {
        const { account = '', expMonth = '', expYear = '' } = new trackParser(x);
        return [ x, account, expMonth + '/' + expYear ].join(',');
      } catch (error) {
        return 'INVALID';
      }
    });
  
  const fullData = input.value.split(/[\s]+/)
    .map(x => x.trim())
    .filter(x => x.length > 0)
    .map(x => {
      try {
        return x + '\n' + new trackParser(x).dump();
      } catch (error) {
        return 'INVALID';
      }
    });
  
  outputCsv.value = 'trackData,creditCardNumber,creditCardExpiry\n' + csvData.join('\n');
  outputFull.value = fullData.join('\n\n');
};

document.getElementById('convert').onclick = convert;
