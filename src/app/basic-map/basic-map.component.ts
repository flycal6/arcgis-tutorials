import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import MapView from '@arcgis/core/views/MapView';
import Search from '@arcgis/core/widgets/Search';
import Map from '@arcgis/core/Map';

@Component({
    selector   : 'app-basic-map',
    templateUrl: './basic-map.component.html',
    styleUrls  : ['./basic-map.component.scss']
})
export class BasicMapComponent implements OnInit, OnDestroy {

    @ViewChild('mapViewNode', {static: true}) viewDiv!: ElementRef;
    public view: any = null;

    constructor() {
    }

    ngOnInit(): void {
        this.initMap().then(() => {
            console.log('the map is ready');
        });
    }

    initMap(): Promise<any> {
        const container = this.viewDiv.nativeElement;

        const map = new Map({
            basemap: 'arcgis-topographic',
            // ground: 'world-elevation'
        });

        /*const map = new WebMap({
            portalItem: {
                // apiKey: this.api_key,
                id: 'd582a9e953c44c09bb998c7d9b66f8d4',
               // id: 'aa1d3f80270146208328cf66d022e09c',
                // id: 'e691172598f04ea8881cd2a4adaa45ba'
            }
        });*/

        /*const view = new SceneView({
            container,
            map,
            camera: {
                position: {
                    x: -118.808, // longitude
                    y: 33.961, // latitude
                    z: 2000 // meters
                },
                tilt: 75
            }
        })*/

        const view = new MapView({
            // container: "viewDiv",
            container,
            map   : map,
            zoom  : 4,
            center: [15, 65] // longitude, latitude
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
