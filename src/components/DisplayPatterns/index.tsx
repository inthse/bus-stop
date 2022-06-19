import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  List,
  Typography,
} from '@mui/material';

import { NestedLabel, StoptimesForPatterns } from '../../types';
import combineList from '../../utility/combineList';
import { BusIcon, ExpandMoreIcon } from '../MaterialIcons';

type DisplayPatternPropType = {
  patterns: StoptimesForPatterns[];
  labels: NestedLabel;
};

const DisplayPattern = ({ patterns, labels }: DisplayPatternPropType) => {
  let combinedList = combineList(patterns);

  return (
    <List>
      {combinedList.map((each) => {
        let arrivalDate = new Date(each.realtimeArrival);
        return (
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
                  label={arrivalDate.toLocaleTimeString().slice(0, -3)}
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
                  {`${each.headsign ? each.headsign : ''}`}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {`${labels.date}: ${new Date(each.serviceDay).toLocaleDateString()}`}
              </Typography>
              <Typography>
                {`${labels.arrival}: `}
                {arrivalDate.toLocaleTimeString()}
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
                {new Date(each.realtimeDeparture).toLocaleTimeString()}
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
        );
      }
      )}
    </List>
  );
};

export default DisplayPattern;
