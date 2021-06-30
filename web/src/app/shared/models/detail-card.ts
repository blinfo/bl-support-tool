export class DetailCard<T> {
  title: string;
  description: string;
  contents: T;

  constructor(title: string, description: string, contents: any) {
    this.title = title;
    this.description = description;
    this.contents = contents;
  }
}
