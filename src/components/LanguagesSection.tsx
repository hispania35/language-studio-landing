import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useTranslation } from "@/i18n/TranslationContext";

const LanguagesSection = () => {
  const { t } = useTranslation();

  const languages = [
    {
      flag: "🇬🇧",
      name: "English",
      native: "English",
      gradient: "gradient-card-blue",
      levels: "A1 — B2",
      features: [t("lang_en_feat1"), t("lang_en_feat2"), t("lang_en_feat3")],
      popular: true,
    },
    {
      flag: "🇩🇪",
      name: "Deutsch",
      native: "Deutsch",
      gradient: "gradient-card-purple",
      levels: "A1 — B2",
      features: [t("lang_de_feat1"), t("lang_de_feat2"), t("lang_de_feat3")],
      popular: false,
    },
    {
      flag: "🇪🇸",
      name: "Español",
      native: "Español",
      gradient: "gradient-card-orange",
      levels: "A1 — B2",
      features: [t("lang_es_feat1"), t("lang_es_feat2"), t("lang_es_feat3")],
      popular: false,
    },
  ];

  return (
    <section id="languages" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            <Icon name="Globe" size={16} />
            {t("lang_badge")}
          </div>
          <h2 className="font-heading font-800 text-4xl lg:text-5xl mb-4">
            {t("lang_title")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("lang_subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {languages.map((lang, index) => (
            <div
              key={index}
              className={`hover-lift relative rounded-3xl p-8 ${lang.gradient} border border-white/50`}
            >
              {lang.popular && (
                <div className="absolute -top-3 right-6 px-4 py-1 gradient-primary text-white text-xs font-bold rounded-full">
                  {t("lang_popular")}
                </div>
              )}

              <div className="text-5xl mb-4">{lang.flag}</div>
              <h3 className="font-heading font-800 text-2xl mb-1">{lang.name}</h3>
              <p className="text-muted-foreground font-medium mb-1">{lang.native}</p>
              <p className="text-sm text-muted-foreground mb-6">A1 — B2</p>

              <ul className="space-y-3 mb-8">
                {lang.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={12} className="text-white" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className="w-full gradient-primary text-white border-0 font-heading font-semibold rounded-xl h-12"
                onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t("lang_choose")}
                <Icon name="ArrowRight" size={18} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LanguagesSection;
