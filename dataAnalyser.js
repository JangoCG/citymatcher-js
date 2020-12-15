const data = require('./data.json');
const operations = require('./operations.json');

const { cities } = data;
let results = [];

operations.operations.forEach((operator) => {
  switch (operator.name) {
    case 'important':
      evaluateOperator(
        filterArray(cities, operator.filter),
        operator.func,
        operator.attrib,
        operator.name
      );
      break;
    case 'information':
      evaluateOperator(
        filterArray(cities, operator.filter),
        operator.func,
        operator.attrib,
        operator.name
      );
      break;
  }
});

function evaluateOperator(data, mathFunction, attribut, name) {
  switch (mathFunction) {
    case 'average':
      const average = calculateAverage(data, attribut).toFixed(2);
      results.push(createResObject(name, average));
      break;
    case 'sum':
      const sum = calculateSum(data, attribut).toFixed(2);
      results.push(createResObject(name, sum));
      break;
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
    value
  };
}
