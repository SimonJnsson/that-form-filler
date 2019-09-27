import faker from "faker";

export function fillField(field){
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

function fillInput(input){
  input.value = resolvers().find(resolverFunc => resolverFunc(input) !== undefined)(input);
}

function getFakeByName(input) {
  switch (input.name) {
    case 'username':
      return faker.internet.userName();
    case 'email':
      return faker.internet.email();
    default:
      return faker.random.word();
  }
}

function getFakeByType(input) {
  switch (input.type) {
    case 'email':
      return faker.internet.email();
    case 'password':
      return faker.internet.password();
    case 'number':
      return faker.random.number({min: input.min, max: input.max});
    default:
      return undefined;
  }
}

function resolvers(){
  return [
    getFakeByType,
    getFakeByName,
  ]
}
