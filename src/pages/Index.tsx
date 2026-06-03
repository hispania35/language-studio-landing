import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import LanguagesSection from "@/components/LanguagesSection";

const PricingSection = lazy(() => import("@/components/PricingSection"));
const TeachersSection = lazy(() => import("@/components/TeachersSection"));
const ReviewsSection = lazy(() => import("@/components/ReviewsSection"));
const SeoSection = lazy(() => import("@/components/SeoSection"));
const FaqSection = lazy(() => import("@/components/FaqSection"));
const BookingSection = lazy(() => import("@/components/BookingSection"));
const ContactsSection = lazy(() => import("@/components/ContactsSection"));
const Footer = lazy(() => import("@/components/Footer"));
const CookieBanner = lazy(() => import("@/components/CookieBanner"));

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <LanguagesSection />
      <Suspense fallback={null}>
        <PricingSection />
        <TeachersSection />
        <ReviewsSection />
        <SeoSection />
        <FaqSection />
        <BookingSection />
        <ContactsSection />
        <Footer />
        <CookieBanner />
      </Suspense>
    </div>
  );
};

export default Index;
