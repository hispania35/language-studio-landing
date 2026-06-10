import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useEffect, useState } from "react";
import { getCityBySlug } from "@/data/cities";

const popularCitySlugs = [
  "moskva",
  "sankt-peterburg",
  "novosibirsk",
  "ekaterinburg",
  "kazan",
  "nizhniy-novgorod",
];

const NotFoundPage = () => {
  const [seconds, setSeconds] = useState(7);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      window.location.href = "/";
    }, 7000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const popularCities = popularCitySlugs
    .map((slug) => getCityBySlug(slug))
    .filter((city): city is NonNullable<typeof city> => Boolean(city));

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4 animate-fade-up">
        <div className="text-8xl font-heading font-black gradient-text mb-4">404</div>
        <h1 className="text-2xl font-heading font-bold text-foreground mb-3">
          Страница не найдена
        </h1>
        <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
          Возможно, ссылка устарела или страница была удалена
        </p>
        <Button
          className="gradient-primary text-white border-0 font-heading font-semibold"
          onClick={() => window.location.href = "/"}
        >
          <Icon name="ArrowRight" size={16} className="rotate-180" />
          Вернуться на главную
        </Button>
        <div className="mt-10">
          <p className="text-muted-foreground text-sm mb-4">
            Популярные города:
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
            {popularCities.map((city) => (
              <a
                key={city.slug}
                href={`/${city.slug}`}
                className="px-4 py-2 rounded-full border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                {city.name}
              </a>
            ))}
          </div>
        </div>
        <p className="text-muted-foreground text-sm mt-8">
          Автоматический переход на главную через {seconds} сек.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;