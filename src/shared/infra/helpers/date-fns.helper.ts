import { addMonths, isWithinInterval, addDays, addYears } from 'date-fns';

export const dateIntervalIsLowerThanRangeLimit = (
  dateLeft: Date,
  dateRight: Date,
  rangeLimit: string,
) => {
  if (!rangeLimit) return true;
  const [ignoring, rangeNumber, char] = rangeLimit.match(/^(\d+)([a-zA-Z])$/);
  let dataRangeLimit = dateRight;

  if (char === 'd') {
    dataRangeLimit = addDays(dateLeft, Number(rangeNumber));
  } else if (char === 'm') {
    dataRangeLimit = addMonths(dateLeft, Number(rangeNumber));
  } else if (char === 'y') {
    dataRangeLimit = addYears(dateLeft, Number(rangeNumber));
  }

  return isWithinInterval(dateRight, {
    start: dateLeft,
    end: dataRangeLimit,
  });
};
