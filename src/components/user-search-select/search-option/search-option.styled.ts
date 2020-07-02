import styled from 'styled-components';

type OptionProps = {
  isFocused?: boolean;
  isSelected?: boolean;
};

export const OptionWrapper = styled.div<OptionProps>`
  cursor: pointer;
  padding: 7px 0 7px 15px;
  display: flex;
  align-items: center;
  width: 100%;

  ${({ isSelected }) =>
    isSelected &&
    `
    + div {
      margin-left: 0;
    }
  `}

  ${({ isFocused }) =>
    isFocused &&
    `
    background-color: #E6F2FF;
  `}

  &:hover {
    background-color: #e6f2ff;
  }

  & > span {
    margin-left: 10px;
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: calc(100% - 40px);
  }
`;

export const ImageWrapper = styled.div`
  width: 25px;
  height: 25px;

  & > img {
    border-radius: 5px;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
`;
