interface CartItem {
  name: string;
  price: number;
  quantity: number;
  description?: string;
  _id: string;
  _v: number
}

export type Cart = CartItem[];