import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FotosComponent } from './pages/fotos/fotos.component';
import { CargaComponent } from './pages/carga/carga.component';
import { NavbarComponent } from './components/navbar/navbar.component';
//rutas
import { APP_ROUTES } from './app.routes';
// firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
// import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';


@NgModule({
  declarations: [
    AppComponent,
    FotosComponent,
    CargaComponent,
    NavbarComponent,
    NgDropFilesDirective
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
