import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Search from '@arcgis/core/widgets/Search';
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle';
import { MAHOU_RIVERIA, ARCGIS_TOPOGRAPHIC } from '@app/constants';

@Component({
    selector   : 'app-toggle-basemap-layer',
    templateUrl: './toggle-basemap-layer.component.html',
    styleUrls  : ['./toggle-basemap-layer.component.scss']
})
export class ToggleBasemapLayerComponent implements OnInit, OnDestroy {

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
            basemap: ARCGIS_TOPOGRAPHIC,
        });


        const view = new MapView({
            container,
            map,
            center: MAHOU_RIVERIA, // longitude, latitude
            zoom  : 13
        });

        const basemapToggle = new BasemapToggle({
            view,
            nextBasemap: 'arcgis-imagery'
        });

        view.ui.add(basemapToggle, 'bottom-right');

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
