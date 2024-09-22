export class AddBotDto {
  constructor(
    public name: string,
    public description: string,
    public assistantId: string,
    public backgroundColor?: string,
    public textColor?: string,
    public primaryMainColor?: string,
    public imageB64?: string
  ) {}

  static create(object: { [key: string]: any }) {
    const {
      name,
      description,
      assistantId,
      backgroundColor,
      textColor,
      primaryMainColor,
      imageB64,
    } = object;

    if (!name || !description || !assistantId) return ["Missing data"];

    return [
      undefined,
      new AddBotDto(
        name,
        description,
        assistantId,
        backgroundColor,
        textColor,
        primaryMainColor,
        imageB64
      ),
    ];
  }
}
