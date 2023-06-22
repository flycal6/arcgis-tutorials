import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BasicMapComponent } from './basic-map/basic-map.component';
import { WebMapComponent } from './web-map/web-map.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { SceneViewComponent } from './scene-view/scene-view.component';
import { ChangeBasemapLayerComponent } from './change-basemap-layer/change-basemap-layer.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicMapComponent,
    WebMapComponent,
    PageNotFoundComponent,
    SceneViewComponent,
    ChangeBasemapLayerComponent
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
