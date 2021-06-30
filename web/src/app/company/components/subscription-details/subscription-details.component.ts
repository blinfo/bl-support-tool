import { Component, Input, OnInit } from '@angular/core';
import { TEXT } from '@shared/text.constants';
import { SubscriptionStats } from '@shared/interfaces/subscription-stats';
import { ModuleType } from '@shared/enums/module-type';
import { PaymentType } from '@shared/enums/payment-type';

@Component({
  selector: 'app-subscription-details',
  templateUrl: './subscription-details.component.html',
})
export class SubscriptionDetailsComponent implements OnInit {
  @Input() subscription: SubscriptionStats;
  additionalSolutionUsers = 0;
  moduleType = ModuleType;
  paymentType = PaymentType;

  readonly subscriptionText = TEXT.subscription.title;
  readonly userText = TEXT.subscription.user;
  readonly basePriceText = TEXT.subscription.basePrice;
  readonly userIncludedText = TEXT.subscription.userIncluded;
  readonly extraUserText = TEXT.subscription.extraUser;
  readonly blAllInclusiveText = TEXT.subscription.blAllInclusive;
  readonly modulePriceText = TEXT.subscription.modulePrice;
  readonly pricePerUserText = TEXT.subscription.pricePerUser;
  readonly monthlyCostText = TEXT.subscription.monthlyCost;
  readonly integrationDiscountText = TEXT.subscription.integrationDiscount;

  constructor() {}

  ngOnInit(): void {
    this.setSolutionDetails(this.subscription);
  }

  private setSolutionDetails(subscription: SubscriptionStats): void {
    this.additionalSolutionUsers =
      subscription.solution.subscribers - subscription.solution.allInclusiveSubscribers > 1
        ? subscription.solution.subscribers - subscription.solution.allInclusiveSubscribers - 1
        : 0;
  }
}
