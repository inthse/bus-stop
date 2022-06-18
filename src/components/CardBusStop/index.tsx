import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Paper,
  Typography,
} from '@mui/material';
import { ExpandMoreIcon, NoWheelchairIcon, WheelchairIcon } from '../MaterialIcons';

import { DetailStop } from '../../types';
import CardRoute from '../CardRoute';

type CardBusStopPropType = {
  labels: {
    [key: string]: string;
  };
  stop: DetailStop;
  stopName: string;
};

const CardBusStop = ({ labels, stop, stopName }: CardBusStopPropType) => (
  <Paper elevation={0} sx={{ p: 1, width: '100%' }}>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <Typography>{labels.youSelected}:</Typography>
      <Chip variant="outlined" label={stopName} sx={{ m: 1 }} />
    </Box>
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ background: 'rgba(0,150,136,0.2)' }}
      >
        <Typography>{labels.stopDetails}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: '8px' }}>
        <Typography>{stop.desc}</Typography>
        {!stop.locationType ? (
          ''
        ) : (
          <Typography>
            {labels.locationType}: {stop.locationType === 'STATION' ? labels.station : labels.stop}
          </Typography>
        )}
        {!stop.zoneId ? (
          ''
        ) : (
          <Typography>
            <a href="https://www.hsl.fi/en/tickets-and-fares/hsl-area-and-zones" target="_blank" rel="noreferrer">{labels.zone}</a>: {stop.zoneId}
          </Typography>
        )}
        {!stop.lat || !stop.lon ? (
          ''
        ) : (
          <a href={`https://maps.google.com?q=${stop.lat.toString()},${stop.lon.toString()}`} target="_blank" rel="noreferrer">
            <Typography>Google Maps</Typography>
          </a>
        )}
        {stop.wheelchairBoarding === 'NO_INFORMATION' ? (
          ''
        ) : (
          stop.wheelchairBoarding === 'POSSIBLE' ? <WheelchairIcon /> : <NoWheelchairIcon />
        )}
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ background: 'rgba(0,150,136,0.2)' }}
      >
        <Typography>{labels.routeList}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: '8px' }}>
        {!stop.routes || stop.routes.length === 0 ? (
          <Typography>{labels.noRoutes}</Typography>
        ) : (
          stop.routes.map((each) => <CardRoute key={each.gtfsId} route={each} labels={labels} />)
        )}
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ background: 'rgba(0,150,136,0.2)' }}
      >
        <Typography>{labels.nextBusses}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: '8px' }}>
        <Typography>{labels.noBusses}</Typography>
      </AccordionDetails>
    </Accordion>
  </Paper>
);

export default CardBusStop;
