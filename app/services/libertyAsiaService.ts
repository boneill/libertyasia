/**
 * Created by user on 27/05/2016.
 */
import {Injectable} from "@angular/core";
import { Http, Headers, RequestOptions, Response } from '@angular/http';
//import { Observable }     from '../../node_modules/rxjs/observable';
import { Observable }     from '../../node_modules/rxjs/Observable';
import '../rxjs-operators';
//import '../../node_modules/rxjs/Rx';


@Injectable()
export class LibertyAsiaService{

    //getURL:string = "http://jsonplaceholder.typicode.com/posts/1";
    getURL:string = "http://192.168.15.109:8080/alfresco/service/api/authentication";
    //getURL:string = "http://192.168.15.104:8080/alfresco/service/api/login?u=admin&pw=seed";
    authURL:string = "http://192.168.15.109:8080/alfresco/service/api/login";
    submitURL:string = "http://192.168.15.109:8080/alfresco/service/seeksystem/mediamonitoring/createnode?alf_ticket=";
    getNgoCodeURL:string = "http://192.168.15.109:8080/alfresco/service/seeksystem/mediamonitoring/ngocodes?alf_ticket=";
    countriesUrl:string = "/app/countries.json";
    alfTicket:string;

    constructor (private http: Http) {}

    getCountries(){
      return this.http.get(this.countriesUrl)
        .map(this.extractData)
        .catch(this.handleError);
    }

    getNGOCodeList(){
        return this.http.get(this.getNgoCodeURL + this.alfTicket)
            .map(this.extractData)
            .catch(this.handleError);
    }
    postAlfCredentials(){
        let body = JSON.stringify({username:"admin", password:"admin"});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.authURL, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    postSubmit(){
      let body = JSON.stringify({ngoCode:"1234", subjectName:"Test"});
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(this.submitURL + this.alfTicket, body, options)
          .map(this.extractData)
          .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        //let body = res.text();
        return body || { };
    }

    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
