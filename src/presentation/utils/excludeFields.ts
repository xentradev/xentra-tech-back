export const exclude = (object: Object, keys: string[]) => {
  return Object.fromEntries(
    Object.entries(object).filter(([key]) => !keys.includes(key))
  );
};
