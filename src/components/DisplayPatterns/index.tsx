import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  List,
  Typography,
} from '@mui/material';

import { DetailStoptime, NestedLabel, StoptimesForPatterns } from '../../types';
import { BusIcon, ExpandMoreIcon } from '../MaterialIcons';

type DisplayPatternPropType = {
  patterns: StoptimesForPatterns[];
  labels: NestedLabel;
};

const DisplayPattern = ({ patterns, labels }: DisplayPatternPropType) => {
  let combinedList: DetailStoptime[] = [];
  //todo: maybe i should extract this logic elsewhere
  //loop through each pattern and combine all their bus stoptimes into one list
  for (let c = 0; c < patterns.length; c++) {
    for (let d = 0; d < patterns[c].stoptimes.length; d++) {
      let stoptime = patterns[c].stoptimes[d];
      stoptime.shortName = patterns[c].pattern.route.shortName as string; //no longer undefined
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

  return (
    <List>
      {combinedList.map((each) => (
        <Accordion
          key={each.shortName + each.realtimeArrival.toString()}
          disableGutters={true}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ flexWrap: 'wrap' }}
          >
            <Box
              sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
            >
              <Chip
                icon={<BusIcon />}
                variant="outlined"
                label={each.shortName}
                sx={{ marginRight: 0.5 }}
              />
              <Chip
                label={new Date((each.serviceDay + each.realtimeArrival) * 1000)
                  .toLocaleTimeString()
                  .slice(0, -3)}
                variant="outlined"
                color={
                  each.arrivalDelay > 0
                    ? 'warning'
                    : each.arrivalDelay < 0
                      ? 'success'
                      : 'default'
                }
              />
              <Typography sx={{ marginLeft: 0.5 }}>
                {`${each.headsign}`}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {`${labels.date}: ${new Date(
                each.serviceDay * 1000
              ).toLocaleDateString()}`}
            </Typography>
            <Typography>
              {`${labels.arrival}: `}
              {new Date(
                (each.serviceDay + each.realtimeArrival) * 1000
              ).toLocaleTimeString()}
              {each.realtime ? ` (${
                each.arrivalDelay > 0
                  ? labels.behindSchedule
                  : each.arrivalDelay < 0
                    ? labels.aheadOfSchedule
                    : labels.onTime
              })` : ''}
            </Typography>
            <Typography>
              {`${labels.departure}: `}
              {new Date(
                (each.serviceDay + each.realtimeDeparture) * 1000
              ).toLocaleTimeString()}
              {each.realtime ? ` (${
                each.arrivalDelay > 0
                  ? labels.behindSchedule
                  : each.arrivalDelay < 0
                    ? labels.aheadOfSchedule
                    : labels.onTime
              })` : ''}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </List>
  );
};

export default DisplayPattern;
