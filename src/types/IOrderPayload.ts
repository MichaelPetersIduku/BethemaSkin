export interface IOrderPayload {
  customerName: string;
  customerEmail: string;
  customerPhoneNumber: string;
  shippingAddress: {
    address: string;
    city: string;
    state: string;
  };
  orderItems: Array<{
    itemName: string;
    quantity: number;
    price: number;
  }>;
  shippingMethod: {
    name: string;
    cost: number;
    description: string;
  };
  totalAmount: number;
}
