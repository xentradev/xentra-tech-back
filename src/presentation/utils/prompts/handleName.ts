import { randomNumber } from "../randomNumber";

const CAUCASIAN_FEMALE_NAMES: string[] = [
  "Nele Luitgard",
  "Eter Tsisia",
  "Antonia Lia",
  "Klotylda Ljuba",
  "Cecilija Dejana",
  "Emily Smith",
  "Olivia Johnson",
  "Emma Williams",
  "Ava Brown",
  "Sophia Jones",
  "Mia Davis",
  "Isabella Miller",
  "Charlotte Wilson",
  "Amelia Moore",
  "Harper Taylor",
  "Evelyn Anderson",
  "Abigail Thomas",
  "Madison White",
  "Ella Harris",
  "Scarlett Martin",
  "Grace Thompson",
  "Chloe Garcia",
  "Lily Martinez",
  "Hannah Robinson",
  "Lillian Clark",
];

const CAUCASIAN_MALE_NAMES: string[] = [
  "Koloman Frane",
  "Pero Pejo",
  "Prokop Ludvík",
  "Stanislav Serhiy",
  "Emir Skender",
];

const ASIAN_FEMALE_NAMES: string[] = [
  "Yuri Katsuko",
  "Ji-Young Gyeong",
  "Zhou Shi",
  "Myung Sung-Min",
  "Hye-Jin Ji-Su",
  "Mei Lin",
  "Aiko Nakamura",
  "Hana Kim",
  "Li Zhang",
  "Sora Lee",
  "Yumi Tanaka",
  "An Nguyen",
  "Rina Suzuki",
  "Jiao Wu",
  "Keiko Sato",
  "Min Seo Park",
  "Lian Chen",
  "Hitomi Yamamoto",
  "Bo Huang",
  "Nari Choi",
  "Sakura Matsumoto",
  "Hanh Tran",
  "Kyoko Ito",
  "Xiu Ying Wang",
  "Mai Pham",
];

const ASIAN_MALE_NAMES: string[] = [
  "Wen Haneul",
  "Ji-Soo Masato",
  "Seok-Jin Seo-Joon",
  "Shui Zhong",
  "Zhou Shui",
];

const ARAB_FEMALE_NAMES: string[] = [
  "Saliha Nassim",
  "Lavanya Nandita",
  "Wati Sitti",
  "Dema Fathiyya",
  "Salama Rizwana",
  "Layla Al-Mansour",
  "Aisha Haddad",
  "Fatima Al-Farsi",
  "Yasmin Al-Khalil",
  "Noor Hamdan",
  "Zainab Al-Saadi",
  "Salma Al-Rashid",
  "Mariam Abbas",
  "Rania Al-Najjar",
  "Hala Al-Mutairi",
  "Lina Al-Salem",
  "Amal Al-Mahmoud",
  "Samira Al-Amin",
  "Nadine Al-Zahrani",
  "Dina Al-Hashem",
  "Sara Al-Bakri",
  "Reem Al-Yousef",
  "Najwa Al-Ghamdi",
  "Hana Al-Qadi",
  "Ruba Al-Hussaini",
];

const ARAB_MALE_NAMES: string[] = [
  "Hidayat Arif",
  "Tufayl Abd al-Karim",
  "Hamed Hisein",
  "Riaz Dawud",
  "Najeeb Muslim",
];

const BLACK_FEMALE_NAMES: string[] = [
  "Aisha Johnson",
  "Nia Williams",
  "Ayana Davis",
  "Zuri Thompson",
  "Imani Robinson",
  " Aaliyah Johnson",
  "Brianna Williams",
  "Chantel Brown",
  "Nia Davis",
  "Ayana Miller",
  "Kiana Wilson",
  "Zuri Harris",
  "Tanisha Moore",
  "Monique Jackson",
  "Sade Thomas",
  "Ebony Taylor",
  "Jasmine Anderson",
  "Kiara White",
  "Tasha Lewis",
  "Fatima King",
  "Latoya Walker",
  "Anika Scott",
  "Rashida Green",
  "Kenya Wright",
];

const BLACK_MALE_NAMES: string[] = [
  "HMalik Jenkins",
  "Jamal Wright",
  "Kwame Johnson",
  "Amari Thompson",
  "Jamar Davis",
];

const LATINA_FEMALE_NAMES: string[] = [
  "María González",
  "Ana Silva",
  "Carmen Martínez",
  "Sofia Hernandez",
  "Valentina Lopez",
  "Sofia Garcia",
  "Isabella Martinez",
  "Camila Hernandez",
  "Natalia Perez",
  "Mariana Gonzalez",
  "Lucia Ramirez",
  "Gabriela Torres",
  "Alejandra Cruz",
  "Daniela Diaz",
  "Paula Ortiz",
  "Adriana Flores",
  "Juliana Sanchez",
  "Andrea Vargas",
  "Lorena Moreno",
  "Victoria Castillo",
  "Angela Rios",
  "Maria Fernandez",
  "Laura Reyes",
  "Claudia Chavez",
];

const LATINA_MALE_NAMES: string[] = [
  "Juan Rodriguez",
  "Carlos Perez",
  "Luis Martinez",
  "Diego Garcian",
  "Javier Hernandez",
];

const nameMap: Record<string, Record<string, string[]>> = {
  caucasian: {
    female: CAUCASIAN_FEMALE_NAMES,
    male: CAUCASIAN_MALE_NAMES,
  },
  asian: {
    female: ASIAN_FEMALE_NAMES,
    male: ASIAN_MALE_NAMES,
  },
  arab: {
    female: ARAB_FEMALE_NAMES,
    male: ARAB_MALE_NAMES,
  },
  black: {
    female: BLACK_FEMALE_NAMES,
    male: BLACK_MALE_NAMES,
  },
  latina: {
    female: LATINA_FEMALE_NAMES,
    male: LATINA_MALE_NAMES,
  },
};

export const handleName = (gender: string, ethnicity: string) => {
  return nameMap[ethnicity][gender][
    randomNumber(nameMap[ethnicity][gender].length)
  ];
};
