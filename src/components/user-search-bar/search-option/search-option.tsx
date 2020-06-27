import React from 'react';

import { OptionWrapper, ImageWrapper } from './search-option.styled';

export const SearchOption = (props: any) => {
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
