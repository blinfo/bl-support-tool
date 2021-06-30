export enum DropdownTypeEnum {
  DEFAULT = 'DEFAULT',
  CUSTOM_OPTION = 'CUSTOM_OPTION',
  CUSTOM_FREETEXT_OPTION = 'CUSTOM_FREETEXT_OPTION',
}

export interface ICustomDropdownConfig {
  originalText?: string;
  key?: any;
  // item?: any;
  callback?: ({ text: string, source: any }) => void;
}

export interface IDropdownItem {
  title: string;
  value: any;
  readOnly?: boolean;
  type?: DropdownTypeEnum;
  compareValue?: any;
  icon?: any;
  borderTop?: boolean;
  customConfig?: ICustomDropdownConfig;
  index?: number;
}
