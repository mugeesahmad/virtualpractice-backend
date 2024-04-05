import { BadRequestException, Injectable, Optional, PipeTransform } from '@nestjs/common';

@Injectable()
export class PositiveIntPipe implements PipeTransform {
  constructor(@Optional() private readonly options?: { optional?: boolean }) {
    this.options = options;
  }
  transform(value: string) {
    if (this.options?.optional !== false && typeof value === 'undefined') return undefined;
    const limit = parseInt(value, 10);
    if (limit && limit > 0) return limit;
    throw new BadRequestException(`'limit' must be an integer and greater than zero!`);
  }
}
