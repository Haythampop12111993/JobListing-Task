import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    let currentDate:any = new Date();
    let date:any = new Date(value);
    let differenceInMilliseconds = currentDate - date;
    let differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    return Math.round(differenceInDays )
  }

}
