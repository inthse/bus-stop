import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Paper,
  Typography,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

import { StationDocument } from '../../types';
import CardBus from '../CardBus';

type CardBusStopPropType = {
  youSelected: string;
  stationName: string;
  station: StationDocument;
};

const CardBusStop = ({
  youSelected,
  stationName,
  station,
}: CardBusStopPropType) => (
  <Paper elevation={0} sx={{ p: 1, width: '100%' }}>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <Typography>{youSelected}</Typography>
      <Chip variant="outlined" label={stationName} sx={{m: 1}}/>
    </Box>
    <Accordion defaultExpanded={true}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{background: 'rgba(0,150,135,0.1)'}}>
        <Typography>Station Details</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{p: '8px'}}>
        <Typography>{station.details}</Typography>
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{background: 'rgba(0,150,135,0.1)'}}>
        <Typography>Bus List</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{p: '8px'}}>
        {station.busses.length === 0 ? (
          <Typography>No busses listed</Typography>
        ) : (
          station.busses.map((each) => <CardBus key={each.id} bus={each} />)
        )}
      </AccordionDetails>
    </Accordion>
    
  </Paper>
);

export default CardBusStop;
