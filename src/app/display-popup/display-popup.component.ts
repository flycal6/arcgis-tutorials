import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Map from '@arcgis/core/Map';
import { ARCGIS_TOPOGRAPHIC, MAHOU_RIVERIA, PARKS_OPEN_SPACES_STYLED_FEATURE_LAYER, TRAILHEADS_STYLED_FEATURE_LAYER, TRAILS_STYLED_FEATURE_LAYER } from '@app/constants';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import MapView from '@arcgis/core/views/MapView';
import MediaContent from '@arcgis/core/popup/content/MediaContent';
import ColumnChartMediaInfo from '@arcgis/core/popup/content/ColumnChartMediaInfo';
import ChartMediaInfoValue from '@arcgis/core/popup/content/support/ChartMediaInfoValue';
import FieldsContent from '@arcgis/core/popup/content/FieldsContent';
import FieldInfo from '@arcgis/core/popup/FieldInfo';
import FieldInfoFormat from '@arcgis/core/popup/support/FieldInfoFormat';

@Component({
    selector   : 'app-display-popup',
    templateUrl: './display-popup.component.html',
    styleUrls  : ['./display-popup.component.scss']
})
export class DisplayPopupComponent implements OnInit, OnDestroy {
    public view: any = null;
    @ViewChild('mapViewNode', {static: true}) viewDiv!: ElementRef;

    private initMap(): Promise<any> {
        const container = this.viewDiv.nativeElement;

        const map = new Map({
            basemap: ARCGIS_TOPOGRAPHIC
        });

        const view = new MapView({
            container,
            map,
            center: MAHOU_RIVERIA,
            zoom  : 13
        });

        const trailheads: FeatureLayer = this.createTrailheads();
        map.add(trailheads);

        const trails: FeatureLayer = this.createTrails();
        map.add(trails, 0);

        const openSpaces: FeatureLayer = this.createTable();
        map.add(openSpaces, 0);

        this.view = view;
        return this.view.when();
    }

    private createTable(): FeatureLayer {
        const popupOpenSpaces = new PopupTemplate({
            title  : '{PARK_NAME}',
            content: [
                new FieldsContent({
                    fieldInfos: [
                        new FieldInfo({
                            fieldName        : 'AGNCY_NAME',
                            label            : 'Agency',
                            isEditable       : true,
                            tooltip          : '',
                            visible          : true,
                            stringFieldOption: 'text-box'
                        }),
                        new FieldInfo({
                            fieldName        : 'TYPE',
                            label            : 'Type',
                            isEditable       : true,
                            tooltip          : '',
                            visible          : true,
                            stringFieldOption: 'text-box'
                        }),
                        new FieldInfo({
                            fieldName        : 'ACCESS_TYP',
                            label            : 'Access',
                            isEditable       : true,
                            tooltip          : '',
                            visible          : true,
                            stringFieldOption: 'text-box'
                        }),
                        new FieldInfo({
                            fieldName        : 'GIS_ACRES',
                            label            : 'Acres',
                            isEditable       : true,
                            tooltip          : '',
                            visible          : true,
                            format           : new FieldInfoFormat({
                                places        : 2,
                                digitSeparator: true
                            }),
                            stringFieldOption: 'text-box'
                        }),
                    ]
                })
            ]
        });

        const openspaces = new FeatureLayer({
            url          : PARKS_OPEN_SPACES_STYLED_FEATURE_LAYER,
            outFields    : ['TYPE', 'PARK_NAME', 'AGNCY_NAME', 'ACCESS_TYP', 'GIS_ACRES', 'TRLS_MI', 'TOTAL_GOOD', 'TOTAL_FAIR', 'TOTAL_POOR'],
            popupTemplate: popupOpenSpaces
        });

        return openspaces;
    }

    private createTrails(): FeatureLayer {
        const popupTrails = new PopupTemplate({
            title  : 'Trail Information',
            content: [
                new MediaContent({
                    mediaInfos: new ColumnChartMediaInfo({
                        caption: '{ELEV_GAIN} ft of elevation gain on this trail',
                        value  : new ChartMediaInfoValue({
                            fields      : ['ELEV_MIN', 'ELEV_MAX'],
                            tooltipField: 'Min and max elevation values'
                        })
                    })
                })
            ]
        });

        const trails = new FeatureLayer({
            url          : TRAILS_STYLED_FEATURE_LAYER,
            outFields    : ['TRL_NAME', 'ELEV_GAIN'],
            popupTemplate: popupTrails
        });

        return trails;
    }

    private createTrailheads(): FeatureLayer {
        const popupTrailheads = new PopupTemplate({
            'title'  : 'Trailhead',
            'content': '<b>Trail:</b> {TRL_NAME}<br><b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft'
        });

        const trailheads = new FeatureLayer({
            url          : TRAILHEADS_STYLED_FEATURE_LAYER,
            outFields    : ['TRL_NAME', 'CITY_JUR', 'X_STREET', 'PARKING', 'ELEV_FT'],
            popupTemplate: popupTrailheads
        });

        return trailheads;
    }

    ngOnInit(): void {
        this.initMap().then(() => {
            console.log('map loaded');
        }).catch(err => {
            console.error(err);
        });
    }

    ngOnDestroy(): void {
        if (this.view) {
            this.view.destroy();
        }
    }
}
