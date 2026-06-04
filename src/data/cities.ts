export interface CityData {
  slug: string;
  name: string;
  nameIn: string;
  nameGenitive: string;
}

export const cities: CityData[] = [
  {
    slug: "moskva",
    name: "Москва",
    nameIn: "в Москве",
    nameGenitive: "Москвы",
  },
  {
    slug: "sankt-peterburg",
    name: "Санкт-Петербург",
    nameIn: "в Санкт-Петербурге",
    nameGenitive: "Санкт-Петербурга",
  },
  {
    slug: "kazan",
    name: "Казань",
    nameIn: "в Казани",
    nameGenitive: "Казани",
  },
  {
    slug: "ekaterinburg",
    name: "Екатеринбург",
    nameIn: "в Екатеринбурге",
    nameGenitive: "Екатеринбурга",
  },
  {
    slug: "novosibirsk",
    name: "Новосибирск",
    nameIn: "в Новосибирске",
    nameGenitive: "Новосибирска",
  },
];

export const getCityBySlug = (slug?: string): CityData | undefined =>
  cities.find((c) => c.slug === slug);
