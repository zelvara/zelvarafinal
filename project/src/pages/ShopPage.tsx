import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import Layout from '../components/layout/Layout';
import ProductGrid from '../components/product/ProductGrid';
import Button from '../components/ui/Button';
import { products, categories } from '../data/products';
import { Product } from '../types';

const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    categories: true,
    price: true,
    size: true,
    color: true,
  });
  
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState<string>('newest');

  // Available options (derived from products)
  const allSizes = Array.from(new Set(products.flatMap(p => p.sizes)));
  const allColors = Array.from(
    new Set(products.flatMap(p => p.colors.map(c => c.name)))
  );

  // Get URL params on initial load
  useEffect(() => {
    const category = searchParams.get('category');
    const sizes = searchParams.get('sizes')?.split(',').filter(Boolean) || [];
    const colors = searchParams.get('colors')?.split(',').filter(Boolean) || [];
    const minPrice = Number(searchParams.get('minPrice') || 0);
    const maxPrice = Number(searchParams.get('maxPrice') || 200);
    const sort = searchParams.get('sort') || 'newest';

    if (category) setSelectedCategory(category);
    if (sizes.length) setSelectedSizes(sizes);
    if (colors.length) setSelectedColors(colors);
    setPriceRange([minPrice, maxPrice]);
    setSortBy(sort);
  }, [searchParams]);

  // Update URL params when filters change
  useEffect(() => {
    const params: Record<string, string> = {};
    
    if (selectedCategory) params.category = selectedCategory;
    if (selectedSizes.length) params.sizes = selectedSizes.join(',');
    if (selectedColors.length) params.colors = selectedColors.join(',');
    params.minPrice = priceRange[0].toString();
    params.maxPrice = priceRange[1].toString();
    params.sort = sortBy;
    
    setSearchParams(params, { replace: true });
  }, [selectedCategory, selectedSizes, selectedColors, priceRange, sortBy, setSearchParams]);

  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    // Category filter
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    // Size filter
    if (selectedSizes.length) {
      result = result.filter(p => 
        p.sizes.some(size => selectedSizes.includes(size))
      );
    }
    
    // Color filter
    if (selectedColors.length) {
      result = result.filter(p => 
        p.colors.some(color => selectedColors.includes(color.name))
      );
    }
    
    // Price filter
    result = result.filter(p => 
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    
    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'newest') {
      // Assuming newer products have higher IDs
      result.sort((a, b) => Number(b.id) - Number(a.id));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, selectedSizes, selectedColors, priceRange, sortBy, products]);

  // Toggle filter section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle category selection
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(prevCategory => prevCategory === categoryId ? null : categoryId);
  };

  // Handle size selection
  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  // Handle color selection
  const handleColorToggle = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 200]);
    setSortBy('newest');
  };

  // Get color object by name
  const getColorByName = (name: string) => {
    for (const product of products) {
      const foundColor = product.colors.find(c => c.name === name);
      if (foundColor) return foundColor;
    }
    return { name, value: '#CCCCCC' };
  };

  // Count of active filters
  const activeFilterCount = (
    (selectedCategory ? 1 : 0) + 
    selectedSizes.length + 
    selectedColors.length + 
    ((priceRange[0] > 0 || priceRange[1] < 200) ? 1 : 0)
  );

  return (
    <Layout>
      <div className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Shop</h1>

            {/* Mobile filter button */}
            <button
              className="md:hidden flex items-center gap-2 text-gray-700 hover:text-gray-900"
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            >
              <Filter size={20} />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="rating">Best Rating</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters - Mobile */}
            <div 
              className={`fixed inset-0 bg-white z-50 md:hidden transition-transform duration-300 transform ${
                isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button 
                  className="text-gray-500 hover:text-gray-900"
                  onClick={() => setIsMobileFiltersOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-4 overflow-y-auto h-[calc(100vh-5rem)]">
                {/* Mobile filter content (duplicated from desktop) */}
                <div className="space-y-6">
                  {/* Categories */}
                  <div className="border-b pb-4">
                    <button 
                      className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
                      onClick={() => toggleSection('categories')}
                    >
                      <span>Categories</span>
                      {expandedSections.categories ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    
                    {expandedSections.categories && (
                      <div className="space-y-2 mt-3">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center">
                            <input
                              id={`mobile-category-${category.id}`}
                              name="category"
                              type="radio"
                              checked={selectedCategory === category.id}
                              onChange={() => handleCategoryChange(category.id)}
                              className="h-4 w-4 border-gray-300 text-gray-900 focus:ring-gray-500"
                            />
                            <label
                              htmlFor={`mobile-category-${category.id}`}
                              className="ml-3 text-sm text-gray-700 cursor-pointer"
                            >
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price Range */}
                  <div className="border-b pb-4">
                    <button 
                      className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
                      onClick={() => toggleSection('price')}
                    >
                      <span>Price Range</span>
                      {expandedSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    
                    {expandedSections.price && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-700">${priceRange[0]}</span>
                          <span className="text-sm text-gray-700">${priceRange[1]}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="200"
                          step="10"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    )}
                  </div>

                  {/* Size */}
                  <div className="border-b pb-4">
                    <button 
                      className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
                      onClick={() => toggleSection('size')}
                    >
                      <span>Size</span>
                      {expandedSections.size ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    
                    {expandedSections.size && (
                      <div className="grid grid-cols-4 gap-2 mt-3">
                        {allSizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => handleSizeToggle(size)}
                            className={`py-1 text-sm border rounded-md ${
                              selectedSizes.includes(size)
                                ? 'bg-gray-900 text-white border-gray-900'
                                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Color */}
                  <div className="border-b pb-4">
                    <button 
                      className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
                      onClick={() => toggleSection('color')}
                    >
                      <span>Color</span>
                      {expandedSections.color ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    
                    {expandedSections.color && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {allColors.map((color) => {
                          const colorObj = getColorByName(color);
                          return (
                            <button
                              key={color}
                              onClick={() => handleColorToggle(color)}
                              className={`w-8 h-8 rounded-full focus:outline-none ${
                                selectedColors.includes(color) ? 'ring-2 ring-offset-2 ring-gray-900' : ''
                              }`}
                              style={{ backgroundColor: colorObj.value }}
                              title={color}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={resetFilters}
                    variant="outline"
                    fullWidth
                    className="mt-4"
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>

              <div className="p-4 border-t">
                <Button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  variant="primary"
                  fullWidth
                >
                  Show {filteredProducts.length} Results
                </Button>
              </div>
            </div>

            {/* Filters - Desktop */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="font-semibold text-gray-900 mb-4">Filters</h2>
                
                <div className="space-y-6">
                  {/* Categories */}
                  <div className="border-b pb-4">
                    <button 
                      className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
                      onClick={() => toggleSection('categories')}
                    >
                      <span>Categories</span>
                      {expandedSections.categories ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    
                    {expandedSections.categories && (
                      <div className="space-y-2 mt-3">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center">
                            <input
                              id={`category-${category.id}`}
                              name="category"
                              type="radio"
                              checked={selectedCategory === category.id}
                              onChange={() => handleCategoryChange(category.id)}
                              className="h-4 w-4 border-gray-300 text-gray-900 focus:ring-gray-500"
                            />
                            <label
                              htmlFor={`category-${category.id}`}
                              className="ml-3 text-sm text-gray-700 cursor-pointer"
                            >
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price Range */}
                  <div className="border-b pb-4">
                    <button 
                      className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
                      onClick={() => toggleSection('price')}
                    >
                      <span>Price Range</span>
                      {expandedSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    
                    {expandedSections.price && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-700">${priceRange[0]}</span>
                          <span className="text-sm text-gray-700">${priceRange[1]}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="200"
                          step="10"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    )}
                  </div>

                  {/* Size */}
                  <div className="border-b pb-4">
                    <button 
                      className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
                      onClick={() => toggleSection('size')}
                    >
                      <span>Size</span>
                      {expandedSections.size ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    
                    {expandedSections.size && (
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        {allSizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => handleSizeToggle(size)}
                            className={`py-1 text-sm border rounded-md ${
                              selectedSizes.includes(size)
                                ? 'bg-gray-900 text-white border-gray-900'
                                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Color */}
                  <div className="border-b pb-4">
                    <button 
                      className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-2"
                      onClick={() => toggleSection('color')}
                    >
                      <span>Color</span>
                      {expandedSections.color ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    
                    {expandedSections.color && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {allColors.map((color) => {
                          const colorObj = getColorByName(color);
                          return (
                            <button
                              key={color}
                              onClick={() => handleColorToggle(color)}
                              className={`w-8 h-8 rounded-full focus:outline-none ${
                                selectedColors.includes(color) ? 'ring-2 ring-offset-2 ring-gray-900' : ''
                              }`}
                              style={{ backgroundColor: colorObj.value }}
                              title={color}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {activeFilterCount > 0 && (
                    <Button
                      onClick={resetFilters}
                      variant="outline"
                      fullWidth
                    >
                      Reset Filters
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {/* Active filters */}
                {activeFilterCount > 0 && (
                  <div className="mb-6 pb-4 border-b">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">Active Filters</h3>
                      <button 
                        className="text-sm text-gray-600 hover:text-gray-900"
                        onClick={resetFilters}
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory && (
                        <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs rounded-full px-3 py-1">
                          Category: {categories.find(c => c.id === selectedCategory)?.name}
                          <button 
                            className="ml-1 text-gray-500 hover:text-gray-900"
                            onClick={() => setSelectedCategory(null)}
                          >
                            <X size={14} />
                          </button>
                        </span>
                      )}
                      
                      {selectedSizes.map(size => (
                        <span key={size} className="inline-flex items-center bg-gray-100 text-gray-800 text-xs rounded-full px-3 py-1">
                          Size: {size}
                          <button 
                            className="ml-1 text-gray-500 hover:text-gray-900"
                            onClick={() => handleSizeToggle(size)}
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                      
                      {selectedColors.map(color => (
                        <span key={color} className="inline-flex items-center bg-gray-100 text-gray-800 text-xs rounded-full px-3 py-1">
                          Color: {color}
                          <button 
                            className="ml-1 text-gray-500 hover:text-gray-900"
                            onClick={() => handleColorToggle(color)}
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                      
                      {(priceRange[0] > 0 || priceRange[1] < 200) && (
                        <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs rounded-full px-3 py-1">
                          Price: ${priceRange[0]} - ${priceRange[1]}
                          <button 
                            className="ml-1 text-gray-500 hover:text-gray-900"
                            onClick={() => setPriceRange([0, 200])}
                          >
                            <X size={14} />
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Results count */}
                <div className="mb-6">
                  <p className="text-gray-600">{filteredProducts.length} products</p>
                </div>

                {/* Product grid */}
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
                    <Button 
                      onClick={resetFilters}
                      variant="outline"
                    >
                      Reset Filters
                    </Button>
                  </div>
                ) : (
                  <ProductGrid products={filteredProducts} columns={3} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShopPage;