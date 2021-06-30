/* SystemJS module definition */
declare var module: NodeModule;

interface NodeModule {
  id: string;
}

interface ArrayConstructor {
  isEmpty: (arg: any) => boolean;
  hasValues: (arg: any) => boolean;
  safe: <T>(arg: T[]) => Array<T>;
}

interface Array<T> {
  tap: (callback: Function) => Array<T>;
  isEmpty(): boolean;
  hasValues(): boolean;
  first(): any;
  firstOrDefault(defaultValue: any);
  last(): any;
}
