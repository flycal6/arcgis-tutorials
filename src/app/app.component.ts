import { Component } from '@angular/core';
import { MAP_EMOJI } from '@app/constants';
import esriConfig from '@arcgis/core/config';
import { ARCGIS_API_KEY } from '@environments/environment';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent {
    title = 'arcgis-tutorials';
    header = 'Making Maps ' + MAP_EMOJI;

    constructor() {
        esriConfig.apiKey = ARCGIS_API_KEY;
    }

}
