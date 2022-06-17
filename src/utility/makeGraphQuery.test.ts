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
  '{\nstops {\ngtfsId\nname\nlat\nlon\nzoneId\n}\n}',
  null
];

test('converts arguments into valid graphql query', () => {
  const result0 = makeGraphQuery(which[0], fields[0], searchBy, term);
  expect(result0).toHaveProperty('query', expectedResults[0]);

  const result1 = makeGraphQuery(which[1], fields[1]);
  expect(result1).toHaveProperty('query', expectedResults[1]);

  const result2 = makeGraphQuery();
  expect(result2).toBe(expectedResults[2]);
});


export {};