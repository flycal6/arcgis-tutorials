import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import esriConfig from '@arcgis/core/config';
import { ARCGIS_API_KEY } from '../../environments/environment';
import MapView from '@arcgis/core/views/MapView';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import Search from '@arcgis/core/widgets/Search';
import Map from '@arcgis/core/Map';
import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';
import TileLayer from '@arcgis/core/layers/TileLayer';
import Basemap from '@arcgis/core/Basemap';

@Component({
  selector: 'app-custom-basemap-styles',
  templateUrl: './custom-basemap-styles.component.html',
  styleUrls: ['./custom-basemap-styles.component.scss']
})
export class CustomBasemapStylesComponent implements OnInit, OnDestroy {

    @ViewChild('mapViewNode', {static: true}) viewDiv!: ElementRef;
    public view: any = null;

    constructor() {
    }

    ngOnInit(): void {
        esriConfig.apiKey = ARCGIS_API_KEY;
        this.initMap().then(() => {
            console.log('the map is ready');
        });
    }

    initMap(): Promise<any> {
        const container = this.viewDiv.nativeElement;

        const vectorTileLayer = new VectorTileLayer({
            portalItem: {
                id: "6976148c11bd497d8624206f9ee03e30" // Forest and Parks Canvas
            },
            opacity: 0.75
        });

        const imageTileLayer = new TileLayer({
            portalItem: {
                id: "1b243539f4514b6ba35e7d995890db1d" // World Hillshade,
            }
        });

        const basemap = new Basemap({
            baseLayers: [
                imageTileLayer,
                vectorTileLayer
            ]
        });

        const map = new Map({
            // basemap: 'arcgis-topographic', // basemap layer service
            basemap
        });

        const view = new MapView({
            container,
            map,
            center: [-100,40], // longitude, latitude
            zoom: 3
        });

        const search = new Search({view});
        view.ui.add(search, 'bottom-left');

        this.view = view;

        return this.view.when();
    }

    ngOnDestroy() {
        if (this.view) {
            this.view.destroy();
        }
    }
}
