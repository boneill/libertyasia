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
  validNGOCode = true;
  personEntity = false;
  countries:any = [];
  ngoCodes:any = [];
  errorMessage: string;
  //alfTicket: string;
  submitData:string;
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
        //data => this.alfTicket = JSON.stringify(data),
        data => this.libertyAsiaService.alfTicket = data.data.ticket,
        error => this.errorMessage = <any>error,
        () => this.onGetNGOCodes()
      );
  }
  onGetNGOCodes(){
    this.libertyAsiaService.getNGOCodeList()
      .subscribe(
        //data => this.ngoCodes = JSON.stringify(data),
        data => this.ngoCodes = data.ngoCodes,
        error => this.errorMessage = <any>error
      );
    console.log(JSON.stringify(this.ngoCodes));
  }
  validateNGOCode(): boolean{
    for (let ngoCode of this.ngoCodes ) {
      if (this.model.ngoCode != null) {
        if (ngoCode.code == this.model.ngoCode) {
          console.log("NGO Code valid: " + ngoCode.code);
          this.validNGOCode = true;
          break;
        } else {
          console.log("NGO Code inValid: " + ngoCode.code);
          this.validNGOCode = false;
        }
      }
    }
    return this.validNGOCode;
  }
  onSubmit() {
    this.submitted = true;
    this.libertyAsiaService.postSubmit()
      .subscribe(
        data => this.submitData = JSON.stringify(data),
        error => this.errorMessage = <any>error
      );
  }


  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  newMediaSubmission(){
    this.model = new MediaData(this.model.ngoCode, this.model.originatorName, this.model.email);
    this.active = false;
    setTimeout(()=> this.active=true, 0);
    this.submitted=false;
  }

  resetMediaSubmission(){
    this.model = new MediaData();
    this.active = false;
    setTimeout(()=> this.active=true, 0);
    this.submitted=false;
  }
}
