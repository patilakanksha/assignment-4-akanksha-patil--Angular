import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ModalModule } from "ngx-bootstrap/modal";
import { ToastrModule } from "ngx-toastr";
import { DashboardComponent } from "./dashboard.component";
import { StudentListComponent } from "../student/student-list/student-list.component";
import { AuthGuard } from "src/app/shared/helper/auth.guard";
import { AddEditStudentComponent } from "../student/add-edit-student/add-edit-student.component";
import { DeleteModalComponent } from "src/app/shared/components/delete-modal/delete-modal.component";
import { HomeComponent } from './home/home.component';

const dashboardRoutes: Routes = [{
  path:'dashboard',
  component: DashboardComponent,
  children: [
    { path: 'home', component: HomeComponent,  canActivate:[AuthGuard]},
  { path: 'students', component: StudentListComponent,  canActivate:[AuthGuard]},
  ], canActivate:[AuthGuard]
}];

@NgModule({
  declarations: [
    StudentListComponent,
    AddEditStudentComponent,
    DeleteModalComponent,
    HomeComponent
  ],
  imports: [
    RouterModule.forChild(dashboardRoutes),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    CommonModule
  ],
  exports: [RouterModule]
})
export class DashboardModule { }