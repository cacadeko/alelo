import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TemplateRoutingModule } from './template-routing.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [ HomeComponent, MenuComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TemplateRoutingModule,
    RouterModule
  ]
})
export class TemplateModule { }
