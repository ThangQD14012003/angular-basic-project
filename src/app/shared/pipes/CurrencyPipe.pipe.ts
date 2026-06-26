import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'currencyPipe',
  // đi sử dụng trong file template html
  standalone: true,
})
export class currencyPipe implements PipeTransform {
  transform(value: number, ...args: any[]) {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  }
}
