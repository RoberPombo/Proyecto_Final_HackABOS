import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  public transform(value, args) {
    console.log(args)
    if (!value) {
      return;
    }
    if (!args || !args[0].playerId) {
      return value;
    }
    const filteredValues = value.filter(value => {
      if (args.find(arg => arg.playerId === value._id)) {
        return false;
      }
      return true;
    })

    return filteredValues;
  }
}
