export interface SnackbarMessage {
  headerText: string;
  contentText?: string;
  duration?: number;
  type?: MessageType;
  visible?: boolean;
  dismissable?: boolean;
}

export enum MessageType {
  ERROR = 'errorType',
  SUCCESS = 'successType'
}
