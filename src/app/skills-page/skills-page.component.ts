import { Component, OnInit } from '@angular/core';
import { SkillSet } from '../Entities/SkillSet';
import {NgModule} from '@angular/core';
import {RouterModule, Routes, Router } from '@angular/router';
import { SkillService } from '../Services/skills.service';

@Component({
  selector: 'app-skills-page',
  templateUrl: './skills-page.component.html',
  styleUrls: ['./skills-page.component.css']
})
export class SkillsPageComponent implements OnInit {

  addFlag:boolean;
  skillItem:SkillSet;
  SkillList:SkillSet[];
  message:String; 
  constructor(private router:Router, private _service:SkillService) {
    this.skillItem=new SkillSet();
   }

  ngOnInit() {
    this.addFlag=true;
    this.GetAllSkills();
  }
  GetAllSkills()
  {
    this._service.GetAllSkills()
    .subscribe(s=>this.SkillList=s);
  }
  AddSkill()
  {
    this.skillItem.skillid=0;
    this._service.PostSkill(this.skillItem)
    .subscribe(s=>{this.message=s;this.GetAllSkills();this.skillItem.skillname=''});
  };

  UpdateSkill()
  {
    this._service.PutSkill(this.skillItem)
    .subscribe(s=>{this.message=s;this.GetAllSkills();});
    this.addFlag=true;
  }
  
  DeleteSkill(item:SkillSet)
  {
    this._service.DeleteSkill(item.skillid)
    .subscribe(s=>{this.message=s;this.GetAllSkills();});
  }

  EditClicked(item:SkillSet)
  {
    
    this.addFlag=false;
    this.skillItem=item;
  }

  CancelClicked()
  {
    this.addFlag=true;
  }

}
