import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  public resultText: string = "Loading...";
  constructor(public nav: NavController, public router: Router) { 
    
  }


  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      const incoming = this.router.getCurrentNavigation().extras.state;
      this.resultText = incoming['output'];
    }
  }

}
