import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BasicMapComponent } from './basic-map/basic-map.component';
import { WebMapComponent } from './web-map/web-map.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SceneViewComponent } from './scene-view/scene-view.component';
import { ToggleBasemapLayerComponent } from './toggle-basemap-layer/toggle-basemap-layer.component';
import {
    BASIC_MAP_TITLE,
    CUSTOM_BASEMAP_STYLE_TITLE,
    DISPLAY_POPUP_TITLE, EDITABLE_LAYER_TITLE, FILTER_QUERY_TITLE,
    HOSTED_FEAT_LAYER_TITLE,
    POINTS_LINES_TITLE,
    SCENE_VIEW_TITLE,
    SELECT_BASEMAP_LAYER_TITLE, SPATIAL_QUERY_TITLE, SQL_SELECTOR_TITLE,
    STYLED_FEAT_LAYER_TITLE,
    TOGGLE_BASEMAP_LAYER_TITLE,
    VECTOR_TILE_TITLE,
    WEB_MAP_TITLE, WEB_SCENE_TITLE
} from './constants';
import { BasemapGalleryComponent } from './basemap-gallery/basemap-gallery.component';
import { CustomBasemapStylesComponent } from './custom-basemap-styles/custom-basemap-styles.component';
import { PointsLinesPolysComponent } from './points-lines-polys/points-lines-polys.component';
import { HostedFeatureLayerComponent } from './hosted-feature-layer/hosted-feature-layer.component';
import { StyledFeatureLayerComponent } from './styled-feature-layer/styled-feature-layer.component';
import { DisplayPopupComponent } from '@app/display-popup/display-popup.component';
import { VectorTileLayerComponent } from '@app/vector-tile-layer/vector-tile-layer.component';
import { WebSceneComponent } from '@app/web-scene/web-scene.component';
import { SqlFeatureQueryComponent } from '@app/sql-feature-query/sql-feature-query.component';
import { SpatialFeatureQueryComponent } from '@app/spatial-feature-query/spatial-feature-query.component';
import { FilterWithSqlComponent } from '@app/filter-with-sql/filter-with-sql.component';
import { EditableLayerComponent } from '@app/editable-layer/editable-layer.component';

const routes: Routes = [
    {path: 'basic-map', title: BASIC_MAP_TITLE, component: BasicMapComponent},
    {path: 'web-map', title: WEB_MAP_TITLE, component: WebMapComponent},
    {path: 'scene-view', title: SCENE_VIEW_TITLE, component: SceneViewComponent},
    {path: 'toggle-basemap-layer', title: TOGGLE_BASEMAP_LAYER_TITLE, component: ToggleBasemapLayerComponent},
    {path: 'basemap-gallery', title: SELECT_BASEMAP_LAYER_TITLE, component: BasemapGalleryComponent},
    {path: 'custom-style', title: CUSTOM_BASEMAP_STYLE_TITLE, component: CustomBasemapStylesComponent},
    {path: 'points-lines', title: POINTS_LINES_TITLE, component: PointsLinesPolysComponent},
    {path: 'hosted-feature', title: HOSTED_FEAT_LAYER_TITLE, component: HostedFeatureLayerComponent},
    {path: 'styled-feature', title: STYLED_FEAT_LAYER_TITLE, component: StyledFeatureLayerComponent},
    {path: 'display-popup', title: DISPLAY_POPUP_TITLE, component: DisplayPopupComponent},
    {path: 'vector-tile', title: VECTOR_TILE_TITLE, component: VectorTileLayerComponent},
    {path: 'web-scene', title: WEB_SCENE_TITLE, component: WebSceneComponent},
    {path: 'sql-selector', title: SQL_SELECTOR_TITLE, component: SqlFeatureQueryComponent},
    {path: 'spatial-query', title: SPATIAL_QUERY_TITLE, component: SpatialFeatureQueryComponent},
    {path: 'filter-query', title: FILTER_QUERY_TITLE, component: FilterWithSqlComponent},
    {path: 'editable-layer', title: EDITABLE_LAYER_TITLE, component: EditableLayerComponent},
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
