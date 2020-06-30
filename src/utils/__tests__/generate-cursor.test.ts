import { generateCursor } from '../generate-cursor';

const nextPageMockData = { newPage: 2, oldPage: 1, endCursor: 'endCursor-1', startCursor: 'startCursor-2' };

const previosPageMockData = { newPage: 1, oldPage: 2, endCursor: 'endCursor-3', startCursor: 'startCursor-4' };

const backToFirstPageMockData = { newPage: 0, oldPage: 1, endCursor: 'endCursor-3', startCursor: 'startCursor-4' };

describe('generateCursor', () => {
  it('should generate pagination object for next page', (): void => {
    expect(generateCursor(nextPageMockData)).toEqual({ after: nextPageMockData.endCursor });
  });

  it('should generate pagination object for previous page', (): void => {
    expect(generateCursor(previosPageMockData)).toEqual({ before: previosPageMockData.startCursor });
  });

  it('should generate empty object for navigation to first sstep', (): void => {
    expect(generateCursor(backToFirstPageMockData)).toEqual({});
  });
});
