import { ClassValidationDetails, Optional } from '../../types/common.types';
import { ClassValidator } from '../../utils/validators/class.validator';
import { StatusCode } from '../../codes/status.code';
import { Exception } from '../../exceptions/exception';

export class UsecaseValidatableAdapter {
  public async validate(): Promise<void> {
    const details: Optional<ClassValidationDetails> =
      await ClassValidator.validate(this, StatusCode.ENTITY_VALIDATION_ERROR);

    if (details)
      throw Exception.new({
        code: StatusCode.INTERNAL_SERVER_ERROR,
        data: details,
      });
  }
}
