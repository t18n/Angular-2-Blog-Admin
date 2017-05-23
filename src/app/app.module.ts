import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, XHRBackend, RequestOptions, BaseRequestOptions, Headers, RequestOptionsArgs } from '@angular/http';

import { HttpClient } from './HttpClient';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LeftsidebarComponent } from './leftsidebar/leftsidebar.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { PanelComponent } from './panel/panel.component';
import { AddarticleComponent } from './addarticle/addarticle.component';
import { LoginComponent } from './login/login.component';

export function httpClientFactory(backend: XHRBackend, defaultOptions: RequestOptions) {
  return new HttpClient(backend, defaultOptions);
}

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {
  headers = new Headers({});
  merge(options?: RequestOptionsArgs): RequestOptions {
    var newOptions = super.merge(options);
    newOptions.headers.set('Authorization', localStorage.getItem('authadminToken'));
    //newOptions.headers.set('Accept', 'application/json');
    newOptions.headers.set('Content-Type', 'application/json');


    return newOptions;
  }
}

const routes: Routes = [
  { path: 'dashboard', component: PanelComponent },
  { path: 'addarticle', component: AddarticleComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LeftsidebarComponent,
    RightsidebarComponent,
    PanelComponent,
    AddarticleComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: HttpClient,
      useFactory: httpClientFactory,
      deps: [XHRBackend, RequestOptions]
    },
    {
      provide: RequestOptions,
      useClass: DefaultRequestOptions
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
