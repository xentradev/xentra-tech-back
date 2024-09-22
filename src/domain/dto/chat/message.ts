export class MessageDTO {
  constructor(
    public id: number,
    public text: string,
    public botId: number,
    public createdAt: Date,
    public from: string,
    public threadId: string
  ) {}

  static create(object: { [key: string]: any }): [string?, MessageDTO?] {
    const { id, text, characterId, userId, createdAt, from, threadId } = object;

    if (from !== "assistant" && from !== "user") {
      return ["From unknown"];
    }

    return [
      undefined,
      new MessageDTO(id, text, characterId, createdAt, from, threadId),
    ];
  }
}