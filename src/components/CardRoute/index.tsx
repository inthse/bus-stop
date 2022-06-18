import { Card, CardContent, Chip, Typography } from '@mui/material';

import { DetailRoute } from '../../types';
import { BikeIcon, NoBikeIcon } from '../MaterialIcons';

type CardRoutePropType = {
  route: DetailRoute;
  labels: {
    [key: string]: string;
  };
};

const CardRoute = ({ route, labels }: CardRoutePropType) => (
  <Card sx={{ marginBottom: 0.5 }}>
    <CardContent>
      <Chip label={route.shortName} />
      <Typography>{route.longName}</Typography>
      {route.bikesAllowed === 'NO_INFORMATION' ? (
        ''
      ) : (
        route.bikesAllowed === 'ALLOWED' ? <BikeIcon /> : <NoBikeIcon />
      )}
    </CardContent>
  </Card>
);

export default CardRoute;
