import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { DataGridComponent } from './Components/data-grid/data-grid.component';
import { DataHeirarchyComponent } from './Components/data-heirarchy/data-heirarchy.component'
//import { TestComponent } from './Components/test/test.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "data-grid", component: DataGridComponent },
  { path: "data-heirarchy", component: DataHeirarchyComponent },
  //{ path: "test", component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
