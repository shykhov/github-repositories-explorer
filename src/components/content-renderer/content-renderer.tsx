import { ReactElement } from 'react';

export interface Props {
  isLoading: boolean;
  hasError: boolean;
  isEmpty: boolean;
  loadingComponent: ReactElement;
  errorComponent: ReactElement;
  emptyComponent: ReactElement;
  contentComponent: ReactElement;
}

export const ContentRenderer = (props: Props): ReactElement | null => {
  const { isLoading, hasError, isEmpty, loadingComponent, errorComponent, emptyComponent, contentComponent } = props;

  if (isLoading) {
    return loadingComponent;
  }

  if (hasError) {
    return errorComponent;
  }

  if (isEmpty) {
    return emptyComponent;
  }

  return contentComponent;
};

ContentRenderer.defaultProps = {
  isLoading: false,
  hasError: false,
  isEmpty: false,
  loadingComponent: null,
  errorComponent: null,
  contentComponent: null,
  emptyComponent: null,
};
