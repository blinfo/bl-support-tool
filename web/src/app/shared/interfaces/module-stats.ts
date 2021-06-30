import { PaymentType } from '../enums/payment-type';
import { ModuleType } from '../enums/module-type';
import { SubscriptionModel } from '@shared/interfaces/subscription-model';

export interface ModuleStats extends SubscriptionModel{
  paymentType: PaymentType;
  type: ModuleType;
}
