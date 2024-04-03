import { Injectable } from '@angular/core';
import { appConfig } from '../config/app-config';
import { ApiHttpService } from './api-http.service';
import { Observable } from 'rxjs';
import { Statement } from '../../domain/statement.api';

@Injectable()
export class UsersService {

    constructor(private apiHttp: ApiHttpService) { }

    getAll(): Observable<Statement[]> {
        return this.apiHttp.get<Statement[]>(appConfig.users.users);
    }

}
