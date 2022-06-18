import { ShortStop, DetailStop } from '../types';
import makeGraphQuery from '../utility/makeGraphQuery';
import mockStops from '../testStops.json';

interface ApiResponse extends Response {
  data: {
    stops?: ShortStop[];
    stop?: DetailStop;
  };
}

const fetcher = async (body: { query: string }): Promise<ApiResponse> => {
  const baseUrl =
    'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(baseUrl, options).then((res) => res.json());
  return response;
};

const useApi = () => {
  const sendRequest = async (
    route: string,
    id: string = ''
  ): Promise<ShortStop[] | DetailStop> => {
    console.log(`now fetching ${route}${id ? id : ''}`);

    let errorMessage: DetailStop | ShortStop[] = {
      gtfsId: '0',
      name: 'Error',
      desc: 'Error querying data',
    }; //default error message
    let query: { query: string } | null = { query: '' }; //default query
    let process: (arg0: ApiResponse) => DetailStop | ShortStop[] | undefined; //default type for process function

    switch (route) {
    case 'stops':
      //fetch list of all stops (thousands)

      //for testing during development, to avoid spamming the API
      return mockStops.data.stops.filter(
        (each: ShortStop) => each.vehicleMode === 'BUS'
      );
      /*
      errorMessage = [{ gtfsId: '0', name: 'Error querying stops data' }];
      query = makeGraphQuery('stops', ['gtfsId', 'name', 'vehicleMode']);
      process = (res: ApiResponse) => {
        let processed;
        if (res.data.stops) {
          processed = res.data.stops.filter(
            (each) => each.vehicleMode === 'BUS'
          );
          console.log(processed.length);
        }
        return processed;
      };
      break;
      */
    case 'stop':
      //use id to get particular stop details and list of buses
      errorMessage = {
        gtfsId: '0',
        name: 'Error',
        desc: 'Error querying stop data',
      };
      query = makeGraphQuery('stop', ['gtfsId', 'name', 'desc'], 'id', id);
      process = (res: ApiResponse) => res.data.stop;
      break;
    default:
      return [];
    }

    if (!query) {
      return errorMessage;
    }

    try {
      let response = await fetcher(query);
      console.log(response);
      let result = process(response);
      if (!result) {
        return errorMessage;
      }
      return result;
    } catch (err) {
      console.log(err);
      return errorMessage;
    }
  };
  return [sendRequest];
};

export default useApi;
