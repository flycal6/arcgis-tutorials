import { Component } from '@angular/core';
import { MAP_EMOJI } from '../constants';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent {
    title = 'arcgis-tutorials';
    header = 'Making Maps ' + MAP_EMOJI;
}
