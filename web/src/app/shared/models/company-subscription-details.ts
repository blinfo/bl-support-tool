export class CompanySubscriptionDetails {
  solution: {
    totalUsers: number;
    totalPrice: number;
  };
  extraUsers: {
    total: number;
    totalPrice: number;
  };
  blAllInclusive: BlAllInclusive;
  modules: ModuleDetails[];

  constructor(
    solution: { totalUsers: number; totalPrice: number },
    extraUsers: { total: number; totalPrice: number },
    blAllInclusive: BlAllInclusive,
    modules: ModuleDetails[],
  ) {
    this.solution = solution;
    this.extraUsers = extraUsers;
    this.blAllInclusive = blAllInclusive;
    this.modules = modules;
  }
}

interface BlAllInclusive {
  totalUsers: number;
  price: number;
}

export class ModuleDetails {
  name: string;
  totalUsers: number;
  totalCost: number;
  price: number;
  blAllInclusive: BlAllInclusive;
  paymentType: PaymentType;

  constructor(
    name: string,
    totalUsers: number,
    price: number,
    blAllInclusive: BlAllInclusive,
    paymentType: number,
  ) {
    this.name = name;
    this.totalUsers = totalUsers;
    this.price = price;
    this.blAllInclusive = blAllInclusive;
    this.paymentType = PaymentType[PaymentType[paymentType]];
    this.totalCost = this.getPriceByPaymentType(this);
  }

  getPriceByPaymentType(module: ModuleDetails): number {
    switch (module.paymentType) {
      case PaymentType.Module:
        return module.totalUsers - module.blAllInclusive.totalUsers > 0 ? module.price : 0;
      case PaymentType.User:
        return module.price * (module.totalUsers - module.blAllInclusive.totalUsers);
      default:
        return module.price;
    }
  }
}

export enum PaymentType {
  Module,
  User,
  Integration,
}
