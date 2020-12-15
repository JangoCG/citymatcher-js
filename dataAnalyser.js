const data = require('./data.json');
const operations = require('./operations.json');

// const dataTest = data.cities.map((item) => console.log(item.population));

operations.operations.forEach((operator) => {
  if (operator.name === 'important') {
    const regex = new RegExp(operator.filter);
    const filteredCities = data.cities.filter((entry) =>
      entry.name.match(regex)
    );
    let res = 0;
    filteredCities.forEach((city) => {
      res += city.population;
    });
    console.log((res / filteredCities.length).toFixed(2));
    console.log(filteredCities.length);
  }
});
