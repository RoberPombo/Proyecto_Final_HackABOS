import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showAge'
})
export class ShowAgePipe implements PipeTransform {
  public transform(value, args: string) {
    if (!value) {
      return;
    }
    const difData = Date.now() - value;
    const yearInMs = 1000 * 60 * 60 * 24 * 365;

    return Math.trunc(difData / yearInMs);
  }
}
