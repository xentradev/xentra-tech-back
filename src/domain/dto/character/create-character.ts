import { regularExps } from "../../../config";

export class CreateCharacterForm {
  constructor(
    public style: string,
    public ethnicity: string,
    public age: string,
    public eyes_color: string,
    public hair_style: string,
    public hair_color: string,
    public body_type: string,
    public breast_size: string,
    public butt_size: string,
    public personality: string,
    public occupation: string,
    public hobbies: string[],
    public relationship: string,
    public clothing: string,
    public gender: string
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, CreateCharacterForm?] {
    const {
      style,
      ethnicity,
      age,
      eyes_color,
      hair_style,
      hair_color,
      body_type,
      breast_size,
      butt_size,
      personality,
      occupation,
      hobbies,
      relationship,
      clothing,
      gender,
    } = object;

    return [
      undefined,
      new CreateCharacterForm(
        style,
        ethnicity,
        age,
        eyes_color,
        hair_style,
        hair_color,
        body_type,
        breast_size,
        butt_size,
        personality,
        occupation,
        hobbies,
        relationship,
        clothing,
        gender
      ),
    ];
  }
}
