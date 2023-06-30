import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import { ARCGIS_MIDCENTURY, ARCGIS_TOPOGRAPHIC, MAHOU_RIVERIA, MY_POINTS_LAYER_URL } from '@app/constants';
import Search from '@arcgis/core/widgets/Search';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Editor from '@arcgis/core/widgets/Editor';

@Component({
  selector: 'app-editable-layer',
  templateUrl: './editable-layer.component.html',
  styleUrls: ['./editable-layer.component.scss']
})
export class EditableLayerComponent implements OnInit, OnDestroy {

@ViewChild('mapViewNode', {static: true}) viewDiv!: ElementRef;
public view: MapView | null = null;

    initMap(): Promise<any> {
        const container = this.viewDiv.nativeElement;

        const myPointsFeatureLayer = new FeatureLayer({
            url: MY_POINTS_LAYER_URL
        });

        const map = new Map({
            // basemap: ARCGIS_TOPOGRAPHIC,
            basemap: ARCGIS_MIDCENTURY,
            layers: [myPointsFeatureLayer]
        });

        const view = new MapView({
            container,
            map   : map,
            zoom  : 13,
            center: MAHOU_RIVERIA // longitude, latitude
        });

        const editor = new Editor({
           view
        });
        view.ui.add(editor, 'top-right');

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
