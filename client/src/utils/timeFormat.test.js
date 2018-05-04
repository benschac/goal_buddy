import timeFormatter, { getTotalMilliseconds, getMinutes, getSeconds, getMilliseconds } from './timeFormat';

describe('Timer formatting functions', () => {
  test('minutes from remaining', () => {
    expect(getMinutes(60000)).toBe(1);
  });

  test('seconds from remaining', () => {
    expect(getSeconds(60000)).toBe(0);
    expect(getSeconds(61000)).toBe(1);
  });

  test('milliseconds from remaining', () => {
    expect(getMilliseconds(60000)).toBe(0);
    expect(getMilliseconds(64340)).toBe(340);
    expect(getMilliseconds(61001)).toBe(1);
  });

  test('convert minute value to milliseconds', () => {
    expect(getTotalMilliseconds(30)).toBe(1800000);
  });
});

describe('The exported formatting function', () => {
  expect(timeFormatter(1800000)).toBe('30:00:000');
});
