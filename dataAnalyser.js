const data = require('./data.json');
const operations = require('./operations.json');

const { cities } = data;
let results = [];
operations.operations.forEach((operator) => {
  if (operator.name === 'important') {
    const regex = new RegExp(operator.filter);
    const filteredCities = data.cities.filter((entry) =>
      entry.name.match(regex)
    );

    let populationSum = 0;
    filteredCities.forEach((city) => {
      populationSum += city.population;
    });
    let averagePopulation = (populationSum / filteredCities.length).toFixed(2);
    let result = {
      name: operator.name,
      value: averagePopulation
    };
    results.push(result);
  } else if (operator.name === 'information') {
    const filteredArray = filterArray(cities, operator.filter);
    console.log(filteredArray);
    let sum = 0;
    filteredArray.forEach((city) => (sum += city[operator.attrib]));
    let result = {
      name: operator.name,
      value: sum
    };
    console.log(result);
  }
});

function filterArray([...cities], filter) {
  const regex = new RegExp(filter);
  return cities.filter((entry) => entry.name.match(regex));
}
