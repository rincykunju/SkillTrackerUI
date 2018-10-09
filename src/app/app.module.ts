import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {Http, HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { SkillsPageComponent } from './skills-page/skills-page.component';
import { SkillService } from './Services/skills.service';
import { AddassociateService } from './Services/addassociate.service';
import { SkillSet } from './Entities/SkillSet';
import { AddAssociatePageComponent } from './add-associate-page/add-associate-page.component';
import{DashboardComponent} from './dashboard/dashboard.component';
import {FilterPipe} from "./Pipes/filter.pipe";
import { ChartsModule } from 'ng2-charts/ng2-charts';

// import Chart from 'chart.js';


const routes:Routes=[
  
  {path:"skillpage", component:SkillsPageComponent},
  {path:"addassociate/:associateId", component:AddAssociatePageComponent},
  {path:"dashboard", component:DashboardComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    SkillsPageComponent,
    AddAssociatePageComponent,
    DashboardComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpModule,ChartsModule
  ],
  providers: [SkillService,AddassociateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
 