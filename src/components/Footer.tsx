const Footer = () => {
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;