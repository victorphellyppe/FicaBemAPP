import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataBrasil'
})
export class DataBrasilPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (typeof(value) == "string")
      return value.split('-').reverse().join('/');
    return value;
  }

}
