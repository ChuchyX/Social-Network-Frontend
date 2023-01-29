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
    this.url = false;  
      this.userService.getMe().subscribe(data => {

        this.user = data;

        console.log(this.user);

        // var binaryData = [];
        // binaryData.push(data.image);
        // let objectURL = URL.createObjectURL(new Blob(binaryData, {type: "image/jpg"}))
         
        // this.user.image = this.sanitizer.bypassSecurityTrustUrl(objectURL); 

        // this.image = this.user.image;

        // let objectURL = 'data:image/jpg;base64,' + data.image;
        // this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);

        if(this.user.image === null)
        {
          this.url = true
        }
        else
        {
            var imgSrc = 'data:image/jpeg;base64,' + 
                          (this.sanitizer.bypassSecurityTrustResourceUrl(data.image.fileContents) as any).changingThisBreaksApplicationSecurity;
                 
            this.image = imgSrc;

        }

        

      }, error => {
        console.log(error);
        this.url = true;
      })
    
  }

}
