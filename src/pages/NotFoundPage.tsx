import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useEffect, useState } from "react";

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
        <p className="text-muted-foreground text-sm mt-6">
          Автоматический переход на главную через {seconds} сек.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;