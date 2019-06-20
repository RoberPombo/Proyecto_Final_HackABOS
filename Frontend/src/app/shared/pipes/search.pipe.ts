import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  public transform(value, args: string) {
    if (!value) {
      return;
    }
    if (!args) {
      return;
    }
    return value.filter(
      (item) => item.toLowerCase().includes(args.toLowerCase())
    );
  }
}
