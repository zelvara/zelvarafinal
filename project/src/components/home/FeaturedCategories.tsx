import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/products';

const FeaturedCategories: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of clothing categories, each curated with premium quality pieces
            designed for comfort and style.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              to={`/shop/category/${category.id}`} 
              key={category.id}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg aspect-[3/4] shadow-md">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-xl font-semibold text-white mb-1">{category.name}</h3>
                    <p className="text-gray-300 text-sm mb-4 opacity-0 -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      {category.description}
                    </p>
                    <span className="inline-block text-white text-sm font-medium border-b border-white pb-1 transition-all duration-300 group-hover:pl-2">
                      Explore Collection
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;