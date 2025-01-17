import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../interfaces/auth.interface';
import Swal from 'sweetalert2';
import { catchError, of, switchMap } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { messages } from '../../constants/message.constants';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      Swal.fire({
        title: messages.formInvalid.title,
        text: messages.formInvalid.text,
        icon: 'error',
        confirmButtonText: messages.formInvalid.textButton,
      });
      return;
    }

    const user: User = this.loginForm.value;

    this.authService
      .getUser(user.email)
      .pipe(
        switchMap((resp) => {
          if (!resp.exists) {
            return this.authService
              .createUser(user)
              .pipe(switchMap(() => of(messages.status.created)));
          }
          return of(messages.status.existing);
        }),
        catchError((err) => {
          this.alertService.showError(messages.authError);
          return of(null);
        })
      )
      .subscribe((status) => {
        if (status === messages.status.created) {
          this.alertService.showSuccess(messages.userCreatedSuccess);
          localStorage.setItem('userEmail', user.email);
        } else if (status === messages.status.existing) {
          this.alertService.showSuccess(messages.loginSuccess);
          localStorage.setItem('userEmail', user.email);
        }
        if (status) {
          this.router.navigate(['./home']);
        }
      });
  }
}
