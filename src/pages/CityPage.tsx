import { lazy, Suspense } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import CityHero from "@/components/CityHero";
import AboutSectionOnline from "@/components/AboutSectionOnline";
import LanguagesSection from "@/components/LanguagesSection";
import { getCityBySlug } from "@/data/cities";
import { useMeta } from "@/hooks/useMeta";

const PricingSection = lazy(() => import("@/components/PricingSection"));
const TeachersSection = lazy(() => import("@/components/TeachersSection"));
const ReviewsSection = lazy(() => import("@/components/ReviewsSection"));
const CitySeoText = lazy(() => import("@/components/CitySeoText"));
const FaqSection = lazy(() => import("@/components/FaqSection"));
const BookingSection = lazy(() => import("@/components/BookingSection"));
const ContactsSection = lazy(() => import("@/components/ContactsSection"));
const Footer = lazy(() => import("@/components/Footer"));
const CookieBanner = lazy(() => import("@/components/CookieBanner"));

const CityPage = () => {
  const { pathname } = useLocation();
  const citySlug = pathname.replace(/^\//, "");
  const city = getCityBySlug(citySlug);

  useMeta({
    title: city
      ? `Курсы испанского, немецкого, английского ${city.nameIn} онлайн | Hispania`
      : "Hispania",
    description: city
      ? `Курсы иностранных языков ${city.nameIn} онлайн: испанский, немецкий, английский. Мини-группы до 6 человек, опытные преподаватели, первое занятие бесплатно.`
      : "",
    canonical: city ? `https://hispania35.online/${city.slug}` : "https://hispania35.online/",
  });

  if (!city) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <CityHero city={city} />
      <AboutSectionOnline />
      <LanguagesSection />
      <Suspense fallback={null}>
        <PricingSection />
        <TeachersSection />
        <ReviewsSection />
        <CitySeoText city={city} />
        <FaqSection />
        <BookingSection onlineOnly city={city.name} />
        <ContactsSection city={city.name} />
        <Footer />
        <CookieBanner />
      </Suspense>
    </div>
  );
};

export default CityPage;