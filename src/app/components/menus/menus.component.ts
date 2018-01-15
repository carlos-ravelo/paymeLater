import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MenusComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) { }
  logOut(){
    this.afAuth.auth.signOut();
  }

  ngOnInit() {
  }

}
