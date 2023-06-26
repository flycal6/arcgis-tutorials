import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Map from '@arcgis/core/Map';
import Search from '@arcgis/core/widgets/Search';
import SceneView from '@arcgis/core/views/SceneView';
import { TOPOGRAPHIC_BASEMAP } from '@app/constants';

@Component({
    selector   : 'app-scene-view',
    templateUrl: './scene-view.component.html',
    styleUrls  : ['./scene-view.component.scss']
})
export class SceneViewComponent implements OnInit, OnDestroy {

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
            basemap: TOPOGRAPHIC_BASEMAP,
            // ground: 'world-elevation'
        });

        const view = new SceneView({
            container,
            map,
            camera: {
                position: {
                    x: -118.808, // longitude
                    y: 33.961, // latitude
                    z: 2000 // meters
                },
                tilt    : 75
            }
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
