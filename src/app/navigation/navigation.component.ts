import { Component, OnInit } from '@angular/core';
import { FireauthService } from '../_service/fireauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private fireauthService: FireauthService, private router: Router) { }

  ngOnInit() {
  }


  logout() {
    this.fireauthService.logout().then(cb => {
      console.log(cb);
      this.router.navigateByUrl('/login');
    }).catch(e => {
      console.log(e);
    });
  }


}
