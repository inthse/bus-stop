import { Card, CardContent, CardMedia, Chip, Typography } from '@mui/material';

import { DetailRoute } from '../../types';
import { BikeIcon, NoBikeIcon } from '../MaterialIcons';

type CardRoutePropType = {
  route: DetailRoute;
};

const CardRoute = ({ route }: CardRoutePropType) => (
  <Card sx={{ display: 'flex', alignItems: 'center', marginBottom: 0.5 }}>
    <CardMedia sx={{ padding: 1 }}>
      <Chip label={route.shortName} />
    </CardMedia>
    <CardContent>
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
