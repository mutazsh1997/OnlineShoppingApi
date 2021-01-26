import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTabChangeEvent, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: [
    './orders.component.scss'
  ]
})
export class OrdersComponent implements OnInit {

  listOrders: MatTableDataSource<any>;
  orderColumns: string[] = ['orderId', 'username', 'email',
    'phone', 'address', 'orderDate', 'total', 'actions']

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  states: string = 'OnWay';
  sliceNum = 10;

  constructor(private orderServise: OrderService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getDataSource();

    if (window.innerWidth < 750) {
      this.sliceNum = 4
    }
  }
  getDataSource() {
    this.orderServise.getOrders().subscribe((res: Order[]) => {

      this.listOrders = new MatTableDataSource(res);
      this.listOrders.sort = this.sort;
      this.listOrders.paginator = this.paginator;
      this.listOrders.filter = 'false'
    });
  }
  filterOrders(tab: MatTabChangeEvent) {

    if (tab.tab.textLabel == 'On way') {
      this.listOrders.filter = 'false'
    }
    else if (tab.tab.textLabel == 'delivering') {
      this.listOrders.filter = 'true'
    }
  }

  openDialog(orderDetails) {
    this.dialog.open(OrderDetailsComponent, {
      data: {
        orderDetails
      },
      autoFocus: false,
      height: '80vh',
      maxWidth: window.innerWidth < 750 ? '100%' : 'auto'
    });
  }
  delivering(orderId) {
    this.orderServise.changeOrderStates(orderId).subscribe({ complete: () => this.getDataSource() });
  }
  showFullInfo(info, info2?) {
    this.dialog.open(showInfoComponent, {
      data: {
        info,
        info2
      },
      autoFocus: true,
      height: 'auto',
      maxWidth: window.innerWidth < 750 ? '100%' : 'auto'
    })
  }
}

@Component({
  selector: 'orderDetails',
  templateUrl: 'orderDetails.component.html',
  styleUrls: [
    './orders.component.scss'
  ]
})
export class OrderDetailsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public orderDetails) { }

}
@Component({
  selector: 'orderInfo',
  templateUrl: 'orderInfo.component.html',
  styleUrls: [
    './orders.component.scss'
  ]
})
export class showInfoComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public orderInfo) { }
}