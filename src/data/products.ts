export type Product = {
  id: string;
  name: string;
  price: number;
  images: string[]; // URLs or require()
  tags?: string[];
  description?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Wireless Headphones",
    price: 2499,
    images: [
      "https://images.pexels.com/photos/374777/pexels-photo-374777.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/339465/pexels-photo-339465.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["Free delivery", "Selling fast"],
    description:
      "High-quality wireless headphones with noise cancellation and deep bass.",
  },

  {
    id: "p2",
    name: "Running Shoes",
    price: 3999,
    images: [
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1024831/pexels-photo-1024831.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["Free delivery"],
    description:
      "Lightweight running shoes designed for comfort and long-distance performance.",
  },

  {
    id: "p3",
    name: "Smart Watch",
    price: 9999,
    images: [
      "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["Selling fast"],
    description:
      "A feature-rich smart watch to track your fitness, heart rate, and notifications.",
  },
];

