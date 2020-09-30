import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item.model';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {
  
  @Input()  archivos: FileItem[] = [];
  @Output() mauseSobreDrop: EventEmitter<boolean> = new EventEmitter();

  constructor() { }
  
  @HostListener( 'dragover', ['$event'])
  public onDragEnter( event: any ){
    this.mauseSobreDrop.emit( true );
    this._prevenirAbrir( event );
  }

  @HostListener( 'dragleave', ['$event'])
  public onDragLeave( event: any ){
    this.mauseSobreDrop.emit( false );
  }
  
  @HostListener( 'drop', ['$event'])
  public onDrop( event: any ){
    
    const tranferencia = this._getTranferencia( event );
    
    if( !tranferencia ){ return }
    
    this._extraerArchivos( tranferencia.files );
    
    this._prevenirAbrir( event );
    this.mauseSobreDrop.emit( false );
  }
  
  private _getTranferencia( event: any ){
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos( archivosLista: FileList ){
    
    for ( const propiedad in Object.getOwnPropertyNames( archivosLista ) ) {
      const archivoTemporal = archivosLista[propiedad];

      if( this._archivoValido( archivoTemporal ) ){
        const archivoValido = new FileItem( archivoTemporal );
        this.archivos.push( archivoValido );
      }      
    }

    // console.log( this.archivos );
  }


  //=== === VALIDACIONES === ===
  
  //Verificar si el archivo cumple con lascondiciones para ser cargado
  private _archivoValido( archivo: File ): boolean {
    if ( !this._archivoYaExisteEnElDrop( archivo.name ) && this._esImagen( archivo.type ) ) {
      return true;
    } else {
      return false;
    }
  }

  // Prevenir que el navegador abra la imagen en lugar de cargarla
  private _prevenirAbrir( event ){
    event.preventDefault();
    event.stopPropagation();
  }
  
  //Prevenier que el archiivo no sea droppeado o cargado dos veces
  private _archivoYaExisteEnElDrop( nombreArchivo: string ): boolean {
    
    for (const archivo of this.archivos) {
      if( archivo.nombreArchivo == nombreArchivo ){
        console.log(`El archivo ${ nombreArchivo } ya esta cargado en el drop`);
        return true;
      }
      
    }
    return false;
  }
  
  //Verificar que el archivo sea una imagen
  private _esImagen( tipoArchivo: string ):boolean {
    return ( tipoArchivo === '' || tipoArchivo === undefined ) ? false : tipoArchivo.startsWith('image');
  }



}
