import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder , Validators} from '@angular/forms';
import { AuthService } from '../auth.service';


declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loading = false;
  public error = false;
  errorMessage = '';

  loginUserData = this.fb.group({
    loginId : ['',Validators.required],
    loginPassword : ['',Validators.required]
  });

  constructor(public router: Router, public fb: FormBuilder, private _authService: AuthService) {
  }

  ngOnInit() { }

  public authenticate() {
    if(this.loginUserData.status === 'VALID'){
      const postData = {
        username: this.loginUserData.value.loginId,
        password: this.loginUserData.value.loginPassword
        // username: 'testuser',
        // password: 'ruDWLeHr9K7ErsUS'
      };
  
      this.loading = true; // loading true
      this._authService.getUserAuthentication(postData).subscribe(
        (data) => {
          if (data.is_success === true) {
            window.sessionStorage.setItem('isLogged', 'true');
            window.localStorage.setItem('token',data.data.token);
            this.router.navigate(['/movie-dashboard']);  // navigate dashboard page it authentication is successfull.
            this.loginUserData.reset();
          } else {
            this.error = true;
            this.errorMessage = data.status;
          }
        },
        (error) => {
          console.log('Error while authenticating user'  + error);
          this.loading = false; 
          this.error = true;
          this.loginUserData.reset();
        },
        () => {
          this.loading = false;
          //console.log('authentication completely');
        }
      );
    }else{
      this.error = true;
      this.loading = false; 
    }

  }

}
