const dataSource = require('./data.json');
const operations = require('./operations.json');
const fs = require('fs');

let results = [];

for (const key in dataSource) {
  const data = dataSource[key];
  operations.operations.map((operation) => {
    const result = evaluateOperation(
      filterArrayByMatch(data, operation.filter),
      operation.func,
      operation.attrib,
      operation.type
    );
    results.push(createResObject(operation.name, result.toFixed(2)));
  });
}

const jsonResult = {
  results
};

try {
  fs.writeFile(
    'testResults.json',
    JSON.stringify(
      jsonResult,
      null,
      /*    To do: Add trailing zeros for integer values
        (key, value) => {
          const missingTrailingZeros = value.results.filter(
            (item) => !item.value.toString().includes('.')
          );
          console.log(missingTrailingZeros);
          missingTrailerZeros.value.to
        }, */
      2
    ),
    (err) => {
      if (err) throw err;
      console.log('the file has been saved');
    }
  );
} catch (err) {
  console.log(err);
}

function evaluateOperation(data, mathFunction, attribut, evaluationType) {
  switch (mathFunction) {
    case 'average':
      const average = calculateAverage(data, attribut, evaluationType);
      return average;
    case 'sum':
      const sum = calculateSum(data, attribut, evaluationType);
      return sum;
    case 'min':
      const min = getMin(data, attribut, evaluationType);
      return min;
    case 'max':
      const max = data.reduce((prev, curr) =>
        prev[attribut] < curr[attribut] ? curr : prev
      );
      return max[attribut];
  }
}

function filterArrayByMatch([...data], filter) {
  const regex = new RegExp(filter);
  return data.filter((entry) => entry.name.match(regex));
}

function calculateSum([...values], attribut, type) {
  if (type === 'attrib') {
    let sum = values.reduce((a, b) => a + b[attribut], 0);
    return sum;
  } else if (type === 'sub') {
    const sum = values.reduce(
      (a, b) => a + b.values.find((value) => value.name === attribut).value,
      0
    );
    return sum;
  }
}

function getMin([...values], attribut, type) {
  if (type === 'attrib') {
    const min = values.reduce((prev, curr) =>
      prev < curr[attribut] ? prev : curr
    );
    return min[attribut];
  } else if (type === 'sub') {
    const min = values.reduce((prev, curr) =>
      prev < (curr.values.find((value) => value.name === attribut).value, 0)
        ? prev
        : curr.values.find((value) => value.name === attribut).value
    );
    return min;
  }
}

function calculateAverage([...values], attribut, type) {
  const sum = calculateSum(values, attribut, type);
  return sum / values.length;
}

function createResObject(name, value) {
  return {
    name,
    value: Number(parseFloat(value))
  };
}
