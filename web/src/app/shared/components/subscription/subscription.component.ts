import { Component, Input, OnInit } from '@angular/core';
import { UserSubscription } from '../../interfaces/user-subscrption';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
})
export class SubscriptionComponent implements OnInit {
  @Input() companySubscription: UserSubscription;
  @Input() selectedSubscription: UserSubscription;

  constructor() { }

  ngOnInit(): void {
  }

}
