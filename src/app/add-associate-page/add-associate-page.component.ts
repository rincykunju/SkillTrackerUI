import { Component, OnInit } from '@angular/core';
import { Associate } from '../Entities/Associate';
import { AssociateSkills } from '../Entities/AssociateSkills';
import { AssociateDetails } from '../Entities/AssociateDetails';
import {NgModule} from '@angular/core';
import {RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { AddassociateService } from '../Services/addassociate.service';
import { SkillSet } from '../Entities/SkillSet';
import { SkillService } from '../Services/skills.service';

@Component({
  selector: 'app-add-associate-page',
  templateUrl: './add-associate-page.component.html',
  styleUrls: ['./add-associate-page.component.css']
})
export class AddAssociatePageComponent implements OnInit {
  associateItem:Associate=new Associate();
  associateSkillsItem:AssociateSkills;
  AssociateSkillsList:AssociateSkills[];
  skillItem:SkillSet;
  SkillList:SkillSet[];
  associateDetails:AssociateDetails=new AssociateDetails();  
  message:String; 
  greenButtonStyle:string;
  blueButtonStyle:string;
  redButtonStyle:string;

  level1style:string;
  level2style:string;
  level3style:string;
  SelectedImage:any;
  private imageChanged:boolean=false;
  associateId:number;
  addFlag:boolean=false;
  isUpdate:boolean=false;
  title:string;
  skillNameRequired:any;
  ratingFound:boolean=false;
  
  constructor( private router:Router,private _service:AddassociateService,private _service1:SkillService,private route:ActivatedRoute) {
    this.associateId = this.route.snapshot.params["associateId"];
   
    if(this.associateId==0)
    {
      this.title="Skill Tracker : Add New Employee Skills";
      this.addFlag = true;
      this.SelectStatus(1, 0, 0);
      this.SelectLevel(1, 0, 0);
       
    }
    else
    {
      this.title="Skill Tracker : Update Employee Skills";
      this.addFlag = false;
      this.isUpdate=true;
      this.GetAssociateDetailsById();
    }
   
    this.AssociateSkillsList=new Array<AssociateSkills>();  
    
   
  }
   ngOnInit() {
    this.GetAllSkills();
    
    this.associateItem.AssociateId=0; 
  }
  SetValues()
  {
    this.SelectStatus(this.associateItem.statusGreen, this.associateItem.statusBlue, this.associateItem.statusRed);
    this.SelectLevel(this.associateItem.level1, this.associateItem.level2, this.associateItem.level3);
  }
  GetAssociateDetailsById()
  {
    this._service.GetAssociateDetails(this.associateId)
    .subscribe(e=>{this.associateDetails=e; this.associateItem=this.associateDetails.associate;this.AssociateSkillsList=this.associateDetails.associateSkills;this.SetValues();});
   
   
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
   
  AddAssociate()
  {       
    this.associateDetails.associate=this.associateItem;
    
    this.associateDetails.associateSkills=this.AssociateSkillsList;
  
    this._service.PostAssociate(this.associateDetails)
    .subscribe(s=>{this.message=s;this.router.navigate(['../dashboard'])});
  }
  UpdateAssociate()
  {
    this.associateDetails.associate=this.associateItem;
    
    this.associateDetails.associateSkills=this.AssociateSkillsList;
  
    this._service.PutAssociate(this.associateDetails)
    .subscribe(s=>{this.message=s;this.router.navigate(['../dashboard'])});
  }
  SetRating(skillItem:SkillSet,Rating:number)
  {
    this.ratingFound=false;
    this.associateSkillsItem=new AssociateSkills;
    for(let i=0;i<this.AssociateSkillsList.length;i++)
    {   
    if(this.AssociateSkillsList[i].associateId==this.associateItem.AssociateId && this.AssociateSkillsList[i].skillid==skillItem.skillid)
   {
    this.AssociateSkillsList[i].rating=Rating;
    this.ratingFound=true;
   }
  }
   if(!this.ratingFound)
   {
   
    this.associateSkillsItem.associateId=this.associateItem.AssociateId;
    this.associateSkillsItem.skillid=skillItem.skillid;
    this.associateSkillsItem.rating=Rating;
    this.AssociateSkillsList.push(this.associateSkillsItem);
    this.ratingFound=false;
   }
    
  }
  SelectStatus(green:number, blue:number, red:number)
  {
    this.associateItem.statusGreen=green;
    this.associateItem.statusBlue=blue;
    this.associateItem.statusRed=red;
    if(green){
      this.greenButtonStyle="5pt";
      this.blueButtonStyle="0pt";
      this.redButtonStyle="0pt";
    }
    else if(blue){
      this.greenButtonStyle="0pt";
      this.blueButtonStyle="5pt";
      this.redButtonStyle="0pt";
    }
    else{
      this.greenButtonStyle="0pt";
      this.blueButtonStyle="0pt";
      this.redButtonStyle="5pt";
    }
  }

  SelectLevel(level1:number, level2:number, level3:number)
  {
    this.associateItem.level1=level1;
    this.associateItem.level2=level2;
    this.associateItem.level3=level3;

    if(level1)
    {
      this.level1style="5pt";
      this.level2style="0pt";
      this.level3style="0pt";
    }
    else if(level2)
    {
      this.level1style="0pt";
      this.level2style="5pt";
      this.level3style="0pt";
    }
    else
    {
      this.level1style="0pt";
      this.level2style="0pt";
      this.level3style="5pt";
    }
  }
  ChangeImage(event)
  {
    let reader=new FileReader();
      if(event.target.files && event.target.files[0])
      {
        this.imageChanged=true;
      let file=event.target.files[0];
      reader.onload=()=>{
        this.SelectedImage=reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

}
