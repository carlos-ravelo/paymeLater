import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClientesService } from './servicios/clientes.service'
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { AppComponent } from './app.component';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';
import { DetalleClienteComponent } from './components/detalle-cliente/detalle-cliente.component';
import { ListaPrestamosComponent } from './components/lista-prestamos/lista-prestamos.component';
import { AppRoutingModule } from './app-routing.module';
import { DetallePrestamoComponent } from './components/detalle-prestamo/detalle-prestamo.component';

//HTTP suport
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './clases/InMemoryDataService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormClientesComponent } from './components/form-clientes/form-clientes.component';
import { FormPrestamosComponent } from './components/form-prestamos/form-prestamos.component';
import { FormMovimientoComponent } from './components/form-movimiento/form-movimiento.component';
import { MenusComponent } from './components/menus/menus.component';
import { LoginComponent } from './components/login/login.component';
import { MovimientosPorPrestamoComponent } from './components/movimientos-por-prestamo/movimientos-por-prestamo.component';

//Firebase
import { DataFirebaseService } from './servicios/data-firebase.service'
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
import { CanActivateviaAuthGuardService } from './servicios/can-activatevia-auth-guard.service'

//NGX-Bootstrap
import { AlertModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';

//Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { ModificarMovimientoComponent } from './components/modificar-movimiento/modificar-movimiento.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { AmortizacionComponent } from './components/amortizacion/amortizacion.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material'
import { MatProgressBarModule } from '@angular/material/progress-bar';



//Moment y  MatDatepicker
import * as Date from 'datejs'
import { MatDatepicker, MatDatepickerModule } from '@angular/material';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter'
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


import { FuncionesComunesService } from './servicios/funciones-comunes.service';
import { CargandoComponent } from './components/cargando/cargando.component'


@NgModule({
  declarations: [
    AppComponent,
    ListaClientesComponent,
    DetalleClienteComponent,
    ListaPrestamosComponent,
    DetallePrestamoComponent,
    FormClientesComponent,
    FormPrestamosComponent,
    FormMovimientoComponent,
    MenusComponent,
    LoginComponent,
    MovimientosPorPrestamoComponent,
    ModificarMovimientoComponent,
    AmortizacionComponent,
    CargandoComponent,

  ],
  entryComponents: [
    ModificarMovimientoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false },
    ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AlertModule.forRoot(), ModalModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule, //Angular Material Inputs
    MatIconModule,
    MatToolbarModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSidenavModule,
    MatDividerModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    MatGridListModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatProgressBarModule,

  ],
  providers: [ClientesService, AngularFireModule, DataFirebaseService, CurrencyPipe, DatePipe, AngularFireAuth,
    CanActivateviaAuthGuardService, { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }, FuncionesComunesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
