import { Component, inject  } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { ApiBaseService } from '@shared/services/api-base.service';
import { AuthService } from '@shared/services/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private apiBaseService = inject( ApiBaseService );
  private router = inject(Router);

  public loginForm: FormGroup = this.fb.group({
    username:    ['', [ Validators.required ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
  });

  login(){
    console.log("loginForm =>", this.loginForm.value)

    if(this.loginForm.valid) {
      this.authService.autenticar(this.loginForm.value).subscribe(rpta =>{
        //console.log("rpta =>", rpta)

        // Momentáneamente usaré el localStorage para guardar el token,
        // luego se usará guards
        //localStorage.setItem('token', rpta);

        sessionStorage.setItem('token', rpta);

        this.router.navigate(['/container']);

      });
    }

  }
}
