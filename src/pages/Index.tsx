import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import LanguagesSection from "@/components/LanguagesSection";
import PricingSection from "@/components/PricingSection";
import TeachersSection from "@/components/TeachersSection";
import ReviewsSection from "@/components/ReviewsSection";
import FaqSection from "@/components/FaqSection";
import BookingSection from "@/components/BookingSection";
import ContactsSection from "@/components/ContactsSection";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <LanguagesSection />
      <PricingSection />
      <TeachersSection />
      <ReviewsSection />
      <FaqSection />
      <BookingSection />
      <ContactsSection />
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Index;