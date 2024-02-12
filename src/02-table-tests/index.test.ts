import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 8, b: 3, action: Action.Add, expected: 11 },
  { a: 2, b: 5, action: Action.Subtract, expected: -3 },
  { a: 10, b: 3, action: Action.Subtract, expected: 7 },
  { a: 20, b: 10, action: Action.Subtract, expected: 10 },
  { a: 6, b: 4, action: Action.Divide, expected: 1.5 },
  { a: 10, b: 5, action: Action.Divide, expected: 2 },
  { a: 20, b: 4, action: Action.Divide, expected: 5 },
  { a: 7, b: 2, action: Action.Exponentiate, expected: 49 },
  { a: 2, b: 8, action: Action.Exponentiate, expected: 256 },
  { a: 1, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 9, b: 9, action: Action.Multiply, expected: 81 },
  { a: 6, b: 8, action: Action.Multiply, expected: 48 },
  { a: 6, b: 6, action: Action.Multiply, expected: 36 },
  { a: true, b: {}, action: 2.5, expected: null },
  { a: null, b: undefined, action: 42, expected: null },
  { a: 'hello', b: [], action: 'world', expected: null },
];

describe('simpleCalculator', () => {
  it.each(testCases)(
    'should fulfill operations successfully',
    (calculation) => {
      const { a, b, action, expected } = calculation;
      expect(simpleCalculator({ a, b, action })).toEqual(expected);
    },
  );
});
