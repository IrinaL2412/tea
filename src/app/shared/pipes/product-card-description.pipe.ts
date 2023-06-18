import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productCardDescription'
})
export class ProductCardDescriptionPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length <= 95) {
      return value;
    } else {
      return value.slice(0, 40) + '...';
    }
  }
}
