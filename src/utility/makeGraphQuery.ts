/*
which e.g. 'stop' with an id argument, or 'stops' with no id
fields e.g. ['name', 'lat', 'lon']
id e.g. HSL:1040129
*/

const makeGraphQuery = (which?: string, fields?: string[], searchBy: string = '', term: string = '') => {
  if(!which || !fields) {
    return null;
  }

  const searchTerm = searchBy && term ? `(${searchBy}: "${term}")` : '';
  const result = {
    query: `{\n${which}${searchTerm} {\n${fields.join('\n')}\n}\n}`,
  };
  
  return result;
};

export default makeGraphQuery;