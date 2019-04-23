import { Component, OnInit } from '@angular/core';
import { ViewController } from '@ionic/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-opcao-usuario',
  templateUrl: './opcao-usuario.component.html',
  styleUrls: ['./opcao-usuario.component.scss'],
})
export class OpcaoUsuarioComponent implements OnInit {

  constructor(
    public popoverController: PopoverController
  ) { }

  ngOnInit() { }


  excluir() {
    this.popoverController.dismiss()
  }

}
