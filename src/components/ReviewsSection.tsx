import Icon from "@/components/ui/icon";
import { useTranslation } from "@/i18n/TranslationContext";

const ReviewsSection = () => {
  const { t } = useTranslation();

  const reviews = [
    { name: t("review1_name"), course: t("review1_course"), text: t("review1_text"), rating: 5 },
    { name: t("review2_name"), course: t("review2_course"), text: t("review2_text"), rating: 5 },
    { name: t("review3_name"), course: t("review3_course"), text: t("review3_text"), rating: 5 },
    { name: t("review4_name"), course: t("review4_course"), text: t("review4_text"), rating: 5 },
  ];

  return (
    <section id="reviews" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-4">
            <Icon name="Star" size={16} />
            {t("reviews_badge")}
          </div>
          <h2 className="font-heading font-800 text-4xl lg:text-5xl mb-4">
            {t("reviews_title")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("reviews_subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="hover-lift rounded-2xl p-6 bg-white border border-border/50 shadow-sm"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Icon key={i} name="Star" size={18} className="text-orange-400 fill-orange-400" />
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed mb-5 text-sm">
                «{review.text}»
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-heading font-bold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-heading font-bold text-sm">{review.name}</div>
                  <div className="text-xs text-muted-foreground">{review.course}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
