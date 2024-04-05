import { BadRequestException, Injectable, Optional, PipeTransform } from '@nestjs/common';

@Injectable()
export class ConvertToArray implements PipeTransform {
  constructor(
    @Optional()
    private readonly options?: { optional?: boolean; seperator?: string },
  ) {}

  transform(value: string) {
    if (typeof value === 'undefined' && this.options?.optional !== false) return undefined;
    const subjectCodes: string[] = [];
    value.split(this.options?.seperator || ',').forEach((subjectCode) => {
      subjectCode = subjectCode.toUpperCase();
      if (subjectCode.match(/^[A-Za-z]{2,3}[0-9]{2,3}$/)) {
        subjectCodes.push(subjectCode);
      } else {
        if (subjectCode == '') return;
        throw new BadRequestException(`'${subjectCode}' doesn't match /^[A-Z]{2,3}[0-9]{2,3},{0,1}$/ (Regex)!`);
      }
    });
    if (!subjectCodes.length) return undefined;
    return subjectCodes;
  }
}
