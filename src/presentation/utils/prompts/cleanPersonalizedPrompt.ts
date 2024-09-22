import { handleCasualClothing } from "./handleCasualClothing";

export const cleanPersonalizedPrompt = (originalPrompt: string): string => {
  const cleanPrompt = cleanKeyWords(originalPrompt);
  const promptWithLoras = addLoras(cleanPrompt);
  const result = addRandomClothes(promptWithLoras);
  return result;
};

const PERSONALIZED_PROMPT_KEY_WORDS = [
  "yours",
  "your",
  "show me",
  "picture ",
  "photo",
  //...PhotoKeyWords,
];

const cleanKeyWords = (originalPrompt: string): string => {
  let cleanPrompt = originalPrompt;
  PERSONALIZED_PROMPT_KEY_WORDS.forEach((keyWord) => {
    cleanPrompt = cleanPrompt.replace(keyWord, "");
  });
  return cleanPrompt;
};

const AVAILABLE_LORAS = [
  {
    name: "blowjow",
    keyWords: ["blobjow", "blobjob"],
    prompt: "<lora:PovBlowjob-v3:0.8> pov blowjob, from top, top view, penis",
  },
  {
    name: "cum",
    keyWords: ["cum"],
    prompt:
      ", <lora:cumshot_49:0.45>, cum string, ejaculation, cumshot, naked,  ",
  },
  {
    name: "missionary",
    keyWords: ["sex"],
    prompt:
      ", <lora:PovMissionaryAnal-v6:0.5> missionary vaginal, laying back, pov, beautiful penis in vagina, ",
  },
  {
    name: "doggy",
    keyWords: ["doggy"],
    prompt:
      ", <lora:PovDoggyAnal-v4:0.5> doggystyle anal, from above, naked,  ",
  },
  {
    name: "dildo",
    keyWords: ["dildo"],
    prompt:
      ", <lora:quiron_PussyBigDildo_v2_Lora:0.7> herself with dildo, lying down, spread legs, naked",
  },
  {
    name: "masturbation",
    keyWords: ["masturbation"],
    prompt:
      ", ((fingering)), (open legs showing pussy), (hands on pussy), naked ",
  },
  {
    name: "pussy",
    keyWords: ["pussy"],
    prompt: ", (open legs showing pussy), naked ",
  },
  {
    name: "ass",
    keyWords: ["ass"],
    prompt: ", view from behind",
  },
  {
    name: "breasts",
    keyWords: ["tit", "tits"],
    prompt: ", (showing breasts), naked",
  },
];

const addLoras = (originalPrompt: string): string => {
  let cleanPrompt = originalPrompt;
  AVAILABLE_LORAS.forEach((lora) => {
    lora.keyWords.forEach((keyword) => {
      if (cleanPrompt === originalPrompt) {
        cleanPrompt = cleanPrompt.replace(keyword, lora.prompt);
      }
    });
  });
  return cleanPrompt;
};

const NUDES_WORDS = ["naked"];

const CLOTHING_SOMETHING_WORDS = ["no_nude", "no_nudes"];

const addRandomClothes = (prompt: string): string => {
  let cleanPrompt = prompt;
  let hasNude = false;
  let hasClothesInWords = true;

  NUDES_WORDS.forEach((word) => {
    if (prompt.includes(word)) hasNude = true;
  });

  CLOTHING_SOMETHING_WORDS.forEach((word) => {
    if (prompt.includes(word)) hasClothesInWords = false;
  });

  if (!hasNude && !hasClothesInWords) {
    cleanPrompt =
      cleanPrompt +
      `, wearing ${handleCasualClothing(cleanPrompt)}, ((with clothes))`;
  }

  if (!hasNude && hasClothesInWords) {
    cleanPrompt = cleanPrompt + `, ((with clothes))`;
  }

  return cleanPrompt;
};
