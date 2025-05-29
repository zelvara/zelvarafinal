import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import FeaturedCategories from '../components/home/FeaturedCategories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import FeaturedCollections from '../components/home/FeaturedCollections';
import Newsletter from '../components/home/Newsletter';
import Testimonials from '../components/home/Testimonials';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'LUXE - Premium Clothing';
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <FeaturedCollections />
      <Testimonials />
      <Newsletter />
    </Layout>
  );
};

export default HomePage;