import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { FileItem } from '../models/file-item.model';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';

  constructor( private firestore: AngularFirestore ) { }

  cargarImagenesFirebase( imagenes: FileItem[] ){
    
    const storageRef = firebase.storage().ref();
    
    for (const item of imagenes) {

      item.estaSubiendo = true;
      if( item.progreso >= 100 ){ continue; }
      
      const uploadTask: firebase.storage.UploadTask = storageRef.child(`${ this.CARPETA_IMAGENES }/${ item.nombreArchivo }`).put( item.archivo );

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
          ( snapshot: firebase.storage.UploadTaskSnapshot ) => item.progreso = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100,
          ( error ) => console.error( 'Error al subir', error ),
          ()=>{
            console.log('imagen cargada correctamente');
            
            uploadTask.snapshot.ref.getDownloadURL().then(
              (url) =>{
                item.url = url;

                item.estaSubiendo = false;
                this.guadarImg({
                  nombre: item.nombreArchivo,
                  url: item.url
                });

              }
            );
          }
      )
    }
  }

  private guadarImg( imagen: { nombre:string, url:string } ){
    this.firestore.collection( `/${ this.CARPETA_IMAGENES }` )
      .add( imagen );
  }

}