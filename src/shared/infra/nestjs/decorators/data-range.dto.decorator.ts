import {
  ValidateBy,
  ValidationOptions,
  buildMessage,
  ValidationArguments,
} from 'class-validator';
import { isLowerThanRangeLimit } from '~/shared/infra/helpers/date-fns.helper';

export const DateRage = (
  property: string,
  rangeLimit?: string,
  options?: ValidationOptions,
): PropertyDecorator =>
  ValidateBy(
    {
      name: 'DateRage',
      constraints: [property],
      validator: {
        validate: (value: Date, args: ValidationArguments): boolean => {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as Record<string, unknown>)[
            relatedPropertyName
          ] as Date;

          const fromDate = relatedValue;
          const toDate = value;

          if (rangeLimit)
            return isLowerThanRangeLimit(fromDate, toDate, rangeLimit);

          return toDate.toISOString() >= fromDate.toISOString();
        },
        defaultMessage: buildMessage(
          (each: string): string =>
            `${each}$property must be equal or after $constraint1${
              rangeLimit
                ? `, and the date range must be a maximum of ${rangeLimit}`
                : ''
            }.`,
          options,
        ),
      },
    },
    options,
  );

function isDateDifferenceLower(
  date1: any,
  date2: any,
  maxDifference: string,
): boolean {
  const differenceInMilliseconds = Math.abs(date1 - date2);

  const maxDifferenceInMilliseconds = parseMaxDifference(maxDifference);

  // Compare the difference with the maxDifferenceInMilliseconds parameter
  return differenceInMilliseconds <= maxDifferenceInMilliseconds;
}

function parseMaxDifference(maxDifference: string): number {
  const value = parseInt(maxDifference.slice(0, -1), 10);
  const unit = maxDifference.slice(-1);

  switch (unit) {
    case 'h':
      return value * 60 * 60 * 1000; // Convert hours to milliseconds
    case 'd':
      return value * 24 * 60 * 60 * 1000; // Convert days to milliseconds
    case 'm':
      return value * 30 * 24 * 60 * 60 * 1000; // Assuming 30 days in a month
    case 'y':
      return value * 365 * 24 * 60 * 60 * 1000; // Assuming 365 days in a year
    default:
      throw new Error('Invalid unit provided.');
  }
}
