import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import 'jest-styled-components';

import { SearchOption, Props } from '../search-option';

describe('<SearchOption />', () => {
  let renderedComponent: ShallowWrapper;
  let propsMock: Props;

  beforeEach(() => {
    propsMock = {
      data: { iconSrc: 'icon', value: 'test-value', label: 'test-label' },
      innerRef: React.createRef<HTMLDivElement>(),
      innerProps: {},
      cx: '',
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    renderedComponent = shallow(<SearchOption {...propsMock} />);
  });

  it('should render SearchOption', () => {
    expect(renderedComponent.dive()).toMatchSnapshot();
  });
});
