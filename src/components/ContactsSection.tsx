import Icon from "@/components/ui/icon";
import { useTranslation } from "@/i18n/TranslationContext";

const ContactsSection = () => {
  const { t } = useTranslation();

  const contacts = [
    { icon: "Phone", label: t("contacts_phone_label"), value: "8 (921) 123-82-21", href: "tel:89211238221" },
    { icon: "Mail", label: t("contacts_email_label"), value: "hispania35@yandex.ru", href: "mailto:hispania35@yandex.ru" },
    { icon: "MapPin", label: t("contacts_address_label"), value: t("contacts_address_value"), href: "#" },
    { icon: "Clock", label: t("contacts_hours_label"), value: t("contacts_hours_value"), href: "#" },
  ];

  const socials = [
    { icon: "Users", label: "ВКонтакте", href: "https://vk.com/club119672828" },
    { icon: "MessageCircle", label: "Макс", href: "https://max.ru/u/f9LHodD0cOKZsNO_3_ers42wYlOir_XREeTGJirv8m5T5FVHokYu5Ac6000" },
  ];

  return (
    <section id="contacts" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-4">
            <Icon name="MapPin" size={16} />
            {t("contacts_badge")}
          </div>
          <h2 className="font-heading font-800 text-4xl lg:text-5xl mb-4">
            {t("contacts_title")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("contacts_subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contacts.map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              className="hover-lift group rounded-2xl p-6 bg-white border border-border/50 shadow-sm text-center"
            >
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Icon name={contact.icon} size={24} className="text-white" />
              </div>
              <div className="text-sm text-muted-foreground mb-1">{contact.label}</div>
              <div className="font-heading font-bold text-sm">{contact.value}</div>
            </a>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.href}
              className="hover-lift w-14 h-14 rounded-2xl bg-white border border-border/50 shadow-sm flex items-center justify-center group"
            >
              <Icon
                name={social.icon}
                size={22}
                className="text-muted-foreground group-hover:text-foreground transition-colors"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
