import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import { ARCGIS_TOPOGRAPHIC, LA_COUNTY_PARCELS_FEATURE_LAYER } from '@app/constants';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Sketch from '@arcgis/core/widgets/Sketch';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Query from '@arcgis/core/rest/support/Query';
import Geometry from '@arcgis/core/geometry/Geometry';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import FeatureSet from '@arcgis/core/rest/support/FeatureSet';
import Graphic from '@arcgis/core/Graphic';

@Component({
    selector   : 'app-spatial-feature-query',
    templateUrl: './spatial-feature-query.component.html',
    styleUrls  : ['./spatial-feature-query.component.scss']
})
export class SpatialFeatureQueryComponent implements OnInit, OnDestroy {

    @ViewChild('mapViewNode', {static: true}) viewDiv!: ElementRef;
    public view: MapView | null = null;
    private parcelLayer: FeatureLayer | undefined;

    private addSketchWidget(map: Map, view: MapView) {
        const graphicsLayerSketch = new GraphicsLayer();
        map.add(graphicsLayerSketch);

        const sketch = new Sketch({
            layer       : graphicsLayerSketch,
            view,
            creationMode: 'update'
        });

        view.ui.add(sketch, 'top-right');

        sketch.on('update', (event) => {
            // create
            if (event.state === 'start') {
                this.queryFeatureLayer(event.graphics[0].geometry, view);
            }
            if (event.state === 'complete') {
                graphicsLayerSketch.remove(event.graphics[0]); // Clear the graphic when a user clicks off of it or sketches new one
            }
            // change
            if (['scale-stop', 'reshape-stop', 'move-stop'].includes(event.toolEventInfo?.type)) {
                this.queryFeatureLayer(event.graphics[0].geometry, view);
            }
        });

        // Reference query layer
        this.parcelLayer = new FeatureLayer({
            url: LA_COUNTY_PARCELS_FEATURE_LAYER
        });
    }

    private displayQueryResults(results: FeatureSet): Graphic[] {
        const symbol = new SimpleFillSymbol({
            color  : [20, 130, 200, 0.5],
            outline: new SimpleLineSymbol({
                color: 'white',
                width: .5
            })
        });

        const popupTemplate = new PopupTemplate({
            title  : 'Parcel {APN}',
            content: 'Type: {UseType} <br> Land value: {Roll_LandValue} <br> Tax Rate City: {TaxRateCity}'
        });

        return results.features.map(feature => {
            feature.symbol = symbol;
            feature.popupTemplate = popupTemplate;
            return feature;
        });
    }

    private queryFeatureLayer(geometry: Geometry, view: MapView) {
        const parcelQuery = new Query({
            spatialRelationship: 'intersects',
            geometry,
            outFields          : ['APN', 'UseType', 'TaxRateCity', 'Roll_LandValue'], // attributes to retrieve
            returnGeometry     : true
        });

        this.parcelLayer?.queryFeatures(parcelQuery).then(res => {
            console.log('feature count: ' + res.features.length);
            const graphics: Graphic[] = this.displayQueryResults(res);
            this.displayFeatureGraphics(graphics, view);
        }).catch(err => {
            console.log(err);
        });
    }

    private displayFeatureGraphics(graphics: Graphic[], view: MapView): void {
        view.closePopup();
        view.graphics.removeAll();
        view.graphics.addMany(graphics);
    }

    initMap(): Promise<any> {
        const container = this.viewDiv.nativeElement;

        const map = new Map({
            basemap: ARCGIS_TOPOGRAPHIC,
        });

        const view = new MapView({
            container,
            map   : map,
            zoom  : 13,
            center: [-118.80543, 34.03000] // longitude, latitude
        });

        this.addSketchWidget(map, view);

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
