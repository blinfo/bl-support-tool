import { DetailViewLine } from './detail-view-line';

export interface DetailViewContent {
  title: string;
  column_1: DetailViewLine[];
  column_2: DetailViewLine[];
}
