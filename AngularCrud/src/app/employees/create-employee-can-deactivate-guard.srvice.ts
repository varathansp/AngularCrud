import { CanDeactivate } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee.component';

export class createEmployeeCanDeactivateGuardService implements CanDeactivate<CreateEmployeeComponent>{
    canDeactivate(component: CreateEmployeeComponent):  boolean {
        if(component.employeeCreateForm.dirty){
            return confirm('Are you sure you want to discard your changes');
        }
        return true;
    }
}