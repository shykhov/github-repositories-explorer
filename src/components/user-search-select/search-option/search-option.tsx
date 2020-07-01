import React, { FC } from 'react';

import { OptionWrapper, ImageWrapper } from './search-option.styled';
import { SelectOption } from '../../../utils';

export interface Props {
  data: SelectOption;
  innerRef: React.Ref<HTMLDivElement>;
  innerProps: unknown;
  cx: string;
}

export const SearchOption: FC<Props> = props => {
  const { cx, innerProps, innerRef: ref, data, ...rest } = props;

  return (
    <OptionWrapper ref={ref} {...rest} {...innerProps}>
      {data && data.iconSrc && (
        <ImageWrapper>
          <img src={data.iconSrc} alt={data.label} />
        </ImageWrapper>
      )}
      <span>{data && data.label}</span>
    </OptionWrapper>
  );
};
