const clothesMap: Record<string, string> = {
  bikini: "a sexy two-piece bikini",
  skirt: "a skirt with a top shirt",
  cheerleader: "a cheerleader outfit",
  pencil_dress: "a pencil dress",
  long_dress: "a long dress",
  woman_basketball_jersey: "a women's basketball jersey with shorts",
  soccer: "a short-sleeved jersey and matching shorts",
  tennis: "a polo shirt and a pleated skirt",
  swimsuit: "a one-piece swimsuit with a fitted top and bottom for swimming",
  sport: "a sports outfit",
  wedding_dress: "a wedding dress",
  fancy_dress: "a glamorous fancy dress with an embellished bodice and flowing skirt",
  witch: "a pointed hat, a sexy long-sleeved dress, and a flowing cape (witch)",
  summer_dress: "a light and breezy summer dress",
  lingerie: "sexy lingerie",
  latex_outfit: "a tight latex outfit",
  princess_dress: "a fitted, bejeweled bodice and a voluminous, floor-length skirt",
  corset: "a corset with matching bottoms",
  angel: "an angel costume with wings and a halo",
  maid: "a sexy maid uniform",
  woman_medieval_armor: "a woman's medieval armor with a breastplate, gauntlets, and greaves",
  lab_coat: "a lab coat",
  cowboy: "a cowboy outfit",
  carnival: "a colorful carnival costume",
  casual: "casual clothes",
  nurse: "a nurse uniform",
  santa_clauss: "a Santa Claus costume with a hat",
  police: "a police uniform with a badge and hat",
  steampunk: "a steampunk outfit with gears",
  superhero: "a superhero uniform with a form-fitting bodysuit, a cape, and boots",
  teacher: "a teacher outfit with a button-up blouse, a pencil skirt, and sensible heels",
  viking: "a viking costume with a helmet and fur",
  firefighter: "a firefighter uniform with a protective jacket, pants, and helmet",
  military: "a military uniform with camouflage pattern, including a jacket, pants, and boots",
  construction: "a construction worker outfit with a hard hat, reflective vest, and durable work pants",
  long_coat: "a long coat with a fitted top and a flowing, knee-length skirt underneath",
  hoodie: "a comfortable hoodie with jeans",
  jeans: "jeans with a casual top shirt",
  leggings: "leggings with a long tunic or oversized shirt",
  ninja: "a ninja costume with a black long-sleeved top, matching pants, and a sash belt",
  pyjamas: "comfortable pyjamas with a top and bottom set",
  clown: "a clown costume with colorful patterns and a red nose",
  barista: "a barista uniform with a shirt, apron, and comfortable pants",
  belly_dancer: "a belly dancer outfit with a decorated bra top and a flowing skirt",
  goth: "goth clothing with dark, edgy designs and accessories",
  pirate: "a pirate costume with a tricorn hat, eye patch, and boots",
  prisoner: "a prisoner uniform with black and white stripes and a prisoner number",
  race_driver: "a race driver suit with sponsor logos",
  hijab: "a hijab with a modest, long-sleeved outfit",
  tutu: "a tutu with a matching leotard",
  poncho: "a poncho with vibrant patterns over a simple shirt and pants",
  hiphop: "a hip-hop outfit with baggy pants, a graphic t-shirt, and a cap",
  lumberjack: "a lumberjack outfit with a plaid shirt, jeans, and sturdy boots",
  adventurer: "a tank top and cargo shorts, inspired by Lara Croft",
  sailor: "a sailor outfit with a sailor hat and navy-themed clothing",
  golf: "a golf uniform with a polo shirt and khaki shorts or pants",
  onesie: "a comfortable, one-piece onesie",
  oversized_shirt: "an oversized shirt paired with leggings",
  tribal: "a traditional tribal outfit with cultural patterns and accessories",
  secretary: "a professional secretary outfit with a pencil skirt and blouse",
  pop_star: "a pop star outfit with flashy, trendy clothing and accessories",
  pilot: "a commercial pilot uniform with a jacket, tie, and cap",
  builder: "construction clothing with durable work pants, a shirt, and a tool belt",
  monk: "a monk costume with a simple, long robe and a hood",
  samurai: "a samurai costume with traditional armor, including a kimono and a katana",
};

export const handleClothing = (clothes: string): string => {
  return clothesMap[clothes] || clothes;
};
