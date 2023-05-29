import { Routes } from "@angular/router";
import { LandingHomeComponent } from "./landing.component";
import { HomeComponent } from "./home/home.component";
import { DetailsLojaComponent } from "./details/details.component";
import { LojaDetailGuard } from "./landing.guards";

export const landingRoutes: Routes = [
    {
        path: '',
        component: LandingHomeComponent,
        children: [
            {
                path: 'produtos',
                component: HomeComponent,
              
               
            },
            {
                path: 'produtos/:id',
                component: DetailsLojaComponent,
                canActivate: [LojaDetailGuard]

            },            
            {
                path: 'cart', loadChildren: () => import('app/pages/cart/cart.module').then(cart => cart.CartModule)
            },
            
        ]
    }
];



