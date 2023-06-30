import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import { ARCGIS_MIDCENTURY, ARCGIS_NAVIGATION, ARCGIS_TOPOGRAPHIC } from '@app/constants';
import Search from '@arcgis/core/widgets/Search';
import Locate from '@arcgis/core/widgets/Locate';

@Component({
  selector: 'app-display-location',
  templateUrl: './display-location.component.html',
  styleUrls: ['./display-location.component.scss']
})
export class DisplayLocationComponent implements OnInit, OnDestroy {

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

        const locate = new Locate({
            view,
            rotationEnabled: false,
            goToOverride: (view, options) => {
                options.target.scale = 1500;
                return view.goTo(options.target);
            }
        });

        view.ui.add(locate, 'top-left');
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
