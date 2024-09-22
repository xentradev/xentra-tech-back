export class PhotoGenerationForm {
  constructor(
    public prompt: string,
    public characterId: number,
    public from: string,
    public validate?: boolean
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, PhotoGenerationForm?] {
    const { prompt, characterId, from, validate } = object;

    return [
      undefined,
      new PhotoGenerationForm(prompt, characterId, from, validate),
    ];
  }
}
