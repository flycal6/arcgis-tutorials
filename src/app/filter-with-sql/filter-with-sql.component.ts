import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import { ARCGIS_COMMUNITY, ARCGIS_TOPOGRAPHIC, LA_COUNTY_PARCELS_FEATURE_LAYER, MAHOU_RIVERIA } from '@app/constants';
import Search from '@arcgis/core/widgets/Search';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import PopupTemplate from '@arcgis/core/PopupTemplate';

@Component({
    selector   : 'app-filter-with-sql',
    templateUrl: './filter-with-sql.component.html',
    styleUrls  : ['./filter-with-sql.component.scss']
})
export class FilterWithSqlComponent implements OnInit, OnDestroy {

    @ViewChild('mapViewNode', {static: true}) viewDiv!: ElementRef;
    public view!: MapView;
    featureLayer!: FeatureLayer;

    private createSqlSelector(): HTMLSelectElement {
        const sqlExpressions: string[] = ['Choose a SQL WHERE clause...', 'Roll_LandValue < 200000', 'TaxRateArea = 10853', 'Bedrooms5 > 0', 'UseType = \'Residential\'', 'Roll_RealEstateExemp > 0'];

        // UI Input
        const selectFilter: HTMLSelectElement = document.createElement('select');
        selectFilter.setAttribute('class', 'esri-widget esri-select');
        selectFilter.setAttribute('style', 'width: 275px; font-family: Avenir Next W00; font-size: 1em');

        for (const sql of sqlExpressions) {
            const option: HTMLOptionElement = document.createElement('option');
            option.value = sql;
            option.innerHTML = sql;
            selectFilter.appendChild(option);
        }

        selectFilter.addEventListener('change', (event) => {
            // @ts-ignore
            this.setFeatureLayerFilter(event.target?.value);
        });
        return selectFilter;
    }

    private createFeatureLayer(): void {
        const featureLayer = new FeatureLayer({
            url                 : LA_COUNTY_PARCELS_FEATURE_LAYER,
            outFields           : ['*'],
            popupTemplate       : new PopupTemplate({
                title  : 'UseType',
                content: 'Description: {UseDescription}. Land Value: {Roll_LandValue}'
            }),
            definitionExpression: '1=0' // prevents feature display on layer load
        });

        this.featureLayer = featureLayer;
    }

    // server side filter
    private setFeatureLayerFilter(expression: string): void {
        if (this.featureLayer) {
            this.featureLayer.definitionExpression = expression; // sets the WHERE clause
        }
    }

    initMap(): Promise<any> {
        const container = this.viewDiv.nativeElement;

        const map = new Map({
            basemap: ARCGIS_COMMUNITY,
        });

        const view = new MapView({
            // container: "viewDiv",
            container,
            map   : map,
            zoom  : 12,
            center: MAHOU_RIVERIA // longitude, latitude
        });

        const select: HTMLSelectElement = this.createSqlSelector();
        view.ui.add(select, 'top-right');

        this.createFeatureLayer();
        map.add(this.featureLayer);

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
