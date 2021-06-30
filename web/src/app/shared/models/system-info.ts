export class SystemInfo {
  active: number;
  createdAt: string | Date;
  expireAt: string | Date;
  level: string;
  icon: string;
  id: number;
  label: string;
  message: string;

  constructor(
    active = 1,
    createdAt: string | Date = null,
    expireAt: string | Date = null,
    level: string = null,
    icon: string = null,
    id: number = null,
    label: string = null,
    message: string = null,
  ) {
    this.active = active;
    this.createdAt = createdAt;
    this.expireAt = expireAt;
    this.level = level;
    this.icon = icon;
    this.id = id;
    this.label = label;
    this.message = message;
  }
}
