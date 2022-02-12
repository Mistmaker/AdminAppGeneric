import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Categoria } from '../../models/categorias';
import { CategoriasService } from '../../services/categorias.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categoria = new Categoria();
  cargando = false;
  cargado = false;
  files: FileList | undefined;

  constructor(private categoriasService: CategoriasService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo' && id !== null) {

      Swal.fire({ title: 'Espere', text: 'Cargando información', allowOutsideClick: false, icon: 'info', });
      Swal.showLoading();

      this.categoriasService.getCategoria(+id).subscribe(resp => {
        this.categoria = resp;
        Swal.close();
      }, (error) => {
        Swal.fire({ title: 'Error', text: 'No se pudo obtener los datos' })
      });
    }
  }

  async cargaArchivo(event: any) {
    this.files = event.target.files;
    this.cargando = true;
    const currentFile = this.files!.item(0);
    console.log(currentFile);
    const img: any = await toBase64(currentFile);
    this.categoria.imagen = img;
    console.log(await toBase64(currentFile));
    this.cargando = false
  }

  guardar(formulario: NgForm) {
    if (formulario.invalid) { return; }
    if (!this.categoria.imagen ) { Swal.fire({ title: 'Atención!', text: 'Por favor cargue una imagen', icon: 'success' }); return; }


    if (!this.categoria.id) {
      this.categoriasService.postCategoria(this.categoria).subscribe(resp => {
        console.log(resp)
        Swal.fire({ title: 'Listo!', text: 'Categoría creada con éxito', icon: 'success' }).then(e => {
          this.router.navigateByUrl('categorias');
        }
        )
      })
    } else {
      this.categoriasService.putCategoria(this.categoria).subscribe(resp => {
        console.log(resp)
        Swal.fire({ title: 'Listo!', text: 'Categoría actualizada con éxito', icon: 'success' }).then(e => {
          this.router.navigateByUrl('categorias');
        }
        )
      })
    }
  }

  eliminarCategoria() {
    this.categoriasService.deleteCategoria(this.categoria.id).subscribe(resp => {
      Swal.fire({ title: 'Listo!', text: 'Categoría eliminada con éxito', icon: 'success' }).then(e => {
        this.router.navigateByUrl('categorias');
      })
    }, err => {
      console.log(err)
      Swal.fire({ title: 'Error', text: 'Ocurrió un error. ' + err.error.msg, })
    })
  }


}

const toBase64 = (file: any) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});
