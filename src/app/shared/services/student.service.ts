import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  public getStudents():any{
    return this.httpClient.get(`http://localhost:8000/students`);
  }

  public addStudent(student:any):any{
    return this.httpClient.post(`http://localhost:8000/students`, student);
  }

  public updateStudent(student:any):any{
    return this.httpClient.put(`http://localhost:8000/students/${student.id}`, student)
  }

  public deleteStudent(studentId:any):any{
    return this.httpClient.delete(`http://localhost:8000/students/${studentId}`)
  }
}
