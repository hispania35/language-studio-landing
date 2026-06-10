import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface AskQuestionModalProps {
  open: boolean;
  onClose: () => void;
}

const VK_GROUP_URL = "https://vk.com/club119672828";

const AskQuestionModal = ({ open, onClose }: AskQuestionModalProps) => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("https://functions.poehali.dev/a9b287a8-a09a-4581-9cbd-877c2f9f2cf2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "promo", name: form.name, email: form.email }),
      });
      if (!res.ok) {
        setError("Проверьте правильность Email и попробуйте ещё раз");
        return;
      }
      setSent(true);
      setForm({ name: "", email: "" });
    } catch {
      setError("Не удалось отправить. Попробуйте ещё раз");
    } finally {
      setLoading(false);
    }
  };

  const close = () => {
    setSent(false);
    setError("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={close}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-background rounded-3xl shadow-2xl w-full max-w-md p-8 animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          onClick={close}
        >
          <Icon name="X" size={20} />
        </button>

        {sent ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
              <Icon name="Check" size={32} className="text-white" />
            </div>
            <h3 className="font-heading font-800 text-2xl mb-2">Промокод отправлен!</h3>
            <p className="text-muted-foreground">
              Проверьте почту — мы отправили персональный промокод на скидку. Если письма нет, загляните в папку «Спам».
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="font-heading font-800 text-2xl mb-1">Получить скидку</h3>
              <p className="text-muted-foreground text-sm">
                Подпишитесь на нашу группу ВКонтакте и получите персональный промокод на почту
              </p>
            </div>

            <a
              href={VK_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-[#0077FF] text-white font-heading font-semibold mb-5 hover:opacity-90 transition-opacity"
            >
              <Icon name="Users" size={18} />
              Подписаться на группу ВК
            </a>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Ваше имя</label>
                <input
                  type="text"
                  required
                  placeholder="Иван"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border border-border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email для промокода</label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border border-border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button
                type="submit"
                disabled={loading}
                className="w-full gradient-primary text-white border-0 font-heading font-semibold rounded-xl h-12"
              >
                {loading ? (
                  <>
                    <Icon name="Loader2" size={18} className="animate-spin" />
                    Отправляем...
                  </>
                ) : (
                  <>
                    Получить промокод
                    <Icon name="Gift" size={18} />
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Нажимая кнопку, вы подтверждаете подписку на группу и соглашаетесь с{" "}
                <a href="/privacy" target="_blank" className="underline hover:text-foreground transition-colors">
                  политикой обработки данных
                </a>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AskQuestionModal;
