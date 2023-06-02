import { Route } from '@angular/router';
import { PageComponent } from './page.component';
import { LayoutComponent } from 'app/layout/layout.component';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { Error401Component } from 'app/shared/error/error-401/error-401.component';
import { Error500Component } from 'app/shared/error/error-500/error-500.component';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';


export const pagesRoutes: Route[] = [
    {
        path: '',
        component: PageComponent,
        children: [
                {
                path: '',
                component: LayoutComponent,
                data: {
                    layout: 'empty'
                },
                children: [                   
                    { path: 'sign-in', loadChildren: () => import('app/pages/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
                    { path: 'sign-out', loadChildren: () => import('app/pages/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule) },
                    { path: 'sign-up', loadChildren: () => import('app/pages/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule) }
                ]
            },
            // Admin routes
            {
                path: '',
                component: LayoutComponent,
                canActivate:[AuthGuard],
                canActivateChild: [AuthGuard],
                children: [
                    {
                        path: 'inicio', loadChildren: () => import('app/pages/admin/admin.module').then(admin => admin.AdminModule),
                    },
                    { 
                        path: 'loja', loadChildren: () => import('app/pages/landing/landing.module').then(m => m.LandingHomeModule) 
                    },    
                    // 404 & Catch all
                    { path: '401-unauthorized', component: Error401Component },
                    { path: 'error-500', component: Error500Component },
                    { path: '**', redirectTo: '404-not-found', pathMatch: 'full' },
                ]
            }
        ]
    },

];
