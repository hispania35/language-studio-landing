export interface CityData {
  slug: string;
  name: string;
  nameIn: string;
  nameGenitive: string;
  aliases: string[];
}

export const cities: CityData[] = [
  {
    slug: "moskva",
    name: "Москва",
    nameIn: "в Москве",
    nameGenitive: "Москвы",
    aliases: ["москва", "moscow", "moskva"],
  },
  {
    slug: "sankt-peterburg",
    name: "Санкт-Петербург",
    nameIn: "в Санкт-Петербурге",
    nameGenitive: "Санкт-Петербурга",
    aliases: ["санкт-петербург", "петербург", "spb", "saint petersburg", "st petersburg", "sankt-peterburg", "petersburg"],
  },
  {
    slug: "kazan",
    name: "Казань",
    nameIn: "в Казани",
    nameGenitive: "Казани",
    aliases: ["казань", "kazan"],
  },
  {
    slug: "ekaterinburg",
    name: "Екатеринбург",
    nameIn: "в Екатеринбурге",
    nameGenitive: "Екатеринбурга",
    aliases: ["екатеринбург", "yekaterinburg", "ekaterinburg"],
  },
  {
    slug: "novosibirsk",
    name: "Новосибирск",
    nameIn: "в Новосибирске",
    nameGenitive: "Новосибирска",
    aliases: ["новосибирск", "novosibirsk"],
  },
];

export const getCityBySlug = (slug?: string): CityData | undefined =>
  cities.find((c) => c.slug === slug);

export const getCityByName = (name?: string): CityData | undefined => {
  if (!name) return undefined;
  const normalized = name.trim().toLowerCase();
  return cities.find((c) => c.aliases.includes(normalized));
};