import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ReturnUser } from 'src/app/models/ReturnUser';
import { TransferDataService } from 'src/app/services/transfer-data.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnChanges, OnInit {

  constructor(private router: Router, private userService: UsersService, private uService: UsersService, private sanitizer: DomSanitizer, private transferData: TransferDataService) { }

  @Input() userNav: ReturnUser;

  image : any;

  url = false;


  ngOnChanges(changes: SimpleChanges): void {
    if(this.userNav.username !== '')
    {
      this.cargarDatos();
      this.transferData.myTrigger.emit({
        data: this.userNav
      })
    }  
  }

  ngOnInit(): void {
 
  }
 
  public get IsAuthenticated(): boolean {
    return (localStorage.getItem('authToken') !== null)
  }

  cargarDatos()
  {
        //Todo esto que esta comentado son cosas que fui probando para leer la imagen
        // var binaryData = [];
        // binaryData.push(data.image);
        // let objectURL = URL.createObjectURL(new Blob(binaryData, {type: "image/jpg"}))
         
        // this.user.image = this.sanitizer.bypassSecurityTrustUrl(objectURL); 

        // this.image = this.user.image;

        // let objectURL = 'data:image/jpg;base64,' + data.image;
        // this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    if(this.IsAuthenticated)
    {
      if(this.userNav.image === null)
      {
        this.url = true
      }
      else
      {
        this.image = 'data:image/jpeg;base64,' + 
                        (this.sanitizer.bypassSecurityTrustResourceUrl(this.userNav.image.fileContents) as any).changingThisBreaksApplicationSecurity;
      }
    }
  }

  Register()
  {
    this.router.navigate(['/register']);
  }

  Login()
  {
    this.router.navigate(['/login']);
  }

  Logout()
  {
    localStorage.removeItem('authToken');
    this.router.navigate(['']);
  }

}
