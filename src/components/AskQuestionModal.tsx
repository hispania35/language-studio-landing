import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface AskQuestionModalProps {
  open: boolean;
  onClose: () => void;
}

const AskQuestionModal = ({ open, onClose }: AskQuestionModalProps) => {
  const [form, setForm] = useState({ name: "", contact: "", question: "" });
  const [sent, setSent] = useState(false);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", contact: "", question: "" });
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2500);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-background rounded-3xl shadow-2xl w-full max-w-md p-8 animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          onClick={onClose}
        >
          <Icon name="X" size={20} />
        </button>

        {sent ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
              <Icon name="Check" size={32} className="text-white" />
            </div>
            <h3 className="font-heading font-800 text-2xl mb-2">Отправлено!</h3>
            <p className="text-muted-foreground">Мы свяжемся с вами в ближайшее время</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="font-heading font-800 text-2xl mb-1">Задать вопрос</h3>
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
                className="w-full gradient-primary text-white border-0 font-heading font-semibold rounded-xl h-12"
              >
                Отправить
                <Icon name="Send" size={18} />
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AskQuestionModal;
