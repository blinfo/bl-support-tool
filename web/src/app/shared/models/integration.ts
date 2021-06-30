import { Moment } from 'moment';
import { Scope } from './scope';
import { ServiceProvider } from '@shared/models/serviceProvider';

export class Integration {
  id: number;
  userId: number;
  createTime: Moment;
  active: number;
  scopes: Scope[];
  serviceProvider: ServiceProvider;
}
