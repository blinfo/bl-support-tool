import { SolutionStats } from '@shared/interfaces/solution-stats';
import { ModuleStats } from '@shared/interfaces/module-stats';

export interface SubscriptionStats {
  solution: SolutionStats;
  modules: ModuleStats[];
  integrationDiscount: number;
  subscriptionCost: number;
}
