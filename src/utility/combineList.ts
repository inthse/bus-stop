import { DetailStoptime, StoptimesForPatterns } from '../types';

const combineList = (nestedList: StoptimesForPatterns[]) => {
  let combinedList: DetailStoptime[] = [];

  //loop through each pattern and combine all their bus stoptimes into one list
  for (let c = 0; c < nestedList.length; c++) {
    for (let d = 0; d < nestedList[c].stoptimes.length; d++) {
      let stoptime = nestedList[c].stoptimes[d];
      stoptime.shortName = nestedList[c].pattern.route.shortName as string; //no longer undefined
      combinedList.push(stoptime);
    }
  }

  //sort combined list by scheduled arrival time
  combinedList.sort((a: DetailStoptime, b: DetailStoptime) => {
    if (a.realtimeArrival < b.realtimeArrival) {
      return -1;
    }
    if (a.realtimeArrival > b.realtimeArrival) {
      return 1;
    }
    return 0;
  });

  return combinedList;
};

export default combineList;