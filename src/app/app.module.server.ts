import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, routes } from './app-routing.module';

@NgModule({
  imports: [
    ServerModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule { }
