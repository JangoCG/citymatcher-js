const data = require('./data.json');
const operations = require('./operations.json');
const fs = require('fs');

const { cities } = data;
let results = [];

operations.operations.map((operation) => {
  const result = evaluateOperation(
    filterArray(cities, operation.filter),
    operation.func,
    operation.attrib,
    operation.name
  ).toFixed(2);
  results.push(createResObject(operation.name, result));
});

const jsonResult = {
  results
};

// try {
//   fs.writeFile(
//     'testResults.json',
//     JSON.stringify(
//       jsonResult,
//       null,
//       /*    To do: Add trailing zeros for integer values
//         (key, value) => {
//           const missingTrailingZeros = value.results.filter(
//             (item) => !item.value.toString().includes('.')
//           );
//           console.log(missingTrailingZeros);
//           missingTrailerZeros.value.to
//         }, */
//       2
//     ),
//     (err) => {
//       if (err) throw err;
//       console.log('the file has been saved');
//     }
//   );
// } catch (err) {
//   console.log(err);
// }

function evaluateOperation(data, mathFunction, attribut) {
  switch (mathFunction) {
    case 'average':
      const average = calculateAverage(data, attribut);
      return average;
    case 'sum':
      const sum = calculateSum(data, attribut);
      return sum;
    case 'min':
      const min = data.reduce((prev, curr) =>
        prev[attribut] < curr[attribut] ? prev : curr
      );
      return min[attribut];
    case 'max':
      const max = data.reduce((prev, curr) =>
        prev[attribut] < curr[attribut] ? curr : prev
      );
      return max[attribut];
  }
}

function filterArray([...cities], filter) {
  const regex = new RegExp(filter);
  return cities.filter((entry) => entry.name.match(regex));
}

function calculateSum([...values], attribut) {
  let sum = 0;
  values.forEach((item) => {
    sum += item[attribut];
  });
  return sum;
}

function calculateAverage([...values], attribut) {
  const sum = calculateSum(values, attribut);
  return sum / values.length;
}

function createResObject(name, value) {
  return {
    name,
    value: Number(parseFloat(value))
  };
}
