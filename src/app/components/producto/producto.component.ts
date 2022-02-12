import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/productos';
import { ProductosService } from '../../services/productos.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Categoria } from '../../models/categorias';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  producto = new Producto();
  categorias: Categoria[] = [];
  cargando = false;
  cargado = false;
  files: FileList | undefined;

  constructor(
    private productosService: ProductosService,
    private router: Router,
    private route: ActivatedRoute,
    private categoriasService: CategoriasService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo' && id !== null) {
      Swal.fire({ title: 'Espere', text: 'Cargando información', allowOutsideClick: false, icon: 'info', });
      Swal.showLoading();
      this.productosService.getProducto(+id).subscribe(resp => {
        this.producto = resp;
        Swal.close();
      }, (error) => {
        Swal.fire({ title: 'Error', text: 'No se pudo obtener los datos' })
      });
    }
    this.categoriasService.getCategorias().subscribe(resp => {
      this.categorias = resp;
    })
  }

  async cargaArchivo(event: any) {
    this.files = event.target.files;
    this.cargando = true;
    const currentFile = this.files!.item(0);
    console.log(currentFile);
    const img: any = await toBase64(currentFile);
    this.producto.imagen = img;
    console.log(await toBase64(currentFile));
    this.cargando = false
  }

  guardar(formulario: NgForm) {
    if (formulario.invalid) { return; }
    if (!this.producto.imagen) { Swal.fire({ title: 'Atención!', text: 'Por favor cargue una imagen', icon: 'success' }); return; }

    if (!this.producto.id) {
      this.productosService.postProducto(this.producto).subscribe(resp => {
        console.log(resp)
        Swal.fire({ title: 'Listo!', text: 'Producto creado con éxito', icon: 'success' }).then(e => {
          this.router.navigateByUrl('productos');
        }

        )
      }, err => {
        console.log(err)
        Swal.fire({ title: 'Error', text: 'Ocurrió un error. ' + err.error.msg, })
      })
    } else {
      this.productosService.putProducto(this.producto).subscribe(resp => {
        console.log(resp)
        Swal.fire({ title: 'Listo!', text: 'Producto actualizado con éxito', icon: 'success' }).then(e => {
          this.router.navigateByUrl('productos');
        }
        )
      }, err => {
        console.log(err)
        Swal.fire({ title: 'Error', text: 'Ocurrió un error. ' + err.error.msg, })
      })
    }
  }

  eliminarProducto() {
    this.productosService.deleteProducto(this.producto.id).subscribe(resp => {
      Swal.fire({ title: 'Listo!', text: 'Producto eliminado con éxito', icon: 'success' }).then(e => {
        this.router.navigateByUrl('productos');
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
