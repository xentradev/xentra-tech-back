export const handleAge = (age: string) => {
  const numberAge = Number(age);

  if (numberAge >= 30 && numberAge <= 39) {
    return `${age} years <lora:age_slider_v6:2.5>`;
  }

  if (numberAge >= 40 && numberAge <= 48) {
    return `${age} years <lora:age_slider_v6:3>`;
  }

  if (numberAge >= 49 && numberAge <= 55) {
    return `${age} years <lora:age_slider_v6:3.3>`;
  }

  return `${age} years`;
};
