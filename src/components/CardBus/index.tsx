import { Card, CardContent } from '@mui/material';

import { IdBundle } from '../../types';

type CardBusPropType = {
  bus: IdBundle;
};

const CardBus = ({ bus }: CardBusPropType) => (
  <Card sx={{m: 0.1}}>
    <CardContent>
      {bus.label}
    </CardContent>
  </Card>
);

export default CardBus;