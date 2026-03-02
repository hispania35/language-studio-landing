import Icon from "@/components/ui/icon";

const reviews = [
  {
    name: "Дмитрий В.",
    course: "Немецкий, B1",
    text: "Переехал в Германию и нужен был немецкий для работы. Ребята подготовили меня к Goethe-Zertifikat B1 за полгода.",
    rating: 5,
  },
  {
    name: "Анастасия М.",
    course: "Испанский, A2",
    text: "Учу испанский для путешествий. Атмосфера на занятиях потрясающая, преподаватель из Испании — это совсем другой уровень!",
    rating: 5,
  },
  {
    name: "Екатерина С.",
    course: "Немецкий, A1",
    text: "Начала с нуля, через 3 месяца уже могу вести простые диалоги. Очень комфортная атмосфера для начинающих.",
    rating: 5,
  },
  {
    name: "Максим Р.",
    course: "Испанский, B1",
    text: "Лучшая языковая школа! Маленькие группы, индивидуальный подход, и реальный прогресс каждый месяц.",
    rating: 5,
  },
];

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-4">
            <Icon name="Star" size={16} />
            Отзывы
          </div>
          <h2 className="font-heading font-800 text-4xl lg:text-5xl mb-4">
            Что говорят <span className="gradient-text">наши ученики</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Более 500 учеников уже достигли своих целей вместе с нами
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