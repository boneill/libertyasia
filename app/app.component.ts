import {Component} from '@angular/core';
import { MediaFormComponent } from './media-form.component'

@Component({
    selector: 'my-app',
    template: '<media-monitoring-form>Loading Media Monitoring Submission Form ...</media-monitoring-form>',
    directives: [MediaFormComponent]
})
export class AppComponent { }
