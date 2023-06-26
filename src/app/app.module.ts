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
        StyledFeatureLayerComponent
    ],
    imports     : [
        BrowserModule,
        AppRoutingModule,
        RouterModule
    ],
    providers   : [],
    bootstrap   : [AppComponent]
})
export class AppModule {
}
