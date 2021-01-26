import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../models/order';
 
@Pipe({
  name: 'orderStateFilter'
})
export class FiltersPipe implements PipeTransform {

  transform(orders: Order[], orderStates: string) {
    
    if (orderStates == 'OnWay') {
      return orders.filter(order => order.hasBeenShipped == false);
    } else if (orderStates == 'delivered') {
      return orders.filter(order => order.hasBeenShipped == true);
    }
  }
}
