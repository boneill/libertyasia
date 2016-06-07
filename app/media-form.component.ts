import { Component } from '@angular/core';
import { NgForm }    from '@angular/common';
import { MediaData }    from './media-data';

@Component({
  selector: 'media-monitoring-form',
  templateUrl: 'app/media-form.component.html'
})
export class MediaFormComponent {

  active = true;

  //model = new MediaData(18, 'Originagtor Name',"Thailand", 'http://seedim.com.au', 'Person', 'My Headline', 'place of incorp', 'org type', 'Nationality', 21, '14/12/1971', 'male');
  model = new MediaData();
  submitted = false;
  personEntity = false;

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  newMediaSubmission(){
    this.model = new MediaData();
    this.active = false;
    setTimeout(()=> this.active=true, 0);
    submitted=false;
  }
}
