import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const COOKIE_KEY = "hispania_cookie_accepted";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_KEY)) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto glass rounded-xl shadow-lg border border-border p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-foreground/80 flex-1">
          <span className="font-semibold text-foreground">Hispania</span> использует файлы cookie. Продолжая работу с{" "}
          <a href="https://hispania35.online/" className="gradient-text font-medium">
            hispania35.online
          </a>{" "}
          вы подтверждаете использование сайтом cookies вашего браузера, которые помогают нам делать этот сайт удобнее для пользователей. Однако вы можете запретить сохранение определённых файлов cookie в настройках своего браузера.{" "}
          <br className="hidden sm:block" />
          Обработка данных пользователей осуществляется в соответствии с{" "}
          <a href="/privacy" className="gradient-text font-medium hover:opacity-80 transition-opacity">
            Политикой обработки персональных данных
          </a>{" "}
          и Уведомлением об использовании файлов cookie.
        </p>
        <Button
          className="gradient-primary text-white border-0 font-heading font-semibold shrink-0"
          onClick={accept}
        >
          Принять
        </Button>
      </div>
    </div>
  );
};

export default CookieBanner;
