import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterUserDto } from 'src/app/models/RegisterUserDto';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { SharingService } from 'src/app/services/sharing.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  user = new RegisterUserDto();

  sexo = 'Masculino';

  ngOnInit(): void {
  }

  register()
  {
    this.user.sexo = this.sexo;
    this.authService.register(this.user).subscribe(res => {
      this.router.navigate(['/home']);
    });
    
  }
 
}
