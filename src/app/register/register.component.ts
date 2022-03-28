import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public signupForm !: FormGroup
  constructor(private formbuilder : FormBuilder,private http : HttpClient,private router : Router) { }

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      fullname:['',Validators.required],
      email:['',Validators.required],
      password: ['', [Validators.required,Validators.minLength(8),Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$")]]

    })
  }
  signUp(){
    this.http.post<any>("https://reqres.in/api/register",this.signupForm.value)
    .subscribe(res=>{
      alert("Signup Successfull");
      this.signupForm.reset();
      this.router.navigate(['login']);
    },err=>{
      alert("something went wrong")
    })
  }
}
