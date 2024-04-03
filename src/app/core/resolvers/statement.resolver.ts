import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Statement } from '../../domain/statement.api';
import { UsersService } from '../services/users.service';

export const StatementResolver: ResolveFn<Statement[]> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Statement[]> => {
    return inject(UsersService).getAll();
  };

