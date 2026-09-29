'use client';

import React, { useMemo } from 'react';
import { Product } from '@/types/product';
import { FEATURED_PRODUCTS } from '@/data/products';
import ProductCard from './ProductCard';
import { Sparkles } from 'lucide-react';

interface RelatedProductsProps {
  currentProduct: Product;
}

export default function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const relatedList = useMemo(() => {
    // Exclude the current product
    const pool = FEATURED_PRODUCTS.filter((p) => p.id !== currentProduct.id);

    // Score products based on matching criteria
    const scored = pool.map((item) => {
      let score = 0;
      // 1. Same category
      if (item.category === currentProduct.category) score += 50;
      // 2. Same collection
      if (item.collection === currentProduct.collection) score += 30;
      // 3. Same craft technique
      const currentCrafts = currentProduct.craftTechnique.toLowerCase().split(/[•;,]/).map(s => s.trim());
      const itemCrafts = item.craftTechnique.toLowerCase();
      if (currentCrafts.some(c => c && itemCrafts.includes(c))) score += 25;
      // 4. Same fabric
      if (item.fabric.toLowerCase() === currentProduct.fabric.toLowerCase()) score += 20;
      // 5. Same occasion
      if (currentProduct.occasions && item.occasions) {
        const sharedOccasions = currentProduct.occasions.filter(o => item.occasions?.includes(o));
        score += sharedOccasions.length * 15;
      }
      // 6. Same weight / style level (e.g. heavy bridal with heavy bridal)
      if (currentProduct.weightLevel && item.weightLevel === currentProduct.weightLevel) score += 10;
      // 7. Similar price range (within 25%)
      const priceDiff = Math.abs(item.price - currentProduct.price) / currentProduct.price;
      if (priceDiff <= 0.25) score += 10;

      return { product: item, score };
    });

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);

    // Pick top 4
    let chosen = scored.slice(0, 4).map(s => s.product);

    // If fewer than 4, fill with bestsellers / high-rated items
    if (chosen.length < 4) {
      const remaining = pool.filter(p => !chosen.some(c => c.id === p.id));
      remaining.sort((a, b) => b.rating - a.rating);
      chosen = [...chosen, ...remaining.slice(0, 4 - chosen.length)];
    }

    return chosen;
  }, [currentProduct]);

  if (relatedList.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 border-t border-vipasi-border/80 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-vipasi-wine text-xs uppercase tracking-[0.25em] font-sans font-semibold mb-1">
              <Sparkles size={13} className="text-vipasi-champagne" />
              <span>Coordinated Silhouettes</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-vipasi-charcoal">
              You May Also <span className="italic font-normal text-vipasi-wine">Adore</span>
            </h2>
            <p className="text-xs sm:text-sm text-vipasi-muted font-sans mt-1">
              Hand-picked ensembles echoing the artisanal needlework and fabrics of this creation.
            </p>
          </div>
        </div>

        {/* 4-column Related Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {relatedList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
