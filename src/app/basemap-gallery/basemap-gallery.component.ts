import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Search from '@arcgis/core/widgets/Search';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import { MAHOU_RIVERIA, ARCGIS_TOPOGRAPHIC } from '@app/constants';

@Component({
    selector   : 'app-basemap-gallery',
    templateUrl: './basemap-gallery.component.html',
    styleUrls  : ['./basemap-gallery.component.scss']
})
export class BasemapGalleryComponent implements OnInit, OnDestroy {

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

        const basemapGallery = new BasemapGallery({
            view,
            source: {
                query: {
                    title: '"World Basemaps for Developers" AND owner:esri'
                }
            }
        });
        view.ui.add(basemapGallery, 'top-right');

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
