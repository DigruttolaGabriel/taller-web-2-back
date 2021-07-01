import {
  ClassValidationDetails,
  CodeDescription,
  Optional,
} from '../../types/common.types';
import { validate, ValidationError } from 'class-validator';

export class ClassValidator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  public static async validate<TTarget extends object>(
    target: TTarget,
    context?: CodeDescription,
  ): Promise<Optional<ClassValidationDetails>> {
    let details: Optional<ClassValidationDetails>;
    const errors: Array<ValidationError> = await validate(target);

    if (errors.length > 0) {
      details = {
        context: context,
        errors: [],
      };
      for (const error of errors) {
        details.errors.push({
          property: error.property,
          value: error.value,
          message: error.constraints ? Object.values(error.constraints) : [],
        });
      }
    }

    return details;
  }
}
