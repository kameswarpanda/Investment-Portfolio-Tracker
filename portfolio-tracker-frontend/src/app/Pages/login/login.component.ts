import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj:any = {
    "email": "",
    "password": ""
  };

  MasterSrv = inject(MasterService);
  router = inject(Router);
  
  onSubmit(): void {

    this.MasterSrv.login(this.loginObj).subscribe((res:any  ) => {
      if(res.result){
        localStorage.setItem('stockUser', JSON.stringify(res.userId));
        this.router.navigateByUrl('/portfolio-details');
      }else{
        alert('incorrect email or password');
      }
    });
  }
}
