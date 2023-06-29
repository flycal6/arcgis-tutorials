import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import MapView from '@arcgis/core/views/MapView';
import Search from '@arcgis/core/widgets/Search';
import Map from '@arcgis/core/Map';
import { ARCGIS_TOPOGRAPHIC } from '@app/constants';

@Component({
    selector   : 'app-basic-map',
    templateUrl: './basic-map.component.html',
    styleUrls  : ['./basic-map.component.scss']
})
export class BasicMapComponent implements OnInit, OnDestroy {

    @ViewChild('mapViewNode', {static: true}) viewDiv!: ElementRef;
    public view: MapView | null = null;

    initMap(): Promise<any> {
        const container = this.viewDiv.nativeElement;

        const map = new Map({
            basemap: ARCGIS_TOPOGRAPHIC,
            // ground: 'world-elevation'
        });

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

    ngOnInit(): void {
        this.initMap().then(() => {
            console.log('the map is ready');
        });
    }

    ngOnDestroy() {
        if (this.view) {
            this.view.destroy();
        }
    }

}
