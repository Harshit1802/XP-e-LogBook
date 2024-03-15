import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginInfo } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  hide = true;
  loading: boolean = false;
  passwordVisible: boolean = false;
  errors: any;
  programs = [
    { "image": "explore-Loyalty.svg", "title": "Explore the Loyalty Program", "text": "World's first loyalty program for freight forwarders and traders." },
    { "image": "enjoy-benefits.svg", "title": "Enjoy the benefits", "text": "Unlocking loyalty by offering exclusive benefits and rewards to partners and members." },
    { "image": "get-trade-insight.png", "title": "Get Trade insight", "text": "Enhance your trading experience with our streamlined trade dashboard." }
  ];
  formData: LoginInfo;
  formGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) {
    this.formData = { email: '', password: '' };
  }

  // #region fields


  error = '';
  type = 0;
  count = 0;


  login(): void {
    this.errors = null;
    if(this.formGroup.valid){

      this.loginService.login(this.formGroup.value)
      .subscribe(
        (data) => {
//Get User Permision
    const permissions = data.permissions;
    const userPermission=JSON.stringify(permissions);
// Save permissions in session storage
sessionStorage.setItem('permissions', userPermission);
          this.router.navigateByUrl('');
        },
        (err: any) => {
           this.errors = err.error.msg;
        }
      );

    }
   
  }

  

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
    });
  }


  // getError(el) {
  //   switch (el) {
  //     case 'user':
  //       if (this.formGroup.get('username').hasError('required')) {
  //         return 'Username required';
  //       }
  //       break;
  //     case 'pass':
  //       if (this.formGroup.get('password').hasError('required')) {
  //         return 'Password required';
  //       }
  //       break;
  //     default:
  //       return '';
  //   }
  //   return '';
  // }

  onSubmit(post) {
    // this.post = post;
  }

}
