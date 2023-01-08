import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReturnUser } from 'src/app/models/ReturnUser';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private userService: UsersService) { }

  user: ReturnUser = new ReturnUser();

  ngOnInit(): void {
    this.cargarDatosUser();
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

  cargarDatosUser()
  {  
      this.userService.getMe().subscribe(data => {
        console.log(data);
        this.user = data;
      }, error => {
        console.log(error);
      })
    
  }

}
