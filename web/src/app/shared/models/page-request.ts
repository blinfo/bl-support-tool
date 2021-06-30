import { ApiKey } from '../enums/api-key';
import { Sort } from '../interfaces/sort';

export class PageRequest {
  apiKey: ApiKey;
  pageNumber: number;
  requestData: string;
  size: number;
  sort: Sort;
}
