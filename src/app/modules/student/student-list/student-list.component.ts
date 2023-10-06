import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { StudentService } from 'src/app/shared/services/student.service';
import { AddEditStudentComponent } from '../add-edit-student/add-edit-student.component';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from 'src/app/shared/components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent {

  public totalCount = 0;
  public students: any[] = [];
  public addEditStdentModal!: BsModalRef;
  public deleteStudentModal!: BsModalRef;

  constructor(private studentService: StudentService,
    private modalService: BsModalService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.loadStudents()
  }

  private loadStudents(): void {
    this.studentService.getStudents().subscribe((response: any) => {
      this.students = response;
      this.totalCount = this.students.length;
    })
  }

  public openAddEditStudentModal(student: any = null): void {
    this.addEditStdentModal = this.modalService.show(AddEditStudentComponent, {
      initialState: { student: student }, class: 'modal-lg',
      ignoreBackdropClick: true
    });

    this.addEditStdentModal.content.close.subscribe(() => {
      this.addEditStdentModal.hide();
      this.loadStudents();
    })
  }

  public openDeleteEmployeeModal (employee: any) : void {
    this.deleteStudentModal = this.modalService.show(DeleteModalComponent, {
      class: '',
      ignoreBackdropClick: true
    });

    this.deleteStudentModal.content.close.subscribe(() => {
      this.deleteStudentModal.hide();
    });

    this.deleteStudentModal.content.confirmedDelete.subscribe(() => {
      this.studentService.deleteStudent(employee.id).subscribe((response: any) => {
        this.toastr.success('Employee deleted successfully', 'Success');
      }, (error: any) => {
        this.toastr.error('Error deleting employee', 'Error');
      });
      this.deleteStudentModal.hide();
      this.loadStudents();
    });    
  }
}
