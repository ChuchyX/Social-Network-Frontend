import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async Login()
  {
    await this.authService.login(this.user).subscribe((token: string) => {
      localStorage.setItem('authToken', token);
      this.router.navigate(['home']);   
    })
    
  }

}
