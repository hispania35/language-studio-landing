import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const navLinks = [
  { label: "Главная", href: "#hero" },
  { label: "О студии", href: "#about" },
  { label: "Языки", href: "#languages" },
  { label: "Преподаватели", href: "#teachers" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#hero" className="font-heading font-900 text-2xl gradient-text">
          Hispania
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button
          className="hidden md:inline-flex gradient-primary text-white border-0 font-heading font-semibold"
          onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
        >
          Записаться
        </Button>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass border-t px-4 pb-4 animate-fade-up">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-3 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button
            className="w-full mt-2 gradient-primary text-white border-0 font-heading font-semibold"
            onClick={() => {
              setMobileOpen(false);
              document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Записаться
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
