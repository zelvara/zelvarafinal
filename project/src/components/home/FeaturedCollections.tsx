import React from 'react';
import { Link } from 'react-router-dom';
import { collections } from '../../data/products';

const FeaturedCollections: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Collections</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collections, designed to help you create the perfect wardrobe for any occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link
              to={`/collections/${collection.id}`}
              key={collection.id}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-lg aspect-[3/4] shadow-md">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 transform translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                    {collection.name}
                  </h3>
                  <p className="text-white/80 text-sm mb-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    {collection.description}
                  </p>
                  <span className="inline-block text-white text-sm font-medium pb-1 border-b border-white opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    Explore Collection
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;