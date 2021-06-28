import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ValidationParseObjectIdPipe implements PipeTransform {
  transform(id: string, metadata: ArgumentMetadata) {
    if( !isValidObjectId(id)){ throw new BadRequestException('Invalid id. You must provide a valid id') }
    return id;
  }
}
