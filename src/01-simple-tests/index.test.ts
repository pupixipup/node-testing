// Uncomment the code below and write your tests
import { simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  const a = 5;
  const b = 2;
  test('should add two numbers', () => {
    expect(simpleCalculator({a: a, b, action: '+'})).toBe(7)
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({a: a, b, action: '-'})).toBe(3)
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({a: a, b, action: '*'})).toBe(10)
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({a: a, b, action: '/'})).toBe(2.5)
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({a: a, b, action: '^'})).toBe(25)
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({a: a, b, action: 'invalid action'})).toBe(null)
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({a: undefined, b: 'arguments', action: ['invalid']})).toBe(null)
  });
});
