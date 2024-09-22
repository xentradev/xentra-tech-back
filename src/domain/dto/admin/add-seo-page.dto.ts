export class AddSeoPageDto {
  constructor(public name: string, public content: string) {}

  static create(object: { [key: string]: any }) {
    const { name, content } = object;

    if (!name || !content) return ["Missing data"];

    return [undefined, new AddSeoPageDto(name, content)];
  }
}
