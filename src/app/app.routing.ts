import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const appRoutes: Route[] = [

    {path: '', pathMatch : 'full', redirectTo: 'loja/produtos'},
    {path: 'loja', pathMatch : 'full', redirectTo: 'loja/produtos'},
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'inicio'},

    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '', loadChildren: () => import('app/pages/pages.module').then(page => page.PagesModule),
            },
        ]
    }

];
