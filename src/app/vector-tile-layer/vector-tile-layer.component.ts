import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import { ARCGIS_TOPOGRAPHIC, MAHOU_RIVERIA, SANTA_MONICA_MOUNTAINS_PARCELS_VTL } from '@app/constants';
import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';

@Component({
  selector: 'app-vector-tile-layer',
  templateUrl: './vector-tile-layer.component.html',
  styleUrls: ['./vector-tile-layer.component.scss']
})
export class VectorTileLayerComponent implements OnInit, OnDestroy {
    public view: MapView | null = null;
    @ViewChild('mapViewNode', {static: true}) viewDiv!: ElementRef;

    private initMap(): Promise<any> {
        const container = this.viewDiv.nativeElement;

        const vtl = new VectorTileLayer({
            url: SANTA_MONICA_MOUNTAINS_PARCELS_VTL
        });

        const map = new Map({
            basemap: ARCGIS_TOPOGRAPHIC,
            layers: [vtl]
        });

        const view = new MapView({
           container,
           map,
           center: MAHOU_RIVERIA,
           zoom: 13
        });


        this.view = view;
        return this.view.when();
    }

    ngOnInit(): void {
        this.initMap().then(() => {
            console.log('map ready');
        }).catch(err => {
            console.error(err);
        })
    }

    ngOnDestroy(): void {
        if (this.view) {
            this.view.destroy();
        }
    }
}
