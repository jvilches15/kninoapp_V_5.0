import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-knino-name',
  standalone: true,
  templateUrl: './knino-name.component.html',
  styleUrls: ['./knino-name.component.scss'],
})
export class KninoNameComponent   {

  @Input() KninoName: string = 'Mi Empresa';

  

}
