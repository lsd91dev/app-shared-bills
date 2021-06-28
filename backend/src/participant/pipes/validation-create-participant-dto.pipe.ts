import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException  } from '@nestjs/common';

import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CreateParticipantDTO } from '../dto/create-participant-dto';

@Injectable()
export class ValidationCreateParticipantDTOPipe implements PipeTransform {

  async transform(value: CreateParticipantDTO, {metatype}: ArgumentMetadata) {
    
    console.log(value)
    const { amount } = value;

    const amount_parsed = parseIntCustom(amount)
    if ( Number.isNaN(amount_parsed)){ 
      throw new BadRequestException('Validation failed. Total amount must be a valid number') 
    }

    value.amount = amount_parsed;
    
    const object = plainToClass(metatype, value);

    const errors = await validate(object);

    if( errors.length > 0 ){
      const [ { property, constraints } ] = errors;
      throw new BadRequestException(`Validation failed. Please, check the following field. ${ property }: ${  getErrorMessageValidation(constraints)  }`)
    }
    return value;
  }
}

const getErrorMessageValidation = (property: Object) : {} =>{
  return Object.values(property);
}

const parseIntCustom = (value: (string | number) ): number => {
  if( typeof value === 'number' ){ return value; }
  return parseInt(value);
}
