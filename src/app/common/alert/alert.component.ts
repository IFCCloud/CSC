import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../service/message.service';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor(private msgService : MessageService) { }

  ngOnInit() { }

}
