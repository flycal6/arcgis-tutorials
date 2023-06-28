import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import { ARCGIS_TOPOGRAPHIC, LA_COUNTY_PARCELS_FEATURE_LAYER } from '@app/constants';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Query from '@arcgis/core/rest/support/Query';
import FeatureSet from '@arcgis/core/rest/support/FeatureSet';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import Graphic from '@arcgis/core/Graphic';

@Component({
    selector   : 'app-sql-feature-query',
    templateUrl: './sql-feature-query.component.html',
    styleUrls  : ['./sql-feature-query.component.scss']
})
export class SqlFeatureQueryComponent implements OnInit, OnDestroy {

    @ViewChild('mapViewNode', {static: true}) viewDiv!: ElementRef;
    public view: MapView | null = null;
    whereClause: string = '';

    private buildSelect(view: MapView): HTMLSelectElement {
        // SQL query array
        const parcelLayerSQL = ['Choose a SQL WHERE clause...', 'UseType = \'Residential\'', 'UseType = \'Government\'', 'UseType = \'Irrigated Farm\'', 'TaxRateArea = 10853', 'TaxRateArea = 10860', 'TaxRateArea = 08637', 'Roll_LandValue > 1000000', 'Roll_LandValue < 1000000'];
        this.whereClause = parcelLayerSQL[0];

        // add SQL UI
        const select = document.createElement('select');
        select.setAttribute('class', 'esri-widget esri-select');
        select.setAttribute('style', 'width: 200px; font-family: \'Avenir Next\'; font-size: 1em');
        for (const query of parcelLayerSQL) {
            const option = document.createElement('option');
            option.innerHTML = query;
            option.value = query;
            select.appendChild(option);
        }

        select.addEventListener('change', (event) => {
            // @ts-ignore
            this.whereClause = event.target.value;
            this.queryFeatureLayer(view);
        });

        return select;
    }

    private queryFeatureLayer(view: MapView) {
        const parcelQuery = new Query({
            where              : this.whereClause,
            spatialRelationship: 'intersects',
            geometry           : view.extent,
            outFields          : ['APN', 'UseType', 'TaxRateCity', 'Roll_LandValue'], // attributes to return
            returnGeometry     : true
        });

        const parcelLayer = new FeatureLayer({
            url: LA_COUNTY_PARCELS_FEATURE_LAYER
        });

        parcelLayer.queryFeatures(parcelQuery).then(res => {
            console.log('feature count: ' + res.features.length);
            const queryResults: Graphic[] = this.setFeatureGraphics(res);
            this.displayFeatureGraphics(view, queryResults);
        }).catch(err => {
            console.error(err.error);
        });
    }

    private displayFeatureGraphics(view: MapView, queryResults: Graphic[]): void {
        view.closePopup();
        view.graphics.removeAll();
        view.graphics.addMany(queryResults);
    }

    private setFeatureGraphics(results: FeatureSet): Graphic[] {
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

        const select: HTMLSelectElement = this.buildSelect(view);
        view.ui.add(select, 'top-right');

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
