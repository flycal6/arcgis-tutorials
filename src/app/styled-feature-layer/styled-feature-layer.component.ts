import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';
import TextSymbol from '@arcgis/core/symbols/TextSymbol';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import LabelClass from '@arcgis/core/layers/support/LabelClass';
import Font from '@arcgis/core/symbols/Font';
import { MAHOU_RIVERIA, NPS_HIKER_PICTOGRAPH, PARKS_OPEN_SPACES_FEATURE_LAYER, ARCGIS_TOPOGRAPHIC, TRAILHEADS_FEATURE_LAYER, TRAILS_FEATURE_LAYER } from '@app/constants';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import VisualVariable from '@arcgis/core/renderers/visualVariables/VisualVariable';
import SizeVariable from '@arcgis/core/renderers/visualVariables/SizeVariable';
import FillSymbol from '@arcgis/core/symbols/FillSymbol';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import UniqueValueRenderer from '@arcgis/core/renderers/UniqueValueRenderer';
import UniqueValue from '@arcgis/core/renderers/support/UniqueValue';
import UniqueValueInfo from '@arcgis/core/renderers/support/UniqueValueInfo';

@Component({
    selector   : 'app-styled-feature-layer',
    templateUrl: './styled-feature-layer.component.html',
    styleUrls  : ['./styled-feature-layer.component.scss']
})
export class StyledFeatureLayerComponent implements OnInit, OnDestroy {
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

        const trailheads = this.renderTrailheads();
        map.add(trailheads);

        const trails = this.renderTrails();
        map.add(trails, 0);

        const bikeTrails = this.renderBikeTrails();
        map.add(bikeTrails, 1);

        const openSpaces = this.renderOpenSpaces();
        map.add(openSpaces, 0);

        this.view = view;

        return this.view.when();
    }

    private renderOpenSpaces(): FeatureLayer {
        const openSpacesRenderer = new UniqueValueRenderer({
            field: 'TYPE',
            uniqueValueInfos: [
                this.createFillSymbol("Natural Areas", "#9E559C"),
                this.createFillSymbol("Regional Open Space", "#A7C636"),
                this.createFillSymbol("Local Park", "#149ECE"),
                this.createFillSymbol("Regional Recreation Park", "#ED5151")
            ]
        });

        const openSpaces = new FeatureLayer({
            url: PARKS_OPEN_SPACES_FEATURE_LAYER,
            renderer: openSpacesRenderer,
            opacity: 0.4
        });
        return openSpaces;
    }

    private createFillSymbol(value: string, color: string) {
        return new UniqueValueInfo({
            value,
            symbol: new SimpleFillSymbol({
                color,
                style: 'solid',
                outline: new SimpleLineSymbol({
                    style: 'none'
                })
            }),
            label: value
        });
    }

    private renderBikeTrails(): FeatureLayer {
        const bikeTrailsRenderer = new SimpleRenderer({
            symbol: new SimpleLineSymbol({
                style: 'long-dash',
                color: 'yellow',
                width: '1px'
            })
        });

        const bikeTrails = new FeatureLayer({
            url: TRAILS_FEATURE_LAYER,
            renderer: bikeTrailsRenderer,
            definitionExpression: "USE_BIKE = 'YES'"
        });

        return bikeTrails;
    }

    private renderTrails(): FeatureLayer {
        const trailsRenderer = new SimpleRenderer({
            symbol: new SimpleLineSymbol({
                color: '#BA55D3',
                style: 'solid'
            }),
            visualVariables: [
                new SizeVariable({
                    field: 'ELEV_GAIN',
                    minDataValue: 0,
                    maxDataValue: 2300,
                    minSize: '3px',
                    maxSize: '7px'
                })
            ]
        });

        const trails = new FeatureLayer({
            url: TRAILS_FEATURE_LAYER,
            renderer: trailsRenderer,
            opacity: 0.75
        });

        return trails;
    }

    private renderTrailheads(): FeatureLayer {
        const trailheadsRenderer = new SimpleRenderer({
            symbol: new PictureMarkerSymbol({
                url   : NPS_HIKER_PICTOGRAPH,
                width : '18px',
                height: '18px'
            })
        });

        const trailheadsLabels = new LabelClass({
            symbol             : new TextSymbol({
                color    : '#FFFFFF',
                haloColor: '#5E8D74',
                haloSize : '2px',
                font     : new Font({
                    size  : '12px',
                    family: 'Noto Sans',
                    style : 'italic',
                    weight: 'normal'
                })
            }),
            labelPlacement     : 'above-center',
            labelExpressionInfo: {
                expression: '$feature.TRL_NAME'
            }
        });

        const trailheads = new FeatureLayer({
            url         : TRAILHEADS_FEATURE_LAYER,
            renderer    : trailheadsRenderer,
            labelingInfo: [trailheadsLabels]
        });

        return trailheads;
    }

    ngOnInit(): void {
        this.initMap().then(() => {
            console.log('the map is ready');
        });
    }

    ngOnDestroy(): void {
        if (this.view) {
            this.view.destroy();
        }
    }
}
