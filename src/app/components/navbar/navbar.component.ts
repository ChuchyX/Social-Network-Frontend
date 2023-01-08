import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private userService: UsersService) { }

  user: any;

  ngOnInit(): void {
    
  }

  Register()
  {
    this.router.navigate(['/register']);
  }

  Login()
  {
    this.router.navigate(['/login']);
  }

  public get IsAuthenticated(): boolean {
    return (localStorage.getItem('authToken') !== null)
  }

  Logout()
  {
    localStorage.removeItem('authToken');
    this.router.navigate(['']);
  }

}
