import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Search from '@arcgis/core/widgets/Search';
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';

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
               //  id: 'e691172598f04ea8881cd2a4adaa45ba' // US accidental deaths
                id: '8dc5754f24094088b6b6d4d7795d955c' // havasupai
            }
        });

        const view = new MapView({
            // container: "viewDiv",
            container,
            map: map,
            zoom: 14,
            center: [-112.7007, 36.2333] // longitude, latitude of havasupai res
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
