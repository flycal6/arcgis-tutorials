import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import esriConfig from '@arcgis/core/config';
import { ARCGIS_API_KEY } from '../../environments/environment';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle';
import Search from '@arcgis/core/widgets/Search';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';

@Component({
  selector: 'app-basemap-gallery',
  templateUrl: './basemap-gallery.component.html',
  styleUrls: ['./basemap-gallery.component.scss']
})
export class BasemapGalleryComponent implements OnInit, OnDestroy {

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

        const map = new Map({
            basemap: 'arcgis-topographic',
        });


        const view = new MapView({
            container,
            map,
            center: [-118.80543,34.02700], // longitude, latitude
            zoom: 13
        });

        const basemapGallery = new BasemapGallery({
            view,
            source: {
                query: {
                    title: '"World Basemaps for Developers" AND owner:esri'
                }
            }
        })
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
