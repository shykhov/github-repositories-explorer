import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { ContentRenderer } from '../content-renderer';

describe('<ContentRenderer />', () => {
  let renderedComponent: ShallowWrapper;
  let propsMock;

  beforeEach(() => {
    propsMock = {
      hasError: false,
      isLoading: false,
      isEmpty: false,
      loadingComponent: <div className="loading">loading</div>,
      emptyComponent: <div className="empty">empty</div>,
      errorComponent: <div className="error">content</div>,
      contentComponent: <div className="content">content</div>,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    renderedComponent = shallow(<ContentRenderer {...propsMock} />);
  });

  it('should render content by default', () => {
    expect(renderedComponent.exists('.content')).toBeTruthy();
    expect(renderedComponent.exists('.loading')).toBeFalsy();
    expect(renderedComponent.exists('.empty')).toBeFalsy();
    expect(renderedComponent.exists('.error')).toBeFalsy();
  });

  it('should render loading component in case if isLoading equals true', () => {
    renderedComponent.setProps({ isLoading: true });

    expect(renderedComponent.exists('.content')).toBeFalsy();
    expect(renderedComponent.exists('.loading')).toBeTruthy();
    expect(renderedComponent.exists('.empty')).toBeFalsy();
    expect(renderedComponent.exists('.error')).toBeFalsy();
  });

  it('should render error component in case if hasError equals true', () => {
    renderedComponent.setProps({ hasError: true });

    expect(renderedComponent.exists('.content')).toBeFalsy();
    expect(renderedComponent.exists('.loading')).toBeFalsy();
    expect(renderedComponent.exists('.empty')).toBeFalsy();
    expect(renderedComponent.exists('.error')).toBeTruthy();
  });

  it('should render empty component in case if isEmtpy equals true', () => {
    renderedComponent.setProps({ isEmpty: true });

    expect(renderedComponent.exists('.content')).toBeFalsy();
    expect(renderedComponent.exists('.loading')).toBeFalsy();
    expect(renderedComponent.exists('.empty')).toBeTruthy();
    expect(renderedComponent.exists('.error')).toBeFalsy();
  });
});
