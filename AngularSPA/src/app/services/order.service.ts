import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Order } from '../models/order';

@Injectable({
    providedIn: 'root'
})

export class OrderService {

    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    CreateOrder(cartId: string, orderDetial: any) {
        return this.http.post(`${this.baseUrl}order/${cartId}`, orderDetial)

    }

    getOrder() {
        return this.http.get(`${this.baseUrl}order/${+localStorage.getItem("OrderId")}`);
    }
    getOrdersForUser(userId: number) {
        return this.http.get<Order[]>(`${this.baseUrl}order/user/${userId}`);
    }
    getOrders() {
        return this.http.get(`${this.baseUrl}order`).pipe(map(
            (item: any) => {

                return item.orders;
            }
        ));
    }
    changeOrderStates(orderId) {
        return this.http.patch(`${this.baseUrl}order/deliveringOrder`, parseInt(orderId))
    }
}