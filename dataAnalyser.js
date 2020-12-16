const dataSource = require('./data.json');
const operations = require('./operations.json');
const fs = require('fs');

let results = [];

// Execute all given operations on the data source.
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

/**
 * @desc Call math functions to evaluate the operation
 * @param {array} data Must be a array of objects
 * @param {string} func The function to be evaluated, this can be "min", "max", "sum" or "average".
 * @param {string} attribut Name of the property to be evaluated.
 * @param {string} type Whether the selected attribute is a child node or an attribute
 * @return {number} result of the calculation
 */
function evaluateOperation(data, func, attribut, type) {
  switch (func) {
    case 'average':
      return calculateAverage(data, attribut, type);
    case 'sum':
      return calculateSum(data, attribut, type);
    case 'min':
      return getMin(data, attribut, type);
    case 'max':
      return getMax(data, attribut, type);
    default:
      console.log('Invalid input');
  }
}
/**
 * @desc Returns a new array only containing data which matched the given regex
 * @param {array} data Array that will be filtered
 * @param {string} filter regex pattern.
 * @return {array} only containing data that matched the regex
 */
function filterArrayByMatch([...data], filter) {
  const regex = new RegExp(filter);
  return data.filter((entry) => entry.name.match(regex));
}

function createResObject(name, value) {
  return {
    name,
    value: parseFloat(value)
  };
}

function calculateAverage([...values], attribut, type) {
  return calculateSum(values, attribut, type) / values.length;
}

function calculateSum([...values], attribut, type) {
  return type === 'attrib'
    ? values.reduce((a, b) => a + b[attribut], 0)
    : values.reduce(
        (a, b) => a + b.values.find((value) => value.name === attribut).value,
        0
      );
}

/**
 * @desc Calculate the minimum
 * @param {array} values To be calculated values
 * @param {string} attribut Name of the property to be evaluated.
 * @param {string} type Whether the selected attribute is a child node or an attribute
 * @return {number} Minimum value
 */
function getMin([...values], attribut, type) {
  if (type === 'attrib') {
    const min = values.reduce((prev, curr) =>
      prev < curr[attribut] ? prev : curr
    );
    return min[attribut];
  } else if (type === 'sub') {
    return values.reduce((a, b) =>
      a < (b.values.find((value) => value.name === attribut).value, 0)
        ? a
        : b.values.find((value) => value.name === attribut).value
    );
  }
}
/**
 * @desc Calculate the maximum
 * @param {array} values To be calculated values
 * @param {string} attribut Name of the property to be evaluated.
 * @param {string} type Whether the selected attribute is a child node or an attribute
 * @return {number} maximum value
 */
function getMax([...values], attribut, type) {
  if (type === 'attrib') {
    const max = values.reduce((a, b) => (a[attribut] > b[attribut] ? a : b));
    return max[attribut];
  } else if (type === 'sub') {
    return values.reduce((a, b) =>
      a > (b.values.find((value) => value.name === attribut).value, 0)
        ? a
        : b.values.find((value) => value.name === attribut).value
    );
  }
}

createJsonFile('results.json');

function createJsonFile(filename) {
  try {
    fs.writeFile(
      filename,
      JSON.stringify(formattedObject(results), null, 2),
      (err) => {
        if (err) throw err;
        console.log('the file has been saved');
      }
    );
  } catch (err) {
    console.log(err);
  }
}

/**
 * @desc Returns the correctly formatted object
 * @param {array} data Data for the object
 * @return {object} correctly formatted object
 */
function formattedObject([...data]) {
  return {
    results: data
  };
}
