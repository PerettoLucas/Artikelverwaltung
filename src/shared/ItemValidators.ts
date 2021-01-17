import {ItemService} from '../app/item.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {valueReferenceToExpression} from '@angular/compiler-cli/src/ngtsc/annotations/src/util';


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

  static imageURLSame(fa: FormArray): {[error: string]: any} | null {

    let i = 0;
    for (const imageURL of fa.value.url) {
      fa.value.map((value: { url: string; }) => {
        if (value.url === imageURL) {
          fa.at(i).setErrors({imageURLSame: {valid: false}});
        }
        i++;
      });
      i = 0;
    }

    return null;
  }


}
