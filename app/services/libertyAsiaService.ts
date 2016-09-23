/**
 * Created by user on 27/05/2016.
 */
import {Injectable} from "@angular/core";
import { Http, Headers, RequestOptions, Response } from '@angular/http';
//import { Observable }     from '../../node_modules/rxjs/observable';
import { Observable }     from '../../node_modules/rxjs/Observable';
import '../rxjs-operators';
import {MediaData} from "../media-data";
//import '../../node_modules/rxjs/Rx';


@Injectable()
export class LibertyAsiaService{

    //submitURL:string = "http://192.168.56.102:8080/alfresco/service/seeksystem/mediamonitoring/createnode";
    submitURL:string = "https://www.seeksystem.org/alfresco/service/seeksystem/mediamonitoring/createnode";
    //getNgoCodeURL:string = "http://192.168.56.102:8080/alfresco/service/seeksystem/mediamonitoring/ngocodes";
    getNgoCodeURL:string = "https://www.seeksystem.org/alfresco/service/seeksystem/mediamonitoring/ngocodes";
    //countriesUrl:string = "/app/countries.json";
    countriesUrl:string = "/media/app/countries.json";
    alfTicket:string;

    constructor (private http: Http) {}

    getCountries(){
      return this.http.get(this.countriesUrl)
        .map(this.extractData)
        .catch(this.handleError);
    }

    getNGOCodeList(){
      return this.http.get(this.getNgoCodeURL)
        .map(this.extractData)
        .catch(this.handleError);
    }

    postSubmit(model:MediaData){
      let body = JSON.stringify(model);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(this.submitURL, body, options)
          .map(this.extractData)
          .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        //let body = res.text();
        return body || { };
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
