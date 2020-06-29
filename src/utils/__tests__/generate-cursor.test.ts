import { generateCursor } from '../generate-cursor';

const nextPageMockData = { newPage: 1, oldPage: 0, endCursor: 'endCursor-1', startCursor: 'startCursor-2' };

const previosPageMockData = { newPage: 0, oldPage: 1, endCursor: 'endCursor-3', startCursor: 'startCursor-4' };

describe('generateCursor', () => {
  it('should generate pagination object for next page', (): void => {
    expect(generateCursor(nextPageMockData)).toEqual({ after: nextPageMockData.endCursor });
  });
  it('should generate pagination object for previous page', (): void => {
    expect(generateCursor(previosPageMockData)).toEqual({ before: previosPageMockData.startCursor });
  });
});
