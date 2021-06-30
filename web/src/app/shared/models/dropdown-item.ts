import {
  IDropdownItem,
  DropdownTypeEnum,
  ICustomDropdownConfig,
} from '../interfaces/dropdown-item';

export class DropdownItem implements IDropdownItem {
  readOnly?: boolean;
  type?: DropdownTypeEnum = DropdownTypeEnum.DEFAULT;
  compareValue?: any;
  icon?: any;
  borderTop?: boolean;
  customConfig?: ICustomDropdownConfig;

  constructor(public title: string, public value, type?: DropdownTypeEnum) {
    if (type) {
      this.type = type;
    }
  }

  // titleTemlate could use %id and will get id from valueObject
  static create(titleTemplate: string, valueObject: any): any {
    if (!valueObject) {
      return valueObject;
    }

    const title = titleTemplate
      .split(' ')
      .map(word => {
        if (word.startsWith('%') && word.length > 1) {
          const prop = word.slice(1);
          return valueObject[prop];
        }
        return word;
      })
      .join(' ');

    return new DropdownItem(title, valueObject);
  }
}
