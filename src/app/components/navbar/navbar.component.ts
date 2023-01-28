import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ReturnUser } from 'src/app/models/ReturnUser';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private userService: UsersService, private uService: UsersService, private sanitizer: DomSanitizer) { }

  user: ReturnUser = new ReturnUser();

  image : any;

  url = false;


  ngOnInit(): void {
    if(this.IsAuthenticated)
    {
      this.cargarDatosUser();
    }
    this.readPPicture();
  }


  readPPicture()
  {
    this.url = false;
    this.uService.getPPicture().subscribe(data => {
      console.log(data);
      // this.url = window.URL.createObjectURL(data);

      let objectURL = URL.createObjectURL(data); 
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL); 
    
    }, err => {
      this.url = true;
      
    });
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
