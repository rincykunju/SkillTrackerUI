import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map}from 'rxjs/operators';
import {Http, Response, HttpModule} from '@angular/http';
import { Associate } from '../Entities/Associate';
import { AssociateSkills } from '../Entities/AssociateSkills';
import { DashboardS } from '../Entities/Dashboard';
import { AssociateDetails } from '../Entities/AssociateDetails';

@Injectable()
export class AddassociateService {apiurl:string = "http://localhost:7696/api/";
constructor(private _http:Http) { }

PostAssociate(associateDetails:AssociateDetails):Observable<String>
{
  return this._http.post(this.apiurl + "skills/AddAssociate",associateDetails )
  .pipe(map((response:Response)=><string>response.json()));
}
PutAssociate(associateDetails:AssociateDetails):Observable<String>
{
  return this._http.put(this.apiurl + "skills/UpdateAssociate",associateDetails )
  .pipe(map((response:Response)=><string>response.json()));
}
GetAssociateDetails(associateId:number)
{
  return this._http.get(this.apiurl + "skills/GetAssociateDetails?associateId="+associateId )
  .pipe(map((response:Response)=><AssociateDetails>response.json()));
}
GetAllAssociateDetails()
{
  return this._http.get(this.apiurl + "skills/GetAllAssociates" )
  .pipe(map((response:Response)=><AssociateDetails[]>response.json()));
}
DeleteAssociateDetails(associateId:number):Observable<string>
  {
    return this._http.delete(this.apiurl + "skills/DeleteAssociateDetails?associateid="+associateId)
    .pipe(map((response:Response)=><string>response.json()));
  }
  GetDashboardStatistics():Observable<DashboardS[]>
  {
    return this._http.get(this.apiurl + "skills/GetDashboardStatistics")
    .pipe(map((response:Response)=><DashboardS[]>response.json()));
  }


}
