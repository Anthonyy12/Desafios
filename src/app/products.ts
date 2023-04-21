export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
}

export const products = [
  {
    id: 1,
    name: "Xbox Controller",
    price: 799,
    description: "Control inalámbrico de Microsoft Xbox One",
    images: ["xboxcontroller.jpg"],
  },
  {
    id: 2,
    name: "DualShock 4",
    price: 699,
    description: "Control inalámbrico de PS4",
    images: ["dualshock4.jpg"],
  },
  {
    id: 3,
    name: "Phone Standard",
    price: 299,
    description: "A normal phone with normal specs",
    images: ["PhoneStandar.jpg"],
  }
];
