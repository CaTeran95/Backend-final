import { SetMetadata } from '@nestjs/common';

export const SELF_KEY = 'self';
export const Self = (checkProperty: string) =>
  SetMetadata(SELF_KEY, checkProperty);
