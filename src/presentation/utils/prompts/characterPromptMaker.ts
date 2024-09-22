import { CreateCharacterForm } from "../../../domain/dto/character/create-character";
import { randomAge } from "../randomAge";
import { handleAge } from "./handleAge";
import { handleEthnicity } from "./handleEthnicity";
import { handleHair } from "./handleHair";

const genderMap: Record<string, string> = {
  male: "boy",
  female: "girl",
};

export const characterPromptMaker = (
  character: CreateCharacterForm,
  characterName: string,
  characterAge: string
) => {
  let promptResult;
  const gender = genderMap[character.gender];
  const hair =
    character.gender === "female"
      ? handleHair(character.hair_style)
      : character.hair_style;

  promptResult = ` RAW photo, portrait ,8k uhd, dslr, soft lighting, high quality, film grain, Fujifilm XT3, ${characterName}, ${handleAge(
    characterAge
  )}, ${handleEthnicity(
    character.ethnicity,
    character.gender
  )} in ethnicity, sexy face, seductive, 1${gender}, ${
    character.hair_color
  } ${hair} hair, ${character.body_type} body,`;
  // extra female body description
  promptResult +=
    character.gender === "female"
      ? `${character.breast_size} breasts, ${character.butt_size} butt,`
      : "";
  promptResult += `${character.eyes_color} eyes, (ultra detailed, masterpiece, best quality:1.4), hyper detail,(realistic),(delicate and beautiful),(full body) (solo) (alone)`;
  return promptResult;
};
