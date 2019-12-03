import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {
  currentUser = {};
  constructor(private afAuth: AngularFireAuth) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = {
          nouser: 'nouser'
        };
      }
    });
  }



  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        });
    });
  }
  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });

    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut().then(then => {
        resolve();
      }).catch(e => {
        reject(e);
      });

    });
  }

}
