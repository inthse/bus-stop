import { ShortStop, DetailStop } from '../types';
import makeGraphQuery from '../utility/makeGraphQuery';
import {
  routesNested,
  stoptimesForPatternsNested,
} from '../utility/constants';

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
  let response;
  try {
    response = await fetch(baseUrl, options);
    if(!response.ok) {
      throw new Error('api response not ok');
    }
    response = response.json();
  } catch (err) {
    console.error(err);
    response = null;
  }
  return response;
};

const useApi = () => {
  const sendRequest = async (
    route: string,
    term: string = ''
  ): Promise<ShortStop[] | DetailStop | Partial<DetailStop>> => {

    let errorMessage: Partial<DetailStop> | ShortStop[] = {
      gtfsId: '0',
      name: 'Error',
      desc: 'Error querying data',
    }; //default error message
    let query: { query: string } = { query: '' }; //default query
    let process: (arg0: ApiResponse) => DetailStop | ShortStop[] | undefined; //default type for process function

    switch (route) {
    case 'stopsByName':
      //use name fragment to filter stops by name
      errorMessage = [
        {
          gtfsId: '0',
          name: 'Error finding stop by name',
          vehicleMode: 'BUS',
        },
      ];
      query = makeGraphQuery(
        'stops',
        ['gtfsId', 'name', 'vehicleMode'],
        'name',
        term
      );
      process = (res: ApiResponse) => {
        let processed;
        if (res.data.stops) {
          processed = res.data.stops.filter(
            (each) => each.vehicleMode === 'BUS'
          );
        }
        return processed;
      };
      break;
    case 'stop':
      //use id to get particular stop details and list of buses
      errorMessage = {
        gtfsId: '0',
        name: 'Error',
        desc: 'Error querying stop data',
      };

      query = makeGraphQuery(
        'stop',
        [
          'gtfsId',
          'name',
          'desc',
          'locationType',
          'lat',
          'lon',
          'wheelchairBoarding',
          'zoneId',
          routesNested.query,
          stoptimesForPatternsNested.query,
        ],
        'id',
        term
      );
      process = (res: ApiResponse) => res.data.stop;
      break;

    default:
      return errorMessage;
    }

    let response = await fetcher(query);

    let result = process(response);
    if (!result) {
      return errorMessage;
    }
    return result;
  };
  return [sendRequest];
};

export default useApi;
