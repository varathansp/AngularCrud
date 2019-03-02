import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../employees/employee.service'
import { Router, ActivatedRoute } from '@angular/router'
import { ResolvedEmployeeList } from './rosolved-employeelist.model';

@Component({
  // selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {


  employees: Employee[];
  filteredEmployees:Employee[];
  dataFromChild: Employee;
  error:string;
  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }
  filterEmployees(searchString :string){
    return this.employees.filter(employee =>
      employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }
  constructor(private _employeeService: EmployeeService, private _router: Router,private _activatedRoute :ActivatedRoute) {
   const resolvedEmployeeList:ResolvedEmployeeList= this._activatedRoute.snapshot.data['employeeList'];
   if(resolvedEmployeeList.error==null){
     this.employees=resolvedEmployeeList.employeeList;
   }
   else{
     this.error=resolvedEmployeeList.error;
   }
   if(this._activatedRoute.snapshot.queryParamMap.has('searchTerm')){
    this.searchTerm = this._activatedRoute.snapshot.queryParamMap.get('searchTerm');
  }
  else{
    this.filteredEmployees=this.employees;
  }  
  }

  ngOnInit() {

    //FETCHING USING SERVICE WITH DELAY
    // this._employeeService.getEmployees().subscribe((empList)=>{
    //   this.employees=empList;
    //   if(this._activatedRoute.snapshot.queryParamMap.has('searchTerm')){
    //     this.searchTerm = this._activatedRoute.snapshot.queryParamMap.get('searchTerm');
    //   }
    //   else{
    //     this.filteredEmployees=this.employees;
    //   }  
    // });

    //QUERY PARAMETER
    //this.employeeToDisplay=this.employees[0]; 
    
    // console.log(this._activatedRoute.snapshot.queryParamMap.has('searchTerm'));
    // console.log(this._activatedRoute.snapshot.queryParamMap.get('searchTerm'));
    // console.log(this._activatedRoute.snapshot.queryParamMap.getAll('searchTerm'));
    // console.log(this._activatedRoute.snapshot.queryParamMap.keys);
  }

  //   employeeToDisplay:Employee;
  //   private arrayIndex=1;
  //   nextEmployee():void{
  // if(this.arrayIndex<=2){
  //   this.employeeToDisplay=this.employees[this.arrayIndex];
  //   this.arrayIndex++;

  // }
  // else{
  // this.employeeToDisplay=this.employees[0];
  // this.arrayIndex=1;
  // }
  //   }
  handleNotify(eventData: Employee) {
    this.dataFromChild = eventData;
  }
  onDeleteNotification(id:number){
    const i=this.filteredEmployees.findIndex(e=>e.id===id);
  if(i !=-1){
    this.filteredEmployees.splice(i,1);
  }
  }
}
