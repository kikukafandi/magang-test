import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ValidationService } from './validation/validation.service';

@Module({
  providers: [PrismaService, ValidationService]
})
export class CommonModule {}
