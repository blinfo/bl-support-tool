// Static function on Array
Array.isEmpty = (arg: any) => Array.isArray(arg) && arg.length <= 0;
Array.hasValues = (arg: any) => Array.isArray(arg) && arg.length > 0;
Array.safe = (arg: any) => (Array.isArray(arg) ? arg : []);

// Functions on array objects
Array.prototype.isEmpty = function () {
  return Array.isEmpty(this);
};
Array.prototype.hasValues = function () {
  return Array.hasValues(this);
};
Array.prototype.first = function () {
  return Array.isEmpty(this) ? undefined : this[0];
};
Array.prototype.firstOrDefault = function (defaultValue: any) {
  return Array.isEmpty(this) ? defaultValue : this[0];
};
Array.prototype.last = function () {
  return Array.isEmpty(this) ? undefined : this[this.length - 1];
};
Array.prototype.tap = function (callback: Function) {
  if (!Array.isEmpty(this) && callback instanceof Function) {
    this.forEach((item) => callback(item));
  }
  return this;
};
