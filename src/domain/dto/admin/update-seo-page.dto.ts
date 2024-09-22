export class UpdateSeoPageDto {
  constructor(
    public id: number,
    public name?: string,
    public content?: string
  ) {}

  static create(object: { [key: string]: any }) {
    const { id, name, content } = object;

    if (!name || !content) return ["Missing data"];

    return [undefined, new UpdateSeoPageDto(id, name, content)];
  }
}
