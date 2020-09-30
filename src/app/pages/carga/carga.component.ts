import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item.model';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {

  estaSobreElDrop = false;
  archivos: FileItem[]= [];
  constructor( public _cargaImg: CargaImagenesService ) { }

  ngOnInit(): void {
  }

  cargarImagenes(){
    console.log('cargando...');
    this._cargaImg.cargarImagenesFirebase( this.archivos );
  }

  limpiarArchivos(){
    this.archivos = [];
  }

}
