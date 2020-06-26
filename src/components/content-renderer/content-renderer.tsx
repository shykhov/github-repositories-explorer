import { ReactNode } from 'react'


interface Props {
  isLoading: boolean,
  hasError: boolean,
  isEmpty: boolean,
  renderLoading(): ReactNode;
  renderError(): ReactNode;
  renderEmpty(): ReactNode;
  renderContent(): ReactNode
}

export const ContentRenderer = (props: Props) => {
  const { isLoading, hasError, isEmpty, renderLoading, renderError, renderEmpty, renderContent } = props;

  if (isLoading) {
    return renderLoading();
  }

  if (hasError) {
    return renderError();
  }

  if (isEmpty) {
    return renderEmpty();
  }

  return renderContent();
};

ContentRenderer.defaultProps = {
  isLoading: false,
  hasError: false,
  isEmpty: false,
  renderLoading: () => null,
  renderContent: () => null,
  renderError: () => null,
  renderEmpty: () => null,
};
