import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LaunchDetailsPageComponent } from './launch-details-page/launch-details-page.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TooManyRequestsComponent } from './too-many-requests/too-many-requests.component';


const routes: Routes = [{
  path: 'home',
  component: HomeComponent
},{
  path: '',
  component: HomeComponent
},
{
  path: '404',
  component: NotFoundComponent,
},
{
  path: '429',
  component: TooManyRequestsComponent,
},
{
  path: 'launchDetails/:id',
  component: LaunchDetailsPageComponent,
}
];

@NgModule({
  declarations: [
    AppComponent,
    LaunchDetailsPageComponent,
    HomeComponent,
    NotFoundComponent,
    TooManyRequestsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatListModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
