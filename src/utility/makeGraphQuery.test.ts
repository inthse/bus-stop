import makeGraphQuery from './makeGraphQuery';

//mock data
const which = ['stop', 'stops'];
const searchBy = 'id';
const term = 'HSL:1040129';
const fields = [
  ['name', 'lat', 'lon', 'wheelchairBoarding'],
  ['gtfsId', 'name', 'lat', 'lon', 'zoneId']
];

const expectedResults = [
  '{\nstop(id: "HSL:1040129") {\nname\nlat\nlon\nwheelchairBoarding\n}\n}',
  '{\nstops {\ngtfsId\nname\nlat\nlon\nzoneId\n}\n}'
];

test('converts arguments into valid graphql query', () => {
  const result0 = makeGraphQuery(which[0], fields[0], searchBy, term);
  expect(result0).toHaveProperty('query', expectedResults[0]);

  const result1 = makeGraphQuery(which[1], fields[1]);
  expect(result1).toHaveProperty('query', expectedResults[1]);
});

test('converts arguments into valid nested graphql query', () => {
  const expectedResult = '{\nstop(id: "HSL:1040129") {\ngtfsId\nname\ndesc\nroutes {\ngtfsId\nshortName\nlongName\n}\n}\n}';

  let query;
  const nested = makeGraphQuery('routes', ['gtfsId', 'shortName', 'longName'], '', '', true);
  if(nested) {
    query = makeGraphQuery('stop', ['gtfsId', 'name', 'desc', nested.query], 'id', 'HSL:1040129');
  }
  expect(query).toHaveProperty('query', expectedResult);
});


export {};