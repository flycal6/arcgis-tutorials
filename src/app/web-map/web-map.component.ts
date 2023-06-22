import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import esriConfig from '@arcgis/core/config';
import Map from '@arcgis/core/Map';
import SceneView from '@arcgis/core/views/SceneView';
import Search from '@arcgis/core/widgets/Search';
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import { ARCGIS_API_KEY } from '../../environments/environment';

@Component({
  selector: 'app-web-map',
  templateUrl: './web-map.component.html',
  styleUrls: ['./web-map.component.scss']
})
export class WebMapComponent implements OnInit, OnDestroy {

    @ViewChild('mapViewNode', {static: true}) mapViewDiv!: ElementRef;
    public view: any = null;

    constructor() {
    }

    ngOnInit(): void {
        esriConfig.apiKey = ARCGIS_API_KEY;
        this.initMap().then(() => {
            console.log('the map is ready');
        }).catch(err => {
            console.error(err);
        });
    }

    initMap(): Promise<any> {
        const container = this.mapViewDiv.nativeElement;

        const map = new WebMap({
            portalItem: {
                // apiKey: this.api_key,
                // id: 'd582a9e953c44c09bb998c7d9b66f8d4', // colored countries
               // id: 'aa1d3f80270146208328cf66d022e09c', // topographic
                id: 'e691172598f04ea8881cd2a4adaa45ba' // US accidental deaths
            }
        });

        const view = new MapView({
            // container: "viewDiv",
            container,
            map: map,
            zoom: 4,
            center: [-95, 35] // longitude, latitude
        });

        const search = new Search({view});

        view.ui.add(search, 'top-right');
        this.view = view;

        return this.view.when();
    }

    ngOnDestroy() {
        if (this.view) {
            this.view.destroy();
        }
    }
}
