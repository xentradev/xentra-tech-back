export const handleEthnicity = (ethnicity: string, gender: string) => {
  if (ethnicity === "latina" && gender === "male") return "latino";

  return ethnicity;
};
