import { Route } from "@angular/router"
import { UsersComponent } from "../../pages/users/users.component"
import { StatementResolver } from "../resolvers/statement.resolver"

export const appConfig = {
    context: '',
    users: {
        users: '/users',
        user: 'user{id}'
    }
}

export const routes: Route[] = [
    {
        path: '',
        component: UsersComponent,
        resolve: {
            statements: StatementResolver
        }
    },
    { path: '**', redirectTo: '' },
]