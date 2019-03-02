import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Employee } from '../models/employee.model'
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';


@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit, OnChanges {


  @Input() employee: Employee;
  @Input() searchTerm: string;
  @Output() notify: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output() notifyDelete:EventEmitter<number>=new EventEmitter<number>();
  confirmDelete=false;
  isHidden=false;
  private _selectedEmployeeId: number;
  constructor(private _activatedRoute: ActivatedRoute, private _router: Router,
    private _employeeService:EmployeeService) { }

  ngOnInit() {
    this._selectedEmployeeId = +this._activatedRoute.snapshot.paramMap.get('id');

  }
  ngOnChanges(change: SimpleChanges) {
    // const previousEmployee = <Employee>change.employee.previousValue;
    // const currentEmployee = <Employee>change.employee.currentValue;
    //console.log('ngOnCHange triggered');
    // console.log('Previous : ' + (previousEmployee ? previousEmployee.name : 'NULL') );
    // console.log('Current : ' + currentEmployee.name);
  }
  handleClick() {
    this.notify.emit(this.employee);
  }

  viewEmployee() {

    this._router.navigate(['/employee', this.employee.id], { queryParams: { 'searchTerm': this.searchTerm } });
  }
  editEmployee(){

    this._router.navigate(['/edit', this.employee.id]);
  }
  deleteEmployee(){
    this._employeeService.deleteEmpoyee(this.employee.id).subscribe(
      ()=>{console.log(`employee with id ${this.employee.id} is deleted`)},
      (err)=>{console.log(err)}
    );
    this.notifyDelete.emit(this.employee.id)
  }

}
