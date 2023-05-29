import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { LandingHomeComponent } from './landing.component';
import { landingRoutes } from './landing.routing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { MaterialAppModule } from 'material-app.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DetailsLojaComponent } from './details/details.component';
import { LandingResolver } from './landing.resolve';
import { HomeComponent } from './home/home.component';
import { ProductsService } from '../admin/products/products.service';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [
        LandingHomeComponent,
        DetailsLojaComponent,
        HomeComponent
    ],
    imports     : [
        RouterModule.forChild(landingRoutes),
        MatButtonModule,
        MatIconModule,
        ClipboardModule,
        SharedModule,
        MaterialAppModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MaterialAppModule,
        MatInputModule,
        MatProgressSpinnerModule,
        FuseCardModule,
        FuseAlertModule,
    ],
    exports:[
        DetailsLojaComponent
    ],
    providers:[ LandingResolver, ProductsService]
})
export class LandingHomeModule{}
