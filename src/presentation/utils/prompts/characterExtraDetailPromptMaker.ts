import { CreateCharacterForm } from "../../../domain/dto/character/create-character";
import { handleClothing } from "./handleClothing";
import { handleLocation } from "./handleLocation";

export const characterExtraDetailPromptMaker = (
  character: CreateCharacterForm
) => {
  const { clothing } = character;
  const randomLocation = handleLocation(clothing);
  const clothingPrompt = handleClothing(clothing);

  let promptResult = `, (standing , ${randomLocation}, wearing ${clothingPrompt}), sunlight, sfw, with clothes`;
  return promptResult;
};
