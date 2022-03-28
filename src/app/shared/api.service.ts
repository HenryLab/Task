import { Injectable } from '@angular/core';
import {  HttpClient} from '@angular/common/http'
import { map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postEmploye(data:any){
    return this.http.post<any>("https://reqres.in/api/users",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getEmployee(){
    return this.http.get<any>("https://reqres.in/api/users/2")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getDelayResponse(){
    return this.http.get<any>("https://reqres.in/api/users?page=2")
    .pipe(map((res:any)=>{
      return res;
   }));
  }

 getAllEmployee(){
   return this.http.get<any>("https://reqres.in/api/users?page=2")
   .pipe(map((res:any)=>{
     return res;
  }));
 }
  updateEmployee(data:any,id:number){
    return this.http.put<any>("https://reqres.in/api/users/2"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateEmployees(data:any,id:number){
    return this.http.patch<any>("https://reqres.in/api/users/2"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteEmployee(id:number){
    return this.http.delete<any>("https://reqres.in/api/users/2"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }


}
