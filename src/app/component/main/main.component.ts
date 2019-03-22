import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  constructor(private loader : LoaderService) { }

  ngOnInit() {  }


}
 