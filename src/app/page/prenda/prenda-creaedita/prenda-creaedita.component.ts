import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Prenda } from 'src/app/model/prenda';
import { PrendaService } from 'src/app/service/prenda.service';

@Component({
  selector: 'app-prenda-creaedita',
  templateUrl: './prenda-creaedita.component.html',
  styleUrls: ['./prenda-creaedita.component.css']
})
export class PrendaCreaeditaComponent implements OnInit {
  prenda: Prenda = new Prenda();
  mensaje: string = "";
  edicion: boolean = false;
  id: number = 0;

  constructor(private prendaService: PrendaService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
  }

  aceptar(): void {
    if (this.prenda.nombrePrenda.length > 0) {
      if (this.edicion) {
        this.prendaService.insertar(this.prenda).subscribe(data => {
          this.prendaService.listar().subscribe(data => {
            this.prendaService.setLista(data);
          })
        })
      }
      else {

        this.prendaService.insertar(this.prenda).subscribe(data => {
          this.prendaService.listar().subscribe(data => {
            this.prendaService.setLista(data);
          })
        })
      }
      this.router.navigate(['prendas']);
    } else {
      this.mensaje = "Complete los valores requeridos";
    }
  }


  init() {
    if (this.edicion) {
      this.prendaService.listarId(this.id).subscribe(data => {
        this.prenda = data;
      })
    }
  }
}
