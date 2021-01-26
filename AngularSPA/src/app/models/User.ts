
export interface User {
    id?: number;
    userName: string;
    Email: string;
    Password: string;
    confirmPassword?: string;
    PhoneNumber?: string;
    Address?: string;
    city?: string;
    cartId: string;
    OrderId?: number;
}