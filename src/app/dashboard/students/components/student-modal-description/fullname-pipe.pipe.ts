import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../../../../core/models/student.model';

@Pipe({
  name: 'fullnamePipe'
})
export class FullnamePipePipe implements PipeTransform {

  transform(value: Student): string {
    return  ' ' + value.firstName  +  ' ' + value.lastName ;
  }
  

}
