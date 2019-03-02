import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Employee } from '../models/employee.model';
import { Observable, of } from 'rxjs';
import { EmployeeService } from './employee.service';
import { Injectable } from '@angular/core';
import { ResolvedEmployeeList } from './rosolved-employeelist.model';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class EmployeeListResolverService implements Resolve<ResolvedEmployeeList>{
    constructor(private _employeeService:EmployeeService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedEmployeeList>{
        // RESOLVER NEED NOT TO SUBSCRIBE TO THE METHOD .BECAUSE RESOLVER WILL DO ITSELF. IF IT IS IN 
        //A COMPONENT WE HAVE TO SUBSCRIBE EXPLICITLY
        return this._employeeService.getEmployees()
        .pipe(
            map((employeeList)=>new ResolvedEmployeeList(employeeList)),
            catchError((err:any)=>of(new ResolvedEmployeeList(null,err)))
            );
    }
}