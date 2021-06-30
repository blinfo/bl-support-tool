import { Page } from '../interfaces/page';

export class PageInfo {
  currentPageNumber: number;
  size: number;
  totalPages: number;
  totalRows: number;

  static fromPage(page: Page<any>): PageInfo {
    const pageInfo = new PageInfo();
    pageInfo.totalPages = page.totalPages;
    pageInfo.totalRows = page.totalElements;
    return pageInfo;
  }
}
