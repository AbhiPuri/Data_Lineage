import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataGridComponent } from './Components/data-grid/data-grid.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { DataHeirarchyComponent } from './Components/data-heirarchy/data-heirarchy.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { OverviewComponent } from './Components/overview/overview.component';
import { NestedTreeHeirarchyComponent } from './Components/data-heirarchy/nested-tree-heirarchy/nested-tree-heirarchy.component';
import { TreeLoaderComponent } from './Components/data-heirarchy/tree-loader/tree-loader.component';
import { CommonModule } from "@angular/common";
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from "ngx-toastr";
import { LoginComponent } from './Components/login/login.component';

//import { UiSwitchModule } from 'ngx-toggle-switch';
//import { TestComponent } from './Components/test/test.component';

//import { MatTabsModule } from '@angular/material/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
//import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DataGridComponent,
    DataHeirarchyComponent,
    OverviewComponent,
    NestedTreeHeirarchyComponent,
    TreeLoaderComponent,
    LoginComponent,
    //TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    //MatTabsModule,
    NgMultiSelectDropDownModule.forRoot(),
    FontAwesomeModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    ClipboardModule,
    CommonModule,
    MatTreeModule,
    MatIconModule,
    NgSelectModule,
    ToastrModule.forRoot(
      {
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
        closeButton: true,
      }
    )
    //UiSwitchModule,
    //MatSlideToggleModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
