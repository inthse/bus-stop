import { Card, CardContent, Typography } from '@mui/material';

import { DetailRoute } from '../../types';

type CardBusPropType = {
  bus: DetailRoute;
};

const CardBus = ({ bus }: CardBusPropType) => (
  <Card sx={{ m: 0.1 }}>
    <CardContent>
      <Typography>{bus.shortName}</Typography>
      <Typography>{bus.longName}</Typography>
      {!bus.bikesAllowed ? (
        ''
      ) : (
        <Typography>
          {bus.bikesAllowed.toLowerCase().replaceAll('_', ' ')}
        </Typography>
      )}
    </CardContent>
  </Card>
);

export default CardBus;
