import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

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
