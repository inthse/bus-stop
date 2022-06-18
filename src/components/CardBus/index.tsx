import { Card, CardContent } from '@mui/material';

import { ShortStop } from '../../types';

type CardBusPropType = {
  bus: ShortStop;
};

const CardBus = ({ bus }: CardBusPropType) => (
  <Card sx={{m: 0.1}}>
    <CardContent>
      {bus.name}
    </CardContent>
  </Card>
);

export default CardBus;