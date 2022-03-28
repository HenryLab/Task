import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup
  constructor(private formbuilder: FormBuilder,private http : HttpClient,private router : Router) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({

      email:['',Validators.required],
      password: ['', [Validators.required,Validators.minLength(7),Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$")]]

    })
  }
  login(){
   this.http.post<any>("https://reqres.in/api/login",this.loginForm.value)
.subscribe(res=>{
  alert("login Successfull");
  this.loginForm.reset();
  this.router.navigate(['dashboard']);
},err=>{
  alert("something went wrong")
})
  }
}
