const faker = require("faker");

function fillField(field){
  if(field.tagName === 'INPUT'){
    maybeFillInput(field);
  }

  if(field.tagName === 'TEXTAREA'){
    maybeFillInput(field);
  }
}

function maybeFillInput(input) {
  if (input.value.length > 0 || input.type === 'submit') {
    return false;
  }

  fillInput(input);
}

function getFakeByName(input) {
  let fake_values = getFakeValues;
  if(fake_values.hasOwnProperty(input.type)){
    return fake_values[input.type];
  }

  return undefined;
}

function getFakeByType(input) {
  let fake_values = getFakeValues;
  if(fake_values.hasOwnProperty(input.type)){
    return fake_values[input.type];
  }

  return undefined;
}

function getFakeByPartialMatch(input){
  let fakeValues = getFakeValues(input);

  let match = undefined;

  ['type','name','id','class'].forEach((type) => {
    Object.keys(fakeValues).forEach((att) => {
      if(input[type] && input[type].includes(att) && !match){
        match = fakeValues[att];
      }
    });
  });

  return match;
}

function getFakeValues(input){
  return {
    first_name: faker.name.firstName(),
    last_name: faker.name.firstName(),
    username: faker.internet.userName(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumberFormat(),
    number: faker.random.number({min: input.min, max: input.max}),
    address: faker.address.streetAddress(),
  };
}

function fillInput(input){
  input.value = resolvers().reduce(
      (acc, curr) => acc === undefined ? curr(input) : acc,
      undefined
  );
}

function resolvers(){
  return [
    getFakeByType,
    getFakeByName,
    getFakeByPartialMatch,
  ]
}

module.exports = {
  fillField,
  getFakeByPartialMatch
}
