import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  registrationObj:any = {
    "email": "",
    "fullName": "",
    "password": ""
  };
  

  MasterSrv = inject(MasterService);
    router = inject(Router);

  onSubmit(): void {
      this.MasterSrv.register(this.registrationObj).subscribe((res:any) => {
        if(res.id != null){
          alert('Registration successful! Login Now!');
          this.router.navigateByUrl('/home/login');
        }else{
          alert('Something went wrong!');
        }
      });
  }
}
