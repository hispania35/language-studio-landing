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

const BookingSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    language: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.language) {
      toast({ title: "Заполните все обязательные поля", variant: "destructive" });
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
      toast({
        title: "Заявка отправлена! 🎉",
        description: "Мы свяжемся с вами в течение 30 минут",
      });
      setForm({ name: "", phone: "", language: "", type: "" });
    } catch {
      toast({ title: "Ошибка отправки", description: "Попробуйте ещё раз или позвоните нам", variant: "destructive" });
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
                Запись
              </div>
              <h2 className="font-heading font-800 text-4xl lg:text-5xl mb-4">
                Запишитесь на{" "}
                <span className="gradient-text">бесплатное</span> пробное
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Познакомьтесь с преподавателем, оцените методику и получите персональный план обучения — абсолютно бесплатно
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-sm">30 минут</div>
                    <div className="text-xs text-muted-foreground">Продолжительность пробного</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                    <Icon name="Gift" size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-sm">Бесплатно</div>
                    <div className="text-xs text-muted-foreground">Никаких скрытых платежей</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                    <Icon name="FileText" size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-sm">Персональный план</div>
                    <div className="text-xs text-muted-foreground">Получите план обучения после урока</div>
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-white border border-border/50 shadow-lg p-8"
            >
              <h3 className="font-heading font-bold text-xl mb-6">Оставьте заявку</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Ваше имя *</label>
                  <Input
                    placeholder="Как вас зовут?"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Телефон *</label>
                  <Input
                    placeholder="+7 (___) ___-__-__"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="h-12 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Язык *</label>
                  <Select
                    value={form.language}
                    onValueChange={(value) => setForm({ ...form, language: value })}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Выберите язык" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">🇬🇧 Английский</SelectItem>
                      <SelectItem value="german">🇩🇪 Немецкий</SelectItem>
                      <SelectItem value="spanish">🇪🇸 Испанский</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Формат</label>
                  <Select
                    value={form.type}
                    onValueChange={(value) => setForm({ ...form, type: value })}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Онлайн или оффлайн?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">💻 Онлайн</SelectItem>
                      <SelectItem value="offline">🏫 В студии</SelectItem>
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
                      Отправляем...
                    </>
                  ) : (
                    <>
                      Записаться бесплатно
                      <Icon name="ArrowRight" size={20} />
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Нажимая кнопку, вы соглашаетесь с политикой обработки данных
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;