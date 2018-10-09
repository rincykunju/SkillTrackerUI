import { Component, OnInit } from '@angular/core';
import { AssociateDetails } from '../Entities/AssociateDetails';
import { AddassociateService } from '../Services/addassociate.service';
import { SkillSet } from '../Entities/SkillSet';
import { SkillService } from '../Services/skills.service';   
import {FilterPipe} from "../Pipes/filter.pipe";
import {RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { AssociateSkills } from '../Entities/AssociateSkills';
import { DashboardS } from '../Entities/Dashboard';
// import Chart from 'chart.js';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  associateList:AssociateDetails[];
  message:string;
  searchname:string;
  associateItem:AssociateDetails;
  SkillList:SkillSet[];
  associateSkillsItem:AssociateSkills;
  AssociateSkillsList:AssociateSkills[];
   public labels:string[]=[];
   public chartData:number[]=[];
   dashboard:DashboardS[];
   ChartLegend:boolean=true;
   public lineChartOptions:any = {
    responsive: true
    };
   chartType:string="bar";

   TotalAssociates:number;
   Level1EmpPerc:number=0;
   Level2EmpPerc:number=0;
    Level3EmpPerc:number=0;
    GreenEmpPerc:number=0;
    BlueEmpPerc:number=0;
    RedEmpPerc:number=0;
    skills:string;


  constructor(private router:Router, private _service:AddassociateService,private _service1:SkillService,private route:ActivatedRoute) {

   }

  ngOnInit() {
    this.GetAssociateDetails();
    this._service.GetDashboardStatistics()
    .subscribe(d=>{this.dashboard=d;this.SetChart();})
    this.GetAllSkills();
    this.skills='';
    
  }
  SetChart()
  {
    for(let i=0;i<this.dashboard.length;i++)
    {
      this.labels.push(this.dashboard[i].skillname);
      this.chartData.push(this.dashboard[i].skillcount);
    }

  }

  public chartClicked(e:any):void { 
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  GetAssociateDetails()
  {
    this._service.GetAllAssociateDetails()
    .subscribe(a=>{this.associateList=a;this.SetStatistics()});                                                           
    
  }
  EditClicked(item:AssociateDetails)
  {
    this.router.navigate(['./addassociate/:', item.associate.AssociateId]);
  }
  DeleteClicked(associateID:number)
  {
    this._service.DeleteAssociateDetails(associateID)
    .subscribe(e=>{this.message=e;this.GetAssociateDetails();})
  }
  GetAllSkills()
  {
    this._service1.GetAllSkills()
    .subscribe(s=>this.SkillList=s);
  }
  skillName(requiredId:number)
  {
   // return this.SkillList.forEach(skillItem => { if(skillItem.skillid == requiredId) return skillItem.skillname})
  // console.log(this.SkillList.find(skillItem => skillItem.skillid == requiredId).skillname);
   return this.SkillList.find(skillItem => skillItem.skillid === requiredId).skillname;
  }
  getskillnames(associateskills:AssociateSkills[])
  {
    this.skills='';
    for(let i=0;i<associateskills.length;i++)
    {  
      
      this.skills += this.skillName(associateskills[i].skillid ) + ', ';
    }
    return this.skills;
  }
  SetStatistics()
  {
    this.TotalAssociates = this.associateList.length
    let Level1Emp = 0, Level2Emp=0,Level3Emp=0;
    let BlueEmp=0,GreenEmp=0,RedEmp=0;
    for(let i=0;i<this.associateList.length;i++)
    {
      if(this.associateList[i].associate.level1==1)
        Level1Emp++;
      if(this.associateList[i].associate.level2==1)
        Level2Emp++;
      if(this.associateList[i].associate.level3==1)
        Level3Emp++;

      if(this.associateList[i].associate.statusBlue==1)
        BlueEmp++;
      if(this.associateList[i].associate.statusGreen==1)
        GreenEmp++;
      if(this.associateList[i].associate.statusRed==1)
        RedEmp++;
    }
    this.Level1EmpPerc = Math.round(Level1Emp/this.TotalAssociates*100);
    this.Level2EmpPerc = Math.round(Level2Emp/this.TotalAssociates*100);
    this.Level3EmpPerc = Math.round(Level3Emp/this.TotalAssociates*100);
    this.BlueEmpPerc = Math.round(BlueEmp/this.TotalAssociates*100);
    this.GreenEmpPerc = Math.round(GreenEmp/this.TotalAssociates*100);
    this.RedEmpPerc = Math.round(RedEmp/this.TotalAssociates*100);

  } 
} 
