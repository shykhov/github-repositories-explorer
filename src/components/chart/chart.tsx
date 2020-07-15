import React, { FC } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { StyledPaper, ChartWrapper } from './chart.styled';
import { ChartDataResult } from '../../utils';

interface ChartProps {
  chartData: ChartDataResult[];
}

export const Chart: FC<ChartProps> = props => {
  const { chartData } = props;

  return (
    <ChartWrapper>
      <StyledPaper elevation={20}>
        <ResponsiveContainer height={492}>
          <LineChart
            data={chartData}
            margin={{
              top: 50,
              right: 30,
              left: 30,
              bottom: 50,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis hide dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Line
              yAxisId="left"
              isAnimationActive
              type="monotone"
              dataKey="stars"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line yAxisId="right" isAnimationActive type="monotone" dataKey="forks" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </StyledPaper>
    </ChartWrapper>
  );
};
