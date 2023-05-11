import { Module } from '@nestjs/common';
import { RenderController } from './controllers/render.controller';

@Module({
  controllers: [RenderController]
})
export class RenderModule {}
