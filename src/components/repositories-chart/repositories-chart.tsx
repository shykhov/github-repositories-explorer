import React, { FC } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';

import { ContentRenderer } from '../content-renderer';
import { RepositoriesLoadingChart } from './repositries-loading-chart';
import { RepositoriesEmptyChart } from './repositries-empty-chart';
import { StyledPaper, ChartWrapper } from './repositories-chart.styled';
import { ChartDataResult } from '../../utils';

interface RepositoriesChartProps {
  chartData: ChartDataResult[];
  loading: boolean;
  repositoryNameSearchParameter: string | null;
  userLoginParameter: string | null;
}

export const RepositoriesChart: FC<RepositoriesChartProps> = props => {
  const { chartData, loading, repositoryNameSearchParameter, userLoginParameter } = props;

  const hasNoQueryParameters: boolean = isNil(userLoginParameter) && isNil(repositoryNameSearchParameter);
  const isEmptyRepositoriesList: boolean = isEmpty(chartData);

  return (
    <ChartWrapper>
      <StyledPaper elevation={20}>
        <ContentRenderer
          isLoading={loading}
          isEmpty={hasNoQueryParameters || isEmptyRepositoriesList}
          emptyComponent={<RepositoriesEmptyChart />}
          loadingComponent={<RepositoriesLoadingChart />}
          contentComponent={
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
          }
        />
      </StyledPaper>
    </ChartWrapper>
  );
};
