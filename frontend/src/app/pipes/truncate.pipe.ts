import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 60): string {
    if (!value) return '';
    return value.length > limit ? `${value.substring(0, limit)}...` : value;
  }
}