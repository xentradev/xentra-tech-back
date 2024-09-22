import { randomNumber } from '../randomNumber';

const hairStyleMap: Record<string, string[]> = {
  bangs: ['short bangs', 'long bangs'],
  curly: ['short curly', 'long curly'],
  bralds: ['short bralds', 'long bralds'],
};

export const handleHair = (hair_style: string) => {
  return hairStyleMap[hair_style]
    ? hairStyleMap[hair_style][randomNumber(hairStyleMap[hair_style].length)]
    : hair_style;
};
