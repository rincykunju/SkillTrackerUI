import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map}from 'rxjs/operators';
import {Http, Response, HttpModule} from '@angular/http';
import { SkillSet } from '../Entities/SkillSet';


@Injectable()
export class SkillService {

  apiurl:string = "http://localhost:7696/api/";
  constructor(private _http:Http) { }

  GetAllSkills():Observable<SkillSet[]>
  {
    return this._http.get(this.apiurl + "skills/GetAllSkills")
    .pipe(map((response:Response)=><SkillSet[]>response.json()));
  }
  PostSkill(skillItem:SkillSet):Observable<String>
  {
    return this._http.post(this.apiurl + "skills/AddSkills", skillItem)
    .pipe(map((response:Response)=><string>response.json()));
  }

  PutSkill(skillItem:SkillSet):Observable<string>
  {
    return this._http.put(this.apiurl + "skills/UpdateSkills", skillItem)
   .pipe(map((response:Response)=><string>response.json()));
  }
  DeleteSkill(skillid:number):Observable<string>
  {
    return this._http.delete(this.apiurl + "skills/DeleteSkills?skillid="+skillid)
    .pipe(map((response:Response)=><string>response.json()));
  }

}