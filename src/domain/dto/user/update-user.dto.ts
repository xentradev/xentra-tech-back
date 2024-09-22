export class UpdateUserDto {
  constructor(
    public nickname?: string,
    public gender?: string,
    public preferred_gender?: string,
    public accepted_terms?: boolean,
    public telegram_username?: string
  ) {}

  static create(object: { [key: string]: any }) {
    const {
      nickname,
      gender,
      preferred_gender,
      accepted_terms,
      telegram_username,
    } = object;

    if (
      !nickname ||
      !preferred_gender ||
      !gender ||
      !accepted_terms ||
      !telegram_username
    )
      return ["Missing data"];

    return [
      undefined,
      new UpdateUserDto(
        nickname,
        gender,
        preferred_gender,
        accepted_terms,
        telegram_username
      ),
    ];
  }
}
