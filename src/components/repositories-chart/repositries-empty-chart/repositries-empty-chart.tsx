import React, { FC } from 'react';

import { Root } from './repositories-empty-chart.styled';

export const RepositoriesEmptyChart: FC = () => (
  <Root>
    <span aria-label="emodji" role="img">
      📉
    </span>
    <div>Repositories informational chart will appear here.</div>
  </Root>
);
