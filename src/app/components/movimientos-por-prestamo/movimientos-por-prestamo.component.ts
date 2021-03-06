import { Component, OnInit, ViewEncapsulation, Input, TemplateRef, Inject, ViewChild, SimpleChanges } from '@angular/core';
import { Prestamo } from '../../clases/cliente'
import { Movimiento } from '../../clases/cliente'
import { ClientesService } from '../../servicios/clientes.service';
import { DataFirebaseService } from '../../servicios/data-firebase.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormMovimientoComponent } from '../form-movimiento/form-movimiento.component';
import { ModificarMovimientoComponent } from '../modificar-movimiento/modificar-movimiento.component';
import { FuncionesComunesService } from '../../servicios/funciones-comunes.service';

declare var $: any;
declare var jQuery: any;


@Component({
  selector: 'app-movimientos-por-prestamo',
  templateUrl: './movimientos-por-prestamo.component.html',
  styleUrls: ['./movimientos-por-prestamo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MovimientosPorPrestamoComponent implements OnInit {
  @Input() prestamo: Prestamo;
  listaMovimientos: any[];
  movimientoActual: Movimiento;
  tipoMovimiento: string;
  createFormMovimientos: boolean;
  displayedColumns = ['tipoMovimiento', 'fechaTrasaccion', 'interesDelPago', 'capitalDelPago', 'montoPrestado'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private db: DataFirebaseService, private clientesService: ClientesService,
    public dialog: MatDialog, private funcionesComunes: FuncionesComunesService) { }
  ngOnInit() {
    this.obtenerListaMovimientos();
    this.createFormMovimientos = false;
  }
  ngOnChanges() {
    // this.obtenerListaMovimientos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openInsertarMovimiento(tipoMovimiento: String): void {
    let dialogRef = this.dialog.open(FormMovimientoComponent, {
      // width: '250px',
      data: { prestamo: this.prestamo, tipoMovimiento: tipoMovimiento }
    });
  }
  openModificarMovimiento(): void {
    let dialogRef = this.dialog.open(ModificarMovimientoComponent, {
      // width: '250px',
      data: { movimientoActual: this.movimientoActual }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.actualizarPrestamo();
      }
      console.log(result);
    });
  }

  seleccionarTipoMov(tipo: string) {
    this.tipoMovimiento = tipo;
    this.createFormMovimientos = true;
  }
  cambiarTipoMovimiento(evento) {
    this.tipoMovimiento = evento
  }

  borrarMovimiento() {
    if (this.movimientoActual.tipoMovimiento == 'inicial') {
      alert("no puede borrar el movimiento inicial");
      return
    }
    this.db.borrarMovimiento(this.movimientoActual.id);
    this.movimientoActual = this.listaMovimientos[0];
    this.actualizarPrestamo();

  }

  actualizarPrestamo() {
    let subscripcion = this.db.obtenerMovimientosPorPrestamo(this.prestamo.numeroPrestamo).subscribe((listaMovimientos) => {
      let valoresCalculados = this.funcionesComunes.calcularValoresPrestamo(this.listaMovimientos, this.prestamo);
      this.prestamo.capitalPrestado = valoresCalculados.capitalPrestado;
      this.prestamo.pagadoCapital = valoresCalculados.pagadoCapital;
      this.prestamo.capitalPendiente = valoresCalculados.capitalPendiente;
      this.prestamo.montoCuotas = this.funcionesComunes.calcularMontoCuota(this.prestamo);
      this.db.modificarPrestamo(this.prestamo);
      subscripcion.unsubscribe();
    })
      ;

  }

  modificarMovimiento() {

    this.movimientoActual.fechaTransaccion = new Date(this.movimientoActual.fechaTransaccion)
    this.db.modificarMovimiento(this.movimientoActual);
    this.actualizarPrestamo();
  }

  obtenerListaMovimientos(): void {
    let subscripcion = this.db.obtenerMovimientosPorPrestamo(this.prestamo.numeroPrestamo).subscribe(listaMovimientos => {
      this.listaMovimientos = listaMovimientos;
      this.movimientoActual = listaMovimientos[0];
      this.dataSource.data = this.listaMovimientos;
    });
  }
  onSelect(movimiento: Movimiento): void {

    this.movimientoActual = movimiento;
  }


  cambiarCreateFormMovimientos(evento) {
    console.log("recibido")
    $("#myModal1").modal("hide")
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    this.createFormMovimientos = false;
  }




}
