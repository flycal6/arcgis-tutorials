import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import SceneView from '@arcgis/core/views/SceneView';
import WebScene from '@arcgis/core/WebScene';
import Legend from '@arcgis/core/widgets/Legend';

@Component({
  selector: 'app-web-scene',
  templateUrl: './web-scene.component.html',
  styleUrls: ['./web-scene.component.scss']
})
export class WebSceneComponent implements OnInit, OnDestroy {
    public view: SceneView | null = null;
    @ViewChild('mapViewNode', {static: true}) viewDiv!: ElementRef;

    private initMap(): Promise<any> {
        const container = this.viewDiv.nativeElement;

        const webscene = new WebScene({
           portalItem: {
               id: '579f97b2f3b94d4a8e48a5f140a6639b'
           }
        });

        const view = new SceneView({
           container,
           map: webscene
        });

        const legend = new Legend({
            view
        });
        view.ui.add(legend, 'top-right');

        this.view = view;
        return this.view.when();
    }

    ngOnInit(): void {
        this.initMap().then(() => {
            console.log('map ready');
        });
    }

    ngOnDestroy(): void {
        if (this.view) {
            this.view.destroy();
        }
    }
}
