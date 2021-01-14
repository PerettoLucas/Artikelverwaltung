import {ItemService} from '../app/item.service';
import {FormControl, FormGroup} from '@angular/forms';


export class ItemValidators {

  constructor(private is: ItemService) {}

  static prices(fg: FormGroup): { [error: string]: any } | null {


    if (fg.value.retailPrice < fg.value.purchasingPrice) {
      return  { prices: { valid: false }};
    } else {
      return null;
    }
  }

  static decimalNum(fc: FormControl): { [error: string]: any} | null {
    const passwordPattern = new RegExp('^[0-9]*$');

    if (passwordPattern.test(fc.value)) {
      return null;

    } else {
      if (fc.value < 0 ){
        return null;
      }else {
        return {decimalNum: {valid: false}};
      }
    }
  }


}
