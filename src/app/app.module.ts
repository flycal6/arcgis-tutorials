import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BasicMapComponent } from './basic-map/basic-map.component';
import { WebMapComponent } from './web-map/web-map.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { SceneViewComponent } from './scene-view/scene-view.component';
import { ToggleBasemapLayerComponent } from './toggle-basemap-layer/toggle-basemap-layer.component';
import { BasemapGalleryComponent } from './basemap-gallery/basemap-gallery.component';
import { CustomBasemapStylesComponent } from './custom-basemap-styles/custom-basemap-styles.component';
import { PointsLinesPolysComponent } from './points-lines-polys/points-lines-polys.component';
import { HostedFeatureLayerComponent } from './hosted-feature-layer/hosted-feature-layer.component';
import { StyledFeatureLayerComponent } from './styled-feature-layer/styled-feature-layer.component';
import { DisplayPopupComponent } from './display-popup/display-popup.component';
import { VectorTileLayerComponent } from './vector-tile-layer/vector-tile-layer.component';
import { WebSceneComponent } from './web-scene/web-scene.component';
import { SqlFeatureQueryComponent } from './sql-feature-query/sql-feature-query.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SpatialFeatureQueryComponent } from './spatial-feature-query/spatial-feature-query.component';
import { FilterWithSqlComponent } from './filter-with-sql/filter-with-sql.component';
import { EditableLayerComponent } from './editable-layer/editable-layer.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DisplayLocationComponent } from './display-location/display-location.component';
import { TrackLocationComponent } from './track-location/track-location.component';

@NgModule({
    declarations: [
        AppComponent,
        BasicMapComponent,
        WebMapComponent,
        PageNotFoundComponent,
        SceneViewComponent,
        ToggleBasemapLayerComponent,
        BasemapGalleryComponent,
        CustomBasemapStylesComponent,
        PointsLinesPolysComponent,
        HostedFeatureLayerComponent,
        StyledFeatureLayerComponent,
        DisplayPopupComponent,
        VectorTileLayerComponent,
        WebSceneComponent,
        SqlFeatureQueryComponent,
        SpatialFeatureQueryComponent,
        FilterWithSqlComponent,
        EditableLayerComponent,
        DisplayLocationComponent,
        TrackLocationComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        RouterModule,
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatTooltipModule
    ],
    providers   : [],
    bootstrap   : [AppComponent]
})
export class AppModule {
}
