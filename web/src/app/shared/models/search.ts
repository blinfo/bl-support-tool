export class Search {
  text = '';
  requestType = '';


  constructor(text?: string, requestType?: string) {
    this.text = text;
    this.requestType = requestType;
  }
}
