import { Scope } from './scope';

export class ServiceProvider {
  id: number;
  publicKey: string;
  name: string;
  scopes: Scope[];
  description: string;
  website: string;
  email: string;
  phone: string;
  live: number;
}
