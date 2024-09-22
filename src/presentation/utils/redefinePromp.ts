//import { PhotoKeyWords } from "../services/chat.service";

export const redefinePrompt = ({
  originalUserPrompt,
  characterPrompt,
}: {
  originalUserPrompt: string;
  characterPrompt: string;
}) => {
  let newPrompt = characterPrompt;

  let cleanUserPrompt = originalUserPrompt.toLowerCase();
  // clean user prompt
  /*PhotoKeyWords.forEach((keyword) => {
    cleanUserPrompt = cleanUserPrompt.replace(keyword, "");
  });*/
  cleanUserPrompt = cleanUserPrompt.replace("photo", "");
  cleanUserPrompt = cleanUserPrompt.replace("please", "");
  cleanUserPrompt = cleanUserPrompt.replace("your", "their");
  cleanUserPrompt = cleanUserPrompt.replace(
    "masturbating",
    "(perfect pussy) , they are masturbating herself by sticking her finger in her pussy, masturbation, fingering, female_masturbation, "
  );
  cleanUserPrompt = cleanUserPrompt.replace(
    "having sex",
    "(perfect pussy) , 1 girl and 1 boy, heterosexual, having vaginal sex, looking at the viewer with fear, POV, <lora:NsfwPovAllInOneLoraSdxl:0.6> "
  );

  if (
    cleanUserPrompt.includes("ass") ||
    cleanUserPrompt.includes("Back view") ||
    cleanUserPrompt.includes("view from behind")
  ) {
    cleanUserPrompt += "((full body view from behind))";
  } else {
    cleanUserPrompt += "((full body view, front view point))";
  }

  if (cleanUserPrompt.includes("without clothes")) {
    cleanUserPrompt += " (full naked), ";
  }

  const loras =
    "<lora:add-detail-xl:0.6> <lora:ip-adapter-faceid-plusv2_sdxl_lora (1):0.7> <lora:NsfwPovAllInOneLoraSdxl:0.5>";

  let finalPrompt = characterPrompt + "," + cleanUserPrompt + " " + loras;
  return finalPrompt;
};
