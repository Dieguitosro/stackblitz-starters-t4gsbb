import { CurrencyPipe, DatePipe } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { Statement } from '../../../../domain/statement.api';
import { Table } from '../../../../domain/question';
import { appConstants } from '../../../../core/utilities/app-constants';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSortModule,
    CurrencyPipe,
    DatePipe,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements AfterViewInit {


  @Input()
  data!: any[];

  @Input()
  questions!: Table[];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<Statement>;

  ngAfterViewInit(): void {
    this.questions.map(question => {
      this.displayedColumns.push(question.def)
    })
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getData(item: Table, element: any){
    // Acceder al nombre de la propiedad deseada desde item.def
    const propertyName = item.data;
    if(item.def === appConstants.columns.period){
      return this.formatDate(element.period.from) + ' - ' + this.formatDate(element.period.to)
    }else if (element.hasOwnProperty(propertyName)) {
        return element[propertyName];
    } else {
        return '';
    }
  }

  formatDate(date: string) {
    // Crear una instancia de Date
    const d = new Date(date);
    
    // Obtener el día, mes y año
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Los meses son indexados desde 0
    const year = d.getFullYear();

    // Retornar la fecha formateada
    return `${day}/${month}/${year}`;
}
}
