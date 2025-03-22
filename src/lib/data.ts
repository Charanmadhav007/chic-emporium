
import { Product } from "@/types";

export const products: Product[] = [
  {
    id: 1,
    name: "Classic Oxford Shirt",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "shirts",
    description: "A timeless Oxford shirt crafted from premium cotton with a comfortable regular fit. Versatile for both casual and semi-formal occasions.",
    featured: true,
    inventory: 50
  },
  {
    id: 2,
    name: "Slim Fit Chinos",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "pants",
    description: "Modern slim-fit chinos made from stretch cotton twill, offering both style and comfort for everyday wear.",
    featured: true,
    inventory: 35
  },
  {
    id: 3,
    name: "Wool Blend Blazer",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "outerwear",
    description: "Sophisticated wool-blend blazer with a tailored fit, perfect for elevating your smart-casual or formal look.",
    featured: true,
    inventory: 20
  },
  {
    id: 4,
    name: "Premium Leather Belt",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1625891825664-911d775fbb6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "accessories",
    description: "Hand-crafted belt made from full-grain leather with a classic buckle, designed to last for years.",
    featured: false,
    inventory: 45
  },
  {
    id: 5,
    name: "Merino Wool Sweater",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "knitwear",
    description: "Luxuriously soft Merino wool sweater with a comfortable fit, perfect for staying stylish in cooler weather.",
    featured: true,
    inventory: 30
  },
  {
    id: 6,
    name: "Chelsea Boots",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "footwear",
    description: "Classic Chelsea boots with elastic side panels, crafted from polished leather with a comfortable rubber sole.",
    featured: true,
    inventory: 25
  },
  {
    id: 7,
    name: "Silk Tie",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1589756823695-278bc923f962?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "accessories",
    description: "Elegant silk tie with a subtle pattern, adding a touch of sophistication to any formal outfit.",
    featured: false,
    inventory: 40
  },
  {
    id: 8,
    name: "Selvedge Denim Jeans",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "pants",
    description: "Premium selvedge denim jeans with a contemporary slim fit, featuring authentic details and superior craftsmanship.",
    featured: true,
    inventory: 30
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};
