import {
  ValidateBy,
  ValidationOptions,
  buildMessage,
  ValidationArguments,
} from 'class-validator';
import { dateIntervalIsLowerThanRangeLimit } from '~/shared/infra/helpers/date-fns.helper';

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
        validate: (value: string, args: ValidationArguments): boolean => {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as Record<string, unknown>)[
            relatedPropertyName
          ] as string;

          const [fromDate] = relatedValue.split('T');
          const [toDate] = value.split('T');

          const fromParsed = new Date(fromDate);
          const toParsed = new Date(toDate);

          if (rangeLimit)
            return dateIntervalIsLowerThanRangeLimit(
              fromParsed,
              toParsed,
              rangeLimit,
            );

          return true;
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
