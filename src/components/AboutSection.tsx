import Icon from "@/components/ui/icon";
import { useTranslation } from "@/i18n/TranslationContext";

const AboutSection = () => {
  const { t } = useTranslation();

  const features = [
    { icon: "Users", title: t("about_feat1_title"), description: t("about_feat1_desc") },
    { icon: "Monitor", title: t("about_feat2_title"), description: t("about_feat2_desc") },
    { icon: "Target", title: t("about_feat3_title"), description: t("about_feat3_desc") },
    { icon: "Award", title: t("about_feat4_title"), description: t("about_feat4_desc") },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-purple-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-4">
            <Icon name="Heart" size={16} />
            {t("about_badge")}
          </div>
          <h2 className="font-heading font-800 text-4xl lg:text-5xl mb-4">
            {t("about_title").replace("Hispania", "")} <span className="gradient-text">Hispania</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("about_subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="hover-lift group rounded-2xl p-6 bg-white border border-border/50 shadow-sm"
            >
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Icon name={feature.icon} size={24} className="text-white" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
