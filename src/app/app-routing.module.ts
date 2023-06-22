import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BasicMapComponent } from './basic-map/basic-map.component';
import { WebMapComponent } from './web-map/web-map.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SceneViewComponent } from './scene-view/scene-view.component';
import { ChangeBasemapLayerComponent } from './change-basemap-layer/change-basemap-layer.component';
import { BASIC_MAP_TITLE } from '../constants';

const routes: Routes = [
    {path: 'basic-map', component: BasicMapComponent},
    {path: 'web-map', component: WebMapComponent},
    {path: 'scene-view', component: SceneViewComponent},
    {path: 'change-basemap-layer', component: ChangeBasemapLayerComponent},
    {path: '', redirectTo: '/basic-map', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    declarations: [],
    imports     : [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports     : [RouterModule]
})
export class AppRoutingModule {
}
