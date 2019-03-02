import { Injectable } from '@angular/core'
import { Employee } from '../models/employee.model'
import { Observable, of, throwError } from 'rxjs';
import { delay, catchError } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'





@Injectable()
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }


  private listEmployees: Employee[] = [
    {
      id: 1,
      name: 'Mark',
      gender: 'Male',
      contactPreference: 'Email',
      email: 'mark@pragimtech.com',
      dateOfBirth: new Date('10/25/1988'),
      department: '101',
      isActive: true,
      photoPath: 'assets/images/mark.png'
    },
    {
      id: 2,
      name: 'Mary',
      gender: 'Female',
      contactPreference: 'PhoneNumber',
      phoneNumber: 2345978640,
      dateOfBirth: new Date('11/20/1979'),
      department: '102',
      isActive: true,
      photoPath: 'assets/images/mary.png'
    },
    {
      id: 3,
      name: 'John',
      gender: 'Male',
      contactPreference: 'PhoneNumber',
      phoneNumber: 5432978640,
      dateOfBirth: new Date('3/25/1976'),
      department: '103',
      isActive: false,
      photoPath: 'assets/images/john.png'
    },
  ];

  baseUrl = 'http://localhost:3000/employees';
  getEmployees(): Observable<Employee[]> {
    // DATA FROM HARD CODED ARRAY
    //return of(this.listEmployees).pipe(delay(2000));

    // DATA FROM REST API
    return this.httpClient.get<Employee[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }
  getEmployee(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
  }
  addEmployee(employee: Employee): Observable<Employee> {
    //if (employee.id === null) {
    // reduce() method reduces the array to a single value. This method executes
    // the provided function for each element of the array (from left-to-right)
    // When we implement the server side service to save data to the database
    // table, we do not have to compute the id, as the server will assing it
    // const maxId = this.listEmployees.reduce(function (e1, e2) {
    //   return (e1.id > e2.id) ? e1 : e2;
    // }).id;
    // employee.id = maxId + 1;

    // this.listEmployees.push(employee);
    console.log(employee);
    return this.httpClient.post<Employee>(this.baseUrl, employee, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }).pipe(catchError(this.handleError));
    //} else {
    //  const foundIndex = this.listEmployees.findIndex(e => e.id === employee.id);
    //  this.listEmployees[foundIndex] = employee;
    // }

  }
  updateEmployee(employee: Employee): Observable<void> {

    return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }).pipe(catchError(this.handleError));

  }
  deleteEmpoyee(id: number) {
    // const i = this.listEmployees.findIndex(e => e.id === id);
    // if (i != -1) {
    //   this.listEmployees.splice(i, 1);
    // }
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
    .pipe(catchError(this.handleError));
  }
  handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.log('Client Side Error : ', errorResponse.error.message);
    }
    else {
      console.log('Server Side Error : ', errorResponse.error);
    }
    return throwError('There is a problem with the service. We are notified and working on it. Please try again later');
  }
}