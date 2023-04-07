import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { isMongoId } from 'class-validator';

@Injectable()
export class IsMongoIdPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    const id = String(value);
    if (!isMongoId(id)) {
      throw new BadRequestException(
        `:${metadata.data} must be a valid MongoId`,
      );
    }
    return id;
  }
}
