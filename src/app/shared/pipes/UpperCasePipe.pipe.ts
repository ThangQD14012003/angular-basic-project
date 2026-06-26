import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'upperCasePipe',
  // đi sử dụng trong file template html
  standalone: true,
})
export class upperCasePipe implements PipeTransform {
  transform(value: string, ...args: any[]) {
    return value.toUpperCase(); 
  }
}
