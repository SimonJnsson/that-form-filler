const getFillableFields = require('../contentscript').getFillableFields;
const fillFocusedForm = require('../contentscript').fillFocusedForm;
const getFakeByPartialMatch = require('../popup/field-resolver').getFakeByPartialMatch;
const faker = require("faker");

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, 'test-dom.html'), 'utf8');

beforeEach(() => {
  faker.seed(123456);
  document.documentElement.innerHTML = html.toString();
});

test('Gets 4 inputs', () => {
  expect(getFillableFields(document)).toHaveLength(5);
});

describe('Field selector', () => {
  test('Does NOT select "submit" inputs', () => {
    expect([...getFillableFields(document)].filter((item) => {
      return item.type === 'submit';
    }).length).toEqual(0);
  });

  test('Does select "number" inputs', () => {
    expect([...getFillableFields(document)].filter((item) => {
      return item.type === 'number';
    }).length).toBeGreaterThanOrEqual(1);
  });

  test('Does select textareas', () => {
    expect([...getFillableFields(document)].filter((item) => {
      return item.tagName === 'TEXTAREA';
    }).length).toBeGreaterThanOrEqual(1);
  });
})

describe.skip('Inputs gets proper fake values', () => {

  test('Input type text has value',  () => {
    expect(document.getElementById('text-field').value).toEqual('');
    fillFocusedForm();
  })
})


test('Partial match returns proper fake for "email"', () => {
  let input_with_partial_match = document.createElement("input");
  input_with_partial_match.name = 'partial-email';

  expect(getFakeByPartialMatch(input_with_partial_match)).toEqual('Lloyd_Kirlin@yahoo.com');
});

test('Partial match returns proper fake for "name"', () => {
  let input_with_partial_match = document.createElement("input");
  input_with_partial_match.name = 'partial-name';

  expect(getFakeByPartialMatch(input_with_partial_match)).toEqual('Garth Waters');
});

test('Partial match returns proper fake for "first_name"', () => {
  let input_with_partial_match = document.createElement("input");
  input_with_partial_match.name = 'partial-first_name';

  expect(getFakeByPartialMatch(input_with_partial_match)).toEqual('Brandt');
});
