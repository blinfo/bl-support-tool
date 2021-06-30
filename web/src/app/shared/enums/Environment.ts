import { DropdownItem } from '@shared/models/dropdown-item';

export class Environment {
  static Production = 'prod';
  static Stage = 'stage';
  static Test = 'test';

  static getEnvironmentsAsDropdownList(): DropdownItem[] {
    return [
      {
        value: Environment.Production,
        compareValue: Environment.Production,
        title: Environment.Production.toUpperCase(),
        readOnly: false,
      },
      // {
      //   value: Environment.Stage,
      //   compareValue: Environment.Stage,
      //   title: Environment.Stage.toUpperCase(),
      //   readOnly: false,
      // },
      // {
      //   value: Environment.Test,
      //   compareValue: Environment.Test,
      //   title: Environment.Test.toUpperCase(),
      //   readOnly: false,
      // },
    ];
  }
}
