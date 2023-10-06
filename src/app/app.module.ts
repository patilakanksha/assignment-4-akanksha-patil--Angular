import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/ui/header/header.component';
import { FooterComponent } from './modules/ui/footer/footer.component';
import { SidebarComponent } from './modules/ui/sidebar/sidebar.component';
import { StudentListComponent } from './modules/student/student-list/student-list.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { AddEditStudentComponent } from './modules/student/add-edit-student/add-edit-student.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DeleteModalComponent } from './shared/components/delete-modal/delete-modal.component';
import { LoginComponent } from './modules/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import {DashboardModule} from './modules/dashboard/dashboard.module'

const dashboardModule = () => import('./modules/dashboard/dashboard.module').then(x=>x.DashboardModule)

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {path: 'dashboard', children:[{path: '', loadChildren: dashboardModule}]}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    RouterModule.forRoot(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


