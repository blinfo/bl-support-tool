import { Solution } from '@shared/models/solution';
import { Module } from '@shared/models/module';

export interface UserSubscription {
  solution: Solution;
  modules: Module[];
  isBlAllInclusive: boolean;
}
