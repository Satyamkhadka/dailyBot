import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';

import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DailyComponent } from './daily/daily.component';
import { environment } from '../environments/environment';
import { KnowledgebaseComponent } from './knowledgebase/knowledgebase.component';
import { TodoComponent } from './todo/todo.component';
import { LinkComponent } from './link/link.component';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    NavigationComponent,
    DailyComponent,
    KnowledgebaseComponent,
    TodoComponent,
    LinkComponent,
    SettingsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    routes,
    AngularFireAuthGuardModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
