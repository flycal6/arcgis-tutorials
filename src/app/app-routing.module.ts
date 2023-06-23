import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BasicMapComponent } from './basic-map/basic-map.component';
import { WebMapComponent } from './web-map/web-map.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SceneViewComponent } from './scene-view/scene-view.component';
import { ToggleBasemapLayerComponent } from './toggle-basemap-layer/toggle-basemap-layer.component';
import { BASIC_MAP_TITLE, TOGGLE_BASEMAP_LAYER_TITLE, SCENE_VIEW_TITLE, WEB_MAP_TITLE, SELECT_BASEMAP_LAYER_TITLE, CUSTOM_BASEMAP_STYLE_TITLE, POINTS_LINES_TITLE } from '../constants';
import { BasemapGalleryComponent } from './basemap-gallery/basemap-gallery.component';
import { CustomBasemapStylesComponent } from './custom-basemap-styles/custom-basemap-styles.component';
import { PointsLinesPolysComponent } from './points-lines-polys/points-lines-polys.component';

const routes: Routes = [
    {path: 'basic-map', title: BASIC_MAP_TITLE, component: BasicMapComponent},
    {path: 'web-map', title: WEB_MAP_TITLE, component: WebMapComponent},
    {path: 'scene-view', title: SCENE_VIEW_TITLE, component: SceneViewComponent},
    {path: 'toggle-basemap-layer', title: TOGGLE_BASEMAP_LAYER_TITLE, component: ToggleBasemapLayerComponent},
    {path: 'basemap-gallery', title: SELECT_BASEMAP_LAYER_TITLE, component: BasemapGalleryComponent},
    {path: 'custom-style', title: CUSTOM_BASEMAP_STYLE_TITLE, component: CustomBasemapStylesComponent},
    {path: 'points-lines', title: POINTS_LINES_TITLE, component: PointsLinesPolysComponent},
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
