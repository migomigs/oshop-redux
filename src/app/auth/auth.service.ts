import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from "firebase/app";
import "firebase/auth";
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { from, Observable } from 'rxjs';
import { IfStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  googleProvider = firebase.auth.GoogleAuthProvider;
  jwtHelper = new JwtHelperService;

  constructor(
      private fireBaseAuth: AngularFireAuth, 
      private router: Router,
      private activeRoute: ActivatedRoute) { }

  public isAuthenticated(): boolean{

    let user = this.currentUser;

    return user ? true: false;

    // firebase.auth().onAuthStateChanged(firebaseUser => {
    //   if(firebaseUser) {
    //      console.log('firebaseUser', firebaseUser);
    //      firebase;
    //      return true;
    //   }else{
    //     console.log('not logged in');
    //     return false;
    //   }
    //     });

        

    // let token = localStorage.getItem('access_token');

    // if(token){
    //   let credential = this.googleProvider.credential(token);

    //   return await firebase.auth().signInWithCredential(credential)
    //     .then(
    //       result =>{
    //         console.log('authenticated');
    //         return true;
    //       },
    //       reason => {
    //         console.log('NOT authenticated', reason);
    //         return false;
    //       }
    //     )
    //     .catch(error =>{
    //       console.log('error catch', error);
    //       return false;
    //     })
    // }else{
    //   console.log('return false 3');
    //   return false;
    // }

  }

  get currentUser(){
    return firebase.auth().currentUser;
  }

  public async signIn(){
      console.log('Sign in');

      let provider = new firebase.auth.GoogleAuthProvider();

      await this.fireBaseAuth.signInWithPopup(provider)
        .then(
           result => {
              console.log('result', result);
              let credential = result.credential;
              let token = (credential as firebase.auth.OAuthCredential).accessToken;
              console.log('created token', token);
              console.log('user', result.user);
              localStorage.setItem('user', JSON.stringify(result.user));
              
              if(token){
                console.log('token saved', token);
                localStorage.setItem('access_token', token);
                let returnUrl = this.activeRoute.snapshot.queryParamMap.get('returnUrl');
                console.log('returnUrl', returnUrl);
                console.log('WE ARE HERE');
                this.router.navigate([returnUrl || '/'])
              }
              },
           reason => {
            console.log('1 reason', reason);
           });

  }

  public signOut(){
    this.fireBaseAuth.signOut();
    localStorage.removeItem('access_token');
  }


}
