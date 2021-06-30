export class Menu {
  id: number;
  property: string;
  displayName: string;
  path: string;
  icon: string;
  badge: {
    enabled: boolean;
    message: string;
  };
  roleAccess: string[];
  children: Menu[];
}
