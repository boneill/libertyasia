import { Component, OnInit } from '@angular/core';
import { NgForm }    from '@angular/common';
import { MediaData } from './media-data';
import { LibertyAsiaService } from './services/libertyAsiaService';
@Component({
  selector: 'media-monitoring-form',
  templateUrl: 'app/media-form.component.html',
  providers: [ LibertyAsiaService ]
  //styleUrls: ['app/media-form.component.css']
})
export class MediaFormComponent implements OnInit {

  active = true;

  //model = new MediaData(18, 'Originagtor Name',"Thailand", 'http://seedim.com.au', 'Person', 'My Headline', 'place of incorp', 'org type', 'Nationality', 21, '14/12/1971', 'male');
  model = new MediaData();
  submitted = false;
  personEntity = false;
  countries:any = [];
  ngoCodes:any = [];
  errorMessage: string;
  alfTicket: string;
  constructor(private libertyAsiaService:LibertyAsiaService) {}

  ngOnInit() {
    console.log("Components Loaded successfully") ;
    this.onGetCountries();
    this.onPostAlfCredentials();

  }

  onGetCountries(){
    this.libertyAsiaService.getCountries()
      .subscribe(
        data => this.countries = data,
        error => this.errorMessage = <any>error
      );
  }
  onPostAlfCredentials(){
    this.libertyAsiaService.postAlfCredentials()
      .subscribe(
        data => this.alfTicket = JSON.stringify(data),
        error => this.errorMessage = <any>error
      );
    console.log(this.alfTicket);
  }
  onGetNGOCodes(){
    this.libertyAsiaService.getNGOColdList()
      .subscribe(
        data => this.ngoCodes = data,
        error => this.errorMessage = <any>error
      );
  }
  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  newMediaSubmission(){
    this.model = new MediaData();
    this.active = false;
    setTimeout(()=> this.active=true, 0);
    this.submitted=false;
  }
}
