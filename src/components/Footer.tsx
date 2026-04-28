import { useState } from "react";
import Icon from "@/components/ui/icon";

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const shareUrl = "https://hispania35.online/";
  const shareText = "Языковая студия Hispania — испанский, немецкий, английский в Вологде и онлайн!";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Hispania", text: shareText, url: shareUrl });
      } catch (_e) { void _e; }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <footer className="py-8 border-t bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="#hero" className="font-heading font-900 text-xl gradient-text">
            Hispania
          </a>
          <p className="text-sm text-muted-foreground text-center">
            © 2026 Hispania. Все права защищены.<br />
            ИНН 352527263810
          </p>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:border-border transition-colors"
          >
            <Icon name={copied ? "Check" : "Share2"} size={16} />
            {copied ? "Ссылка скопирована!" : "Поделиться"}
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;