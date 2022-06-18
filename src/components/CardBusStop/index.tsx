import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Paper,
  Typography,
} from '@mui/material';
import { ExpandMoreIcon, BikeIcon, NoBikeIcon, NoWheelchairIcon, WheelchairIcon } from '../MaterialIcons';

import { DetailStop } from '../../types';
import CardBus from '../CardBus';

type CardBusStopPropType = {
  stop: DetailStop;
  stopName: string;
  labels: {
    [key: string]: string;
  };
};

const CardBusStop = ({ stop, stopName, labels }: CardBusStopPropType) => (
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
        <Typography>{labels.busList}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: '8px' }}>
        {!stop.routes || stop.routes.length === 0 ? (
          <Typography>{labels.noBusses}</Typography>
        ) : (
          stop.routes.map((each) => <CardBus key={each.gtfsId} bus={each} />)
        )}
      </AccordionDetails>
    </Accordion>
  </Paper>
);

export default CardBusStop;
