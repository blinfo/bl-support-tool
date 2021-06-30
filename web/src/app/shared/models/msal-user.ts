export class MsalUser {
  name: string;
  email: string;
  roles: string[];
  photo: string;

  constructor(name: string, email: string, roles: string[]) {
    this.name = name;
    this.email = email;
    this.roles = roles;
  }
}
