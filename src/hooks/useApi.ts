import { IdBundle, StationDocument } from '../types';

const useApi = () => {
  const sendRequest = async (
    route: string,
    id: string = ''
  ): Promise<IdBundle[] | StationDocument> => {
    console.log(`now fetching ${route}${id ? id : ''}`);
    switch (route) {
    case 'stops':
      return [
        { id: '10', label: 'Helsinki' },
        { id: '20', label: 'Espoo' },
      ];
    case 'stop':
      //use id to get particular stop details and list of buses
      switch (id) {
      case '10':
        return {
          details: 'This is a station in central Helsinki',
          busses: [{ id: '30', label: 'bus 1' }],
        };
      case '20':
        return {
          details: 'This is a station in the middle of a tech hub in Espoo',
          busses: [{ id: '40', label: 'bus 2' }],
        };
      default:
        return {
          details: '',
          busses: [],
        };
      }
    default:
      return [];
    }
  };
  return [sendRequest];
};

export default useApi;
