import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department.model';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  //gender ="male";
  isActive=true;
  department="102"

  departments:Department[]=[
    {id:101,name:"Help Desk"},
    {id:102,name:"IT"},
    {id:103,name:"HR"},
    {id:104,name:"Payroll"},
    {id:105,name:"Admin"}
  ];

  constructor() { }

  ngOnInit() {
  
  }
saveEmployee(empForm:NgForm):void{
  console.log(empForm);
}
}
