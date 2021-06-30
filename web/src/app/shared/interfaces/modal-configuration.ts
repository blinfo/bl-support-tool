export interface ModalConfiguration<T> {
  title: string;
  data: T;
  component: any;
  confirmButtonText?: string;
  cancelButtonText?: string;
}
