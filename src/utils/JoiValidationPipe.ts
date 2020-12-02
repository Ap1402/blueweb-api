import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema, private context) { }
  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value, { context: this.context });
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }
    return value;
  }
}
