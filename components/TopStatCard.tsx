'use client';

import { Card, CardContent, Typography } from '@mui/material';

interface Props {
  title: string;
  value: string | number;
  unit: string;
  highlight?: boolean;
}

export default function TopStatCard({ title, value, unit, highlight }: Props) {
  return (
    <Card
      sx={{
        backgroundColor: highlight ? 'primary.light' : 'background.paper',
        color: highlight ? 'primary.contrastText' : 'text.primary',
        borderLeft: highlight ? '6px solid #6750A4' : undefined,
      }}
      elevation={3}
    >
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
          {value} <Typography variant="subtitle1" component="span">{unit}</Typography>
        </Typography>
      </CardContent>
    </Card>
  );
}
