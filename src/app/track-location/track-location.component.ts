import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import { ARCGIS_NAVIGATION } from '@app/constants';
import Locate from '@arcgis/core/widgets/Locate';
import Track from '@arcgis/core/widgets/Track';
import Graphic from '@arcgis/core/Graphic';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';

@Component({
  selector: 'app-track-location',
  templateUrl: './track-location.component.html',
  styleUrls: ['./track-location.component.scss']
})
export class TrackLocationComponent implements OnInit, OnDestroy {

    @ViewChild('mapViewNode', {static: true}) viewDiv!: ElementRef;
    public view: MapView | null = null;

    initMap(): Promise<any> {
        const container = this.viewDiv.nativeElement;

        const map = new Map({
            basemap: ARCGIS_NAVIGATION,
        });

        const view = new MapView({
            container,
            map   : map,
            zoom  : 2,
            center: [-40, 28] // longitude, latitude - north atlantic
        });

        const track = new Track({
            view,
            graphic: new Graphic({
                symbol: new SimpleMarkerSymbol({
                    size: '15px',
                    color: 'green',
                    outline: new SimpleLineSymbol({
                        color: '#EFEFEF',
                        width: '1.5px'
                    })
                })
            }),
            rotationEnabled: false
        })

        view.ui.add(track, 'top-left');
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
