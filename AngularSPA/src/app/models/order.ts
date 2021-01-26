import { OrderDetails } from "./OrderDetails";

export interface Order {
    orderId: number,
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    city: string,
    hasBeenShipped: boolean,
    orderDate: Date,
    orderDetails: OrderDetails[],
    phone: string,
    total: number
}