import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4 animate-fade-up">
        <div className="text-8xl font-heading font-black gradient-text mb-4">404</div>
        <h1 className="text-2xl font-heading font-bold text-foreground mb-3">
          Страница не найдена
        </h1>
        <p className="text-muted-foreground mb-3 max-w-sm mx-auto">
          Возможно, ссылка устарела или страница была удалена
        </p>
        <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
          Сайт доступен на резервном домене:{" "}
          <a
            href="https://hispania35.ru/"
            className="gradient-text font-semibold hover:opacity-80 transition-opacity"
          >
            hispania35.ru
          </a>
        </p>
        <Button
          className="gradient-primary text-white border-0 font-heading font-semibold"
          onClick={() => window.location.href = "/"}
        >
          <Icon name="ArrowRight" size={16} className="rotate-180" />
          Вернуться на главную
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;