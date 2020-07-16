import React, { FC } from 'react';
import ContentLoader from 'react-content-loader';

export const RepositoriesLoadingChart: FC = () => (
  <ContentLoader
    viewBox="0 0 1250 479"
    height={479}
    width={1250}
    speed={2}
    foregroundColor="#BCCCDC"
    backgroundColor="#F0F4F8"
  >
    <rect x="0" y="0" rx="0" ry="0" width="1250" height="479" />
  </ContentLoader>
);
