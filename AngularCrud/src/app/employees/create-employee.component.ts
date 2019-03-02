import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department.model';
import { DatepickerConfig, BsDatepickerConfig } from 'ngx-bootstrap/datepicker'
import { Employee } from '../models/employee.model'
import { EmployeeService } from '../employees/employee.service'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  //gender ="male";
  isActive = true;
  photoPreview = false;
  @ViewChild('employeeForm') public employeeCreateForm: NgForm;
  department = "102"
  panelTitle: string;

  datePickerConfig: Partial<BsDatepickerConfig>;
  employee: Employee;
  departments: Department[] = [
    { id: 101, name: "HelpDesk" },
    { id: 102, name: "IT" },
    { id: 103, name: "HR" },
    { id: 104, name: "Payroll" },
    { id: 105, name: "Admin" }
  ];

  constructor(private _employeeService: EmployeeService, private _router: Router, private _activatedRoute: ActivatedRoute) {
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
    this._activatedRoute.paramMap.subscribe((parameterMap) => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });
  }
  getEmployee(id: number) {
    if (id == 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        email: null,
        phoneNumber: null,
        contactPreference: null,
        dateOfBirth: null,
        department: null,
        isActive: null,
        photoPath: null,
      };
      this.employeeCreateForm.reset();
      this.panelTitle = "Create Employee";
    }
    else {
      //this.employee = Object.assign({}, this._employeeService.getEmployee(id));
      this._employeeService.getEmployee(id).subscribe(
        (employee) => this.employee = employee,
        (err: any) => console.log(err)
      );
      this.panelTitle = "Edit Employee";
    }
  }
  saveEmployee(empForm: NgForm): void {
    console.log(empForm);
  }
  saveEmployeee(): void {
    //const newEmployee:Employee =Object.assign({},this.employee);
    if (this.employee.id == null) {
      this._employeeService.addEmployee(this.employee).subscribe(
        (data: Employee) => {
          console.log(data);
          this.employeeCreateForm.reset({ contactPreference: 'phone' });
          this._router.navigate(['list']);
        },
        (error: any) => { console.log(error) }
      );
    }
    else {
      this._employeeService.updateEmployee(this.employee).subscribe(
        () => {
          this.employeeCreateForm.reset({ contactPreference: 'phone' });
          this._router.navigate(['list']);
        },
        (error: any) => { console.log(error) }
      );
    }
  }
  preview(): void {
    this.photoPreview = !this.photoPreview;

  }
}
