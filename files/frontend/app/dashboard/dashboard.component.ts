import { Component } from '@angular/core';

@Component({
  selector: 'my-dashboard',
  template: `
  <div class="row">
    <div class="col-md-12">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1>Dashboard</h1>
      </section>
      <!-- Main content -->
      <section class="content">
        <div class="box">
          <div class="box-body">
            <p>There is not mutch to see here for the time being...</p>
          </div>
        </div>
      </section>
      <!-- /.content -->
    </div>
  </div>
`
})
export class DashboardComponent { }
