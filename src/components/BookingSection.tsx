import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/i18n/TranslationContext";

const BookingSection = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", phone: "", language: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.language) {
      toast({ title: t("booking_error_required"), variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("https://functions.poehali.dev/274de1ff-48fd-46a1-bb99-5d28f14e6f38", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast({ title: t("booking_success_title"), description: t("booking_success_desc") });
      setForm({ name: "", phone: "", language: "", type: "" });
    } catch {
      toast({ title: t("booking_error_title"), description: t("booking_error_desc"), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-24 bg-gradient-to-b from-white to-purple-50/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
                <Icon name="CalendarCheck" size={16} />
                {t("booking_badge")}
              </div>
              <h2 className="font-heading font-800 text-4xl lg:text-5xl mb-4">
                {t("booking_title_1")}{" "}
                <span className="gradient-text">{t("booking_title_2")}</span>{" "}
                {t("booking_title_3")}
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                {t("booking_subtitle")}
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-sm">{t("booking_duration")}</div>
                    <div className="text-xs text-muted-foreground">{t("booking_duration_label")}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                    <Icon name="Gift" size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-sm">{t("booking_free")}</div>
                    <div className="text-xs text-muted-foreground">{t("booking_free_label")}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                    <Icon name="FileText" size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-sm">{t("booking_plan")}</div>
                    <div className="text-xs text-muted-foreground">{t("booking_plan_label")}</div>
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-white border border-border/50 shadow-lg p-8"
            >
              <h3 className="font-heading font-bold text-xl mb-6">{t("booking_form_title")}</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">{t("booking_name_label")}</label>
                  <Input
                    placeholder={t("booking_name_placeholder")}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">{t("booking_phone_label")}</label>
                  <Input
                    placeholder={t("booking_phone_placeholder")}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">{t("booking_lang_label")}</label>
                  <Select value={form.language} onValueChange={(value) => setForm({ ...form, language: value })}>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder={t("booking_lang_placeholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">{t("booking_lang_en")}</SelectItem>
                      <SelectItem value="german">{t("booking_lang_de")}</SelectItem>
                      <SelectItem value="spanish">{t("booking_lang_es")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">{t("booking_format_label")}</label>
                  <Select value={form.type} onValueChange={(value) => setForm({ ...form, type: value })}>
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder={t("booking_format_placeholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">{t("booking_format_online")}</SelectItem>
                      <SelectItem value="offline">{t("booking_format_offline")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full gradient-primary text-white border-0 font-heading font-semibold h-14 rounded-xl text-base mt-2"
                >
                  {loading ? (
                    <>
                      <Icon name="Loader2" size={20} className="animate-spin" />
                      {t("booking_submitting")}
                    </>
                  ) : (
                    <>
                      {t("booking_submit")}
                      <Icon name="ArrowRight" size={20} />
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-4">
                {t("booking_privacy").split("политикой")[0]}
                <a href="/privacy" target="_blank" className="underline hover:text-foreground transition-colors">
                  {t("booking_privacy").includes("политикой") ? "политикой обработки данных" : t("booking_privacy")}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
