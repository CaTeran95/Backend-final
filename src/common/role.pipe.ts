import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isEnum } from 'class-validator';
import { Role } from 'src/users/entities/user.entity';

@Injectable()
export class RolePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!isEnum(value, Role))
      throw new BadRequestException(
        'You should assign a valid role (user, staff or admin)',
      );
    return value;
  }
}
