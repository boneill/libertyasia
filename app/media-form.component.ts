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

  submissionResponse: string;
  active = true;
  model = new MediaData();
  submitted = false;
  validNGOCode = true;
  personEntity = false;
  countries:any = [];
  ngoCodes:any = [];
  errorMessage: string;
  submitData:any;
  constructor(private libertyAsiaService:LibertyAsiaService) {}

  ngOnInit() {
    console.log("Components Loaded successfully") ;
    this.onGetCountries();
    this.onGetNGOCodes();
  }

  onGetCountries(){
    this.libertyAsiaService.getCountries()
      .subscribe(
        data => this.countries = data,
        error => this.errorMessage = <any>error
      );
  }

  onGetNGOCodes(){
    this.libertyAsiaService.getNGOCodeList()
      .subscribe(
        data => this.ngoCodes = data.ngoCodes,
        error => this.errorMessage = <any>error,
        //() => console.log(JSON.stringify(this.ngoCodes))
        () => console.log("NGO Codes Retrieved successfully")
      );
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

  submitComplete(){

    if(this.submitData.success != null)
    {
      this.submissionResponse = this.submitData.success;
      console.log(this.submitData.success);
    }
    else
    {
      this.submissionResponse = this.submitData.error;
      console.log(this.submitData.error);
      //console.log(this.errorMessage)
    }
    this.submitted = true;
  };

  onSubmit() {

    this.libertyAsiaService.postSubmit(this.model)
      .subscribe(
        //data => this.submitData = JSON.stringify(data),
        data => this.submitData = data,
        error => this.errorMessage = <any>error,
        () => this.submitComplete()
      );
  }


  // TODO: Remove this when we're done
  //get diagnostic() { return JSON.stringify(this.model); }

  newMediaSubmission(){

    this.model.subjectName = "";
    this.model.entityType = "";
    this.model.nationality = "";
    this.model.age = "";
    this.model.gender = "";
    /***this.model = new MediaData(this.model.ngoCode,this.model.subjectName,this.model.countryOfOffence,this.model.sourceUrl,this.model.optSourceUrl1,
      this.model.optSourceUrl2,this.model.headline,this.model.additionalInformation,this.model.entityType,this.model.nationality,
      this.model.age, this.model.gender);**/
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
