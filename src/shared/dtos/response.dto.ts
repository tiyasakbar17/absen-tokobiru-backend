export class ResponseDto<T> {
  status: 'success' | 'failed';
  message: string;
  data: T;

  constructor(status: 'success' | 'failed', message: string, data: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
