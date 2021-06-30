import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSubscription } from '../../../shared/interfaces/user-subscrption';

@Component({
  selector: 'app-user-subscription',
  templateUrl: './user-subscription.component.html',
})
export class UserSubscriptionComponent implements OnInit {
  @Input() userSubscription$: Observable<UserSubscription>;

  constructor() { }

  ngOnInit(): void {
  }

}
