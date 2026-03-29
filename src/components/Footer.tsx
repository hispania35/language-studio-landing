import { useTranslation } from "@/i18n/TranslationContext";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="py-8 border-t bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="#hero" className="font-heading font-900 text-xl gradient-text">
            Hispania
          </a>
          <p className="text-sm text-muted-foreground text-center">
            {t("footer_rights")}<br />
            ИНН 352527263810
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
