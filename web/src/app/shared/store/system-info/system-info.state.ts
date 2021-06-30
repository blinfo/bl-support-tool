import { SystemInfo } from '../../models/system-info';

export interface SystemInfoState {
  errors: string[];
  systemInfo: SystemInfo[];
}

export const initialTableState: SystemInfoState = {
  errors: undefined,
  systemInfo: undefined,
};
