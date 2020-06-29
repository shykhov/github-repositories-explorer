export interface Cursor {
  after?: string;
  before?: string;
}

export interface Props {
  newPage: number;
  oldPage: number;
  endCursor: string;
  startCursor: string;
}

export const generateCursor = (props: Props): Cursor => {
  const { newPage, oldPage, endCursor, startCursor } = props;

  if (newPage > oldPage) {
    return { after: endCursor };
  }

  return { before: startCursor };
};
