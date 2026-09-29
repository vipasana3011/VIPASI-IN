export interface Product {
  id: string;
  name: string;
  subtitle: string;
  slug: string;
  price: number;
  originalPrice: number;
  category: 'suit-sets' | 'sarees' | 'lehengas' | 'co-ords' | 'anarkalis' | 'shararas';
  collection: string;
  craftTechnique: string;
  fabric: string;
  colorName: string;
  setContents?: string;
  badge?: 'New Drop' | 'Bestseller' | 'Handcrafted' | 'Limited Edition';
  rating: number;
  reviewsCount: number;
  images: string[];
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL')[];
  description: string;
  craftStory: string;
  details: string[];
  careInstructions: string[];
  shippingEstimateDays: string;
  inStock: boolean;
  occasions?: ('haldi' | 'mehendi' | 'wedding' | 'festive' | 'reception')[];
  weightLevel?: 'light' | 'medium' | 'heavy';
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}
