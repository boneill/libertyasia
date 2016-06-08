/**
 * Created by user on 30/05/2016.
 */
// import 'rxjs/Rx'; // adds ALL RxJS statics & operators to Observable

// See node_module/rxjs/Rxjs.js
// Import just the rxjs statics and operators we need for THIS app.

// Statics
import '../node_modules/rxjs/add/observable/throw';

// Operators
import '../node_modules/rxjs/add/operator/catch';
import '../node_modules/rxjs/add/operator/debounceTime';
import '../node_modules/rxjs/add/operator/distinctUntilChanged';
import '../node_modules/rxjs/add/operator/map';
import '../node_modules/rxjs/add/operator/switchMap';
import '../node_modules/rxjs/add/operator/toPromise';
