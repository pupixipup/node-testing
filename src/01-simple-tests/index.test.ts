// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  const a = 5;
  const b = 2;
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: a, b, action: Action.Add })).toBe(7);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: a, b, action: Action.Subtract })).toBe(3);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: a, b, action: Action.Multiply })).toBe(10);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: a, b, action: Action.Divide })).toBe(2.5);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: a, b, action: Action.Exponentiate })).toBe(25);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: a, b, action: 'invalid action' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: undefined, b: 'arguments', action: ['invalid'] }),
    ).toBe(null);
  });
});
