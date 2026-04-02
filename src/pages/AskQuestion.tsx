import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const AskQuestion = () => {
  const [form, setForm] = useState({ name: "", contact: "", question: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("https://functions.poehali.dev/a9b287a8-a09a-4581-9cbd-877c2f9f2cf2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    setSent(true);
    setForm({ name: "", contact: "", question: "" });
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <Icon name="ArrowLeft" size={16} />
          На главную
        </a>

        <div className="bg-background rounded-3xl shadow-xl p-8">
          {sent ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                <Icon name="Check" size={32} className="text-white" />
              </div>
              <h2 className="font-heading font-800 text-2xl mb-2">Отправлено!</h2>
              <p className="text-muted-foreground mb-6">Мы свяжемся с вами в ближайшее время</p>
              <Button
                variant="outline"
                className="font-heading font-semibold"
                onClick={() => setSent(false)}
              >
                Задать ещё вопрос
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h1 className="font-heading font-800 text-2xl mb-1">Задать вопрос</h1>
                <p className="text-muted-foreground text-sm">Ответим в течение нескольких часов</p>
              </div>

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
                  <label className="text-sm font-medium mb-1.5 block">Телефон или Email</label>
                  <input
                    type="text"
                    required
                    placeholder="+7 900 000-00-00"
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border border-border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Ваш вопрос</label>
                  <textarea
                    required
                    placeholder="Напишите ваш вопрос..."
                    rows={4}
                    value={form.question}
                    onChange={(e) => setForm({ ...form, question: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full gradient-primary text-white border-0 font-heading font-semibold rounded-xl h-12"
                >
                  {loading ? "Отправляем..." : "Отправить"}
                  {!loading && <Icon name="Send" size={18} />}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;
