const data = require('./data.json');
const operations = require('./operations.json');

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
    console.log(result);
  }
});
