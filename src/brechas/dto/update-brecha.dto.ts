import { PartialType } from '@nestjs/mapped-types';
import { CreateBrechaDto } from './create-brecha.dto';

export class UpdateBrechaDto extends PartialType(CreateBrechaDto) {}
