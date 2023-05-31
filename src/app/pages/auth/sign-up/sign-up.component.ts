import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { Loja } from 'app/models/loja';
import { Usuario } from 'app/models/usuario';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;
    apiToken: any;
    obter= true;
    isLinear = false;
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signUpForm: FormGroup;
    showAlert: boolean = false;
    loading: boolean = false;   

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        public _snackBar: MatSnackBar
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        // Create all forms
        this.signUpForm = this._formBuilder.group({        
                nome: ['', [Validators.required]],             
                email: ['', [Validators.required, Validators.email]],              
                password: ['', Validators.required]                
            
        });
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    /**
     * Sign up
     */
    signUp(): void {
        // Do nothing if the form is invalid
        if (this.signUpForm.invalid) {
            return;
        }

        const user = new Usuario(this.signUpForm.value);        

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
        this._authService.signUp(user)
            .subscribe(
                (response) => {

                    // Navigate to the confirmation required page
                    this._router.navigateByUrl('/inicio');
                },
                (response) => {
                    console.log('Error ', response);

                    // Re-enable the form
                    this.signUpForm.enable();
                    this.obter = true;


                    // Set the alert
                    this.alert = {
                        type: 'error',
                        message: response.error.message
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            );

    }

 





    //user
    get nome(): any {
        return this.signUpForm.get('fullName');
    }

    get password(): any {
        return this.signUpForm.get('password');
    }

    get email(): any {
        return this.signUpForm.get('email');
    }

}
