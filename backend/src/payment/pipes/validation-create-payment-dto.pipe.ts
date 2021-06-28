import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException  } from '@nestjs/common';

import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CreatePaymentDTO } from '../dto/create-payment';

@Injectable()
export class ValidationCreatePaymentDTOPipe implements PipeTransform {

  async transform(value: CreatePaymentDTO, {metatype}: ArgumentMetadata) {
    const { total_amount } = value;

    const total_amount_parsed = parseIntCustom(total_amount)
    if ( Number.isNaN(total_amount_parsed)){ 
      throw new BadRequestException('Validation failed. Total amount must be a valid number') 
    }

    value.total_amount = total_amount_parsed;
    
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
