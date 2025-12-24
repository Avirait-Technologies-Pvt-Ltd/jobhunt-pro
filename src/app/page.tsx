import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Categories from '@/components/sections/Categories';
import FeaturedJobs from '@/components/sections/FeaturedJobs';
import HowItWorks from '@/components/sections/HowItWorks';
import FeaturedCompanies from '@/components/sections/FeaturedCompanies';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Categories />
        <FeaturedJobs />
        <HowItWorks />
        <FeaturedCompanies />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
