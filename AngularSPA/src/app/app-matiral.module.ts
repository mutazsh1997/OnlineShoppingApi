import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatInputModule, MatOptionModule, MatPaginatorModule, MatSelectModule, MatSidenavModule, MatSortModule, MatStepperModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule, } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';

const mat = [
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatStepperModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTabsModule
]

@NgModule({
    imports: [mat],
    exports: [mat]
})
export class AppMatiralModule { }
