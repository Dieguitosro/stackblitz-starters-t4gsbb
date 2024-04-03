import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UsersService } from '../../core/services/users.service';
import { appConstants } from '../../core/utilities/app-constants';
import { Statement, UsersApi } from '../../domain/statement.api';
import { TableComponent } from './components/table/table.component';
import { tableOption } from '../../core/config/tableOptions';
import { Table } from '../../domain/question';

export interface StateGroup {
  type: string;
  names: string[];
}

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html',
  styleUrl: 'users.component.scss',

  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
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
    MatPaginatorModule],
  providers: [UsersService, UsersApi]

})
export class UsersComponent {
  statements: Statement[] = [];
  questions: Table[]= tableOption;
   
  constructor(
    private route: ActivatedRoute) {
    this.getStatements()
  }


  async getStatements() {
    this.statements = this.route.snapshot.data[appConstants.resolver.statements]
  }

  
}

