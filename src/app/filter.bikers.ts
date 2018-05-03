import {Injectable, Pipe, PipeTransform} from '@angular/core';
import { Biker } from '../entities/biker';

@Pipe({name: 'filterBikers'})
@Injectable()
export class FilterBikers implements PipeTransform {
      transform(items: Biker[], args: string): any {
        
      if (args && items.length > 0) {

        let itemsFound = items.filter(
          item => item.firstname && item.firstname.toLowerCase().includes(args.toLowerCase())
          || item.lastname && item.lastname.toLowerCase().includes(args.toLowerCase())
          || item.username && item.username.toLowerCase().includes(args.toLowerCase())
        );

        if (itemsFound && itemsFound.length > 0 ){
          return itemsFound;
        }
        
        return [-1]; // to display error message (none found) in view.
      }
    return items;
  }
}