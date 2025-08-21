import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isBefore, isSameDay } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

@ValidatorConstraint({ name: 'isNotFutureDate', async: false })
export class IsNotFutureDateConstraint implements ValidatorConstraintInterface {
  validate(IsoString: string, args: ValidationArguments) {
    /*
      todo:
   [ X ] 1. get IANA timezone name and toIsoString() date from frontend
   [ X ] 2. add offset to toIsoString() and create new Date() with timezone
   [ X ] 3. compare userVisitDate with offset with todayInUserTz
      if everything is fine:
   [ X ] 4. store ISO string of user visit date in database 
    */

    //  1.
    const { timeZone } = args.object as { timeZone?: string };
    if (!timeZone) return false;

    //  2.
    const todayInUserTz = toZonedTime(new Date(), timeZone);
    const userVisitDate = toZonedTime(IsoString, timeZone);

    // 3.
    return (
      isSameDay(userVisitDate, todayInUserTz) ||
      isBefore(userVisitDate, todayInUserTz)
    );
  }
  defaultMessage() {
    return 'Visit date cannot be in the future';
  }
}

export function IsNotFutureDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotFutureDateConstraint,
    });
  };
}
