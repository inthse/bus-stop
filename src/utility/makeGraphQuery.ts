/*
which e.g. 'stop' with an id argument, or 'stops' with no id
fields e.g. ['name', 'lat', 'lon']
searchBy e.g. 'id' or 'name'
term e.g. HSL:1040129
nested e.g. true if this is for a nested query
*/

const makeGraphQuery = (which: string, fields: string[], searchBy: string = '', term: string = '', nested: boolean = false) => {

  const searchTerm = searchBy && term ? `(${searchBy}: "${term}")` : '';
  const queryString = `${which}${searchTerm} {\n${fields.join('\n')}\n}`;
  const result = {
    query: nested ? queryString :`{\n${queryString}\n}`,
  };
  
  return result;
};

export default makeGraphQuery;