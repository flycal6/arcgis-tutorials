import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { MAHOU_RIVERIA, PARKS_OPEN_SPACES_FEATURE_LAYER, ARCGIS_TOPOGRAPHIC, TRAILHEADS_FEATURE_LAYER, TRAILS_FEATURE_LAYER } from '@app/constants';

@Component({
    selector   : 'app-hosted-feature-layer',
    templateUrl: './hosted-feature-layer.component.html',
    styleUrls  : ['./hosted-feature-layer.component.scss']
})
export class HostedFeatureLayerComponent implements OnInit, OnDestroy {
    @ViewChild('mapViewNode', {static: true}) viewDiv!: ElementRef;
    public view: any = null;

    initMap(): Promise<any> {
        const container = this.viewDiv.nativeElement;

        const map = new Map({
            basemap: ARCGIS_TOPOGRAPHIC
        });

        const view = new MapView({
            container,
            map,
            center: MAHOU_RIVERIA,
            zoom  : 13
        });

        // Trailheads feature layer (points)
        const trailheadsLayer = new FeatureLayer({
            url: TRAILHEADS_FEATURE_LAYER
        });
        map.add(trailheadsLayer);

        // Trails feature layer (lines)
        const trailsLayer = new FeatureLayer({
            url: TRAILS_FEATURE_LAYER
        });
        map.add(trailsLayer, 0); // index 0 so lines are drawn before trailheadsLayer

        // Parks and open spaces (polygons)
        const parksLayer = new FeatureLayer({
            url: PARKS_OPEN_SPACES_FEATURE_LAYER
        });
        map.add(parksLayer, 0); // index 0 so polys are drawn before trailsLayer

        this.view = view;
        return this.view.when();
    }

    ngOnInit(): void {
        this.initMap().then(() => {
            console.log('the map is ready');
        });
    }

    ngOnDestroy(): void {
        if (this.view) {
            this.view.destroy();
        }
    }
}
