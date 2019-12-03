import { Component, OnInit } from '@angular/core';
import { FireauthService } from '../_service/fireauth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  toForward: string;
  constructor(public fireauthService: FireauthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.toForward = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  google() {
    this.fireauthService.doGoogleLogin().then(data => {
      console.log(data);
      this.router.navigate([this.toForward]);
    }).catch(err => {
      console.log(err);
    });
  }
  facebook() {
    this.fireauthService.doFacebookLogin().then(data => {
      this.router.navigate([this.toForward]);
    }).catch(err => {
      console.log(err);
    });
  }

}
