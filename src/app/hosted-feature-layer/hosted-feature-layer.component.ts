import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import esriConfig from '@arcgis/core/config';
import { ARCGIS_API_KEY } from '../../environments/environment';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

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
            basemap: 'arcgis-topographic'
        });

        const view = new MapView({
            container,
            map,
            center: [-118.80543, 34.02700],
            zoom  : 13
        });

        // Trailheads feature layer (points)
        const trailheadsLayer = new FeatureLayer({
            url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
        });
        map.add(trailheadsLayer);

        // Trails feature layer (lines)
        const trailsLayer = new FeatureLayer({
            url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0'
        });
        map.add(trailsLayer, 0); // index 0 so lines are drawn before trailheadsLayer

        // Parks and open spaces (polygons)
        const parksLayer = new FeatureLayer({
            url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0'
        });
        map.add(parksLayer, 0); // index 0 so polys are drawn before trailsLayer

        this.view = view;
        return this.view.when();
    }

    ngOnInit(): void {
        esriConfig.apiKey = ARCGIS_API_KEY;
        this.initMap().then(() => {
            console.log('the map is ready');
        });
    }

    ngOnDestroy(): void {
    }
}
