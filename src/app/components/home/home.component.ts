import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ReturnUser } from 'src/app/models/ReturnUser';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  image : any;

  url = false;
  user: ReturnUser = new ReturnUser();
  
  constructor(private userService: UsersService, private sanitizer: DomSanitizer, private authServ: AuthService) { 
    
  }


  


  ngOnInit(): void{
    if(this.IsAuthenticated)
    {
      this.cargarDatosUser();
    }
    this.readPPicture();
  }

  public get IsAuthenticated(): boolean {
    return (localStorage.getItem('authToken') !== null)
  }

  readPPicture()
  {
    this.url = false;
    this.userService.getPPicture().subscribe(data => {
      console.log(data);
      // this.url = window.URL.createObjectURL(data);

      let objectURL = URL.createObjectURL(data); 
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL); 
    
    }, err => {
      this.url = true;
      
    });
  }


  cargarDatosUser()
  {  
      this.userService.getMe().subscribe(data => {
        this.user = data;
      }, error => {
        console.log(error);
      })
    
  }

}
