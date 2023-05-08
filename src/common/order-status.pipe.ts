import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isEnum } from 'class-validator';
import { Status } from 'src/carts/entities/order.entity';

@Injectable()
export class OrderStatusPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!isEnum(value, Status)) {
      throw new BadRequestException(
        'Status should be "generated", "confirmed", "in process" or "delivered"',
      );
    }
    return value;
  }
}
