import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-add-edit-student',
  templateUrl: './add-edit-student.component.html',
  styleUrls: ['./add-edit-student.component.scss']
})
export class AddEditStudentComponent {
  @Input() student: any;
  @Output() close = new EventEmitter();
  public formTitle: string = ""; 

  constructor(private studentService: StudentService,
    private toastr: ToastrService) { }

  ngOnInit() {
    if (this.student) {
      this.formTitle = "Edit"
      this.studentForm.patchValue(this.student)
    } else {
      this.formTitle = "Add"
    }
  }

  public studentForm = new FormGroup({
    firstName: new FormControl("", [Validators.required, Validators.maxLength(50), Validators.minLength(2), Validators.pattern(/^[A-Za-z]+$/)]),
    lastName: new FormControl("", [Validators.required, Validators.maxLength(50), Validators.minLength(2), Validators.pattern(/^[A-Za-z]+$/)]),
    mobile: new FormControl("", [Validators.required, Validators.pattern(/^\d{10}$/)]),
    email: new FormControl("", [Validators.required, Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)]),
    gender: new FormControl("", Validators.required,),
    division: new FormControl("", Validators.required,),
  })

  public onClose(): void {
    this.close.emit()
  }

  public save(): void {
    let payload: any = this.assignValueToModel();
    if (!this.student) {
      this.addStudent(payload);
    } else {
      console.log(payload)
      this.updateStudent(payload)
    }
  }

  public addStudent(payload: any): void {
    this.studentService.addStudent(payload).subscribe((response: any) => {
      this.toastr.success('Student Added Successfully', 'Added')
      this.onClose();
    }, (error: any) => {
      this.toastr.error('Error while adding student', 'Error')
    }
    )
  }

  public updateStudent(payload: any): void {
    this.studentService.updateStudent(payload).subscribe((response: any) => {
      this.toastr.success('Student Updated Successfully', 'Updated')
      this.onClose();
    }, (error: any) => {
      this.toastr.error('Error while updating student', 'Error')
    });
  }

  private assignValueToModel(): any {
    let student = {
      'id': this.student ? this.student.id : 0,
      'firstName': this.studentForm.get('firstName')?.value,
      'lastName': this.studentForm.get('lastName')?.value,
      'gender': this.studentForm.get('gender')?.value,
      'division': this.studentForm.get('division')?.value,
      'mobile': this.studentForm.get('mobile')?.value,
      'email': this.studentForm.get('email')?.value,
    };
    return student;
  }

  public checkIfControlValid(controlName: string): any {
    // debugger
    console.log("Control name", controlName ,this.studentForm.get(controlName)?.invalid &&
    this.studentForm.get(controlName)?.errors &&
    (this.studentForm.get(controlName)?.dirty || this.studentForm.get(controlName)?.touched))

    return this.studentForm.get(controlName)?.invalid &&
    this.studentForm.get(controlName)?.errors &&
    (this.studentForm.get(controlName)?.dirty || this.studentForm.get(controlName)?.touched);
  }

  public checkControlHasError(controlName: string, error: string): any {
    // debugger
    console.log("Control name", controlName ,"Error: ",error,this.studentForm.get(controlName)?.hasError(error))
    return this.studentForm.get(controlName)?.hasError(error)
  }
}
