import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Paper,
  Typography,
} from '@mui/material';

import { DetailStop, NestedLabel } from '../../types';
import CardRoute from '../CardRoute';
import DisplayPatterns from '../DisplayPatterns';
import {
  ExpandMoreIcon,
  MapIcon,
  NoWheelchairIcon,
  WheelchairIcon,
} from '../MaterialIcons';

type CardBusStopPropType = {
  labels: {
    [key: string]: NestedLabel;
  };
  stop: DetailStop;
};

const CardBusStop = ({ labels, stop }: CardBusStopPropType) => {
  const label = labels.busStop;

  return (
    <Paper elevation={0} sx={{ p: 1, width: '100%' }}>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ background: 'rgba(0,150,136,0.2)' }}
        >
          <Typography>{label.stopDetails}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: '8px' }}>
          <Typography>{stop.desc}</Typography>
          {!stop.locationType ? (
            ''
          ) : (
            <Typography>
              {label.locationType}:{' '}
              {stop.locationType === 'STATION' ? label.station : label.stop}
            </Typography>
          )}
          <Paper elevation={0} sx={{ display: 'flex' }}>
            <Chip
              component="a"
              href="https://www.hsl.fi/en/tickets-and-fares/hsl-area-and-zones"
              label={`${label.zone} ${stop.zoneId ? stop.zoneId : '?'}`}
              variant="outlined"
              sx={{ m: 1 }}
              clickable
            />
            {!stop.lat || !stop.lon ? (
              ''
            ) : (
              <Chip
                component="a"
                href={`https://maps.google.com?q=${stop.lat.toString()},${stop.lon.toString()}`}
                label="Google Maps"
                variant="outlined"
                icon={<MapIcon />}
                sx={{ m: 1 }}
                clickable
              />
            )}
            {stop.wheelchairBoarding === 'NOT_POSSIBLE' ? (
              <Chip
                icon={<NoWheelchairIcon />}
                label="✗"
                color="error"
                variant="outlined"
                sx={{ m: 1 }}
              />
            ) : (
              stop.wheelchairBoarding === 'POSSIBLE' ? (
                <Chip
                  icon={<WheelchairIcon />}
                  label="✓"
                  color="success"
                  variant="outlined"
                  sx={{ m: 1 }}
                />
              ) : (
                <Chip
                  icon={<WheelchairIcon titleAccess="wheelchair access unknown" />}
                  label="?"
                  variant="outlined"
                  sx={{ m: 1 }}
                />
              )
            )}
          </Paper>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ background: 'rgba(0,150,136,0.2)' }}
        >
          <Typography>{label.routeList}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: '8px' }}>
          {!stop.routes || stop.routes.length === 0 ? (
            <Typography>{label.noRoutes}</Typography>
          ) : (
            stop.routes.map((each) => (
              <CardRoute key={each.gtfsId} route={each} />
            ))
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ background: 'rgba(0,150,136,0.2)' }}
        >
          <Typography>{label.nextBusses}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: '8px' }}>
          {!stop.stoptimesForPatterns || stop.stoptimesForPatterns.length === 0 ? (
            <Typography>{label.noBusses}</Typography>
          ) : (
            <DisplayPatterns
              patterns={stop.stoptimesForPatterns}
              labels={labels.pattern}
            />
          )}
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default CardBusStop;
