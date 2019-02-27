import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department.model';
import { DatepickerConfig, BsDatepickerConfig } from 'ngx-bootstrap/datepicker'
import {Employee} from '../models/employee.model'
import { EmployeeService} from '../employees/employee.service'
import { Router} from '@angular/router'

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  //gender ="male";
  isActive=true;
  photoPreview=false;
 
  department="102"

 datePickerConfig:Partial<BsDatepickerConfig>;
 employee:Employee={
  id:null,
  name:null,
  gender:null,
  email:null,
  phoneNumber:null,
  contactPreference:null,
  dateOfBirth:null,
  department:null,
  isActive:null,
  photoPath:null,
 }
  departments:Department[]=[
    {id:101,name:"HelpDesk"},
    {id:102,name:"IT"},
    {id:103,name:"HR"},
    {id:104,name:"Payroll"},
    {id:105,name:"Admin"}
  ];

  constructor(private _employeeService:EmployeeService,private _router:Router) { 
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        minDate: new Date(2018, 0, 1),
        maxDate: new Date(2018, 11, 31),
        dateInputFormat: 'DD/MM/YYYY'
      });
  }

  ngOnInit() {
  
  }
saveEmployee(empForm:NgForm):void{
  console.log(empForm);
}
saveEmployeee(): void {
  
  this._employeeService.save(this.employee);
  
  this._router.navigate(['list']);
} 
preview():void{
  this.photoPreview=!this.photoPreview;
 
}
}
