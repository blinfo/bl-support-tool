import { Module } from './module';

export class Solution {
  id: number;
  price: number;
  pricePerUser: number;
  description: string;
  displayName: string;
  modules: Module[];
}
