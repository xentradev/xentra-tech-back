function randomRangeNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const randomAge = (age: string, gender: string): string => {
  if (gender === "female") {
    switch (age) {
      case "18":
        return randomRangeNumber(18, 19).toString();

      case "20":
        return randomRangeNumber(20, 29).toString();

      case "30":
        return randomRangeNumber(30, 39).toString();

      case "40-55":
        return randomRangeNumber(40, 55).toString();

      default:
        break;
    }
  }

  return age;
};
