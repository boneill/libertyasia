import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { HTTP_PROVIDERS } from '@angular/http';
import { LibertyAsiaService } from './services/libertyAsiaService';

bootstrap(AppComponent,[ HTTP_PROVIDERS , LibertyAsiaService ]);
