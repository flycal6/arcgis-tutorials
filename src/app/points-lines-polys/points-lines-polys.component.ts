import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import Graphic from '@arcgis/core/Graphic';
import Polyline from '@arcgis/core/geometry/Polyline';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import Polygon from '@arcgis/core/geometry/Polygon';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import PopupTemplate from '@arcgis/core/PopupTemplate';

@Component({
    selector   : 'app-points-lines-polys',
    templateUrl: './points-lines-polys.component.html',
    styleUrls  : ['./points-lines-polys.component.scss']
})
export class PointsLinesPolysComponent implements OnInit, OnDestroy {

    @ViewChild('mapViewNode', {static: true}) viewDiv!: ElementRef;
    public view: any = null;

    ngOnInit(): void {
        this.initMap().then(() => {
            console.log('the map is ready');
        });
    }

    initMap(): Promise<any> {
        const container = this.viewDiv.nativeElement;

        const map = new Map({
            basemap: 'arcgis-topographic'
        });

        const view = new MapView({
            map,
            center: [-118.80500, 34.02700],
            zoom  : 13,
            container
        });

        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);


        graphicsLayer.add(this.createPointGraphic());
        graphicsLayer.add(this.createLineGraphic());
        graphicsLayer.add(this.createPolygonGraphic());

        this.view = view;
        return this.view.when();
    }

    createPolygonGraphic(): Graphic {
        const polygon = new Polygon({
            rings: [
                [
                    [-118.818984489994, 34.0137559967283], //Longitude, latitude
                    [-118.806796597377, 34.0215816298725], //Longitude, latitude
                    [-118.791432890735, 34.0163883241613], //Longitude, latitude
                    [-118.79596686535, 34.008564864635],   //Longitude, latitude
                    [-118.808558110679, 34.0035027131376]  //Longitude, latitude
                ]
            ]
        });

        const simpleFillSymbol = new SimpleFillSymbol({
            color  : [227, 139, 79, 0.5],
            outline: {
                color: [255, 255, 255],
                width: 1
            }
        });

        const popupTemplate = new PopupTemplate({
            title  : '{Name}',
            content: '{Description}'
        });

        const attributes = {
            Name       : 'Graphic',
            Description: 'I am a polygon'
        };

        const polygonGraphic = new Graphic({
            geometry: polygon,
            symbol  : simpleFillSymbol,
            attributes,
            popupTemplate
        });

        return polygonGraphic;
    }

    createLineGraphic(): Graphic {
        const polyLine = new Polyline({
            paths: [
                [ // first path
                    [-118.821527826096, 34.0139576938577], //Longitude, latitude
                    [-118.814893761649, 34.0080602407843], //Longitude, latitude
                    [-118.808878330345, 34.0016642996246]  //Longitude, latitude
                ]
            ]
        });

        const simpleLineSymbol = new SimpleLineSymbol({
            color: [226, 119, 40],
            width: 2
        });

        const polyLineGraphic = new Graphic({
            geometry: polyLine,
            symbol  : simpleLineSymbol
        });

        return polyLineGraphic;
    }

    createPointGraphic(): Graphic {
        const point = new Point({
            longitude: -118.80657463861,
            latitude : 34.0005930608889
        });

        const simpleMarkerSymbol = new SimpleMarkerSymbol({
            // type: 'simple-marker',
            color  : [226, 119, 40],
            outline: {
                color: [255, 255, 255],
                width: 1
            }
        });

        const pointGraphic = new Graphic({
            geometry: point,
            symbol  : simpleMarkerSymbol
        });

        return pointGraphic;
    }

    ngOnDestroy(): void {
        if (this.view) {
            this.view.destroy();
        }
    }
}
