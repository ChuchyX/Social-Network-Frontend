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

  constructor(private router: Router, private sanitizer: DomSanitizer) { }

  @Input() userNav: ReturnUser;

  image : any;

  url = false;


  ngOnChanges(changes: SimpleChanges): void {
    if(this.userNav.username !== '')
    {
      this.cargarDatos();
    }  
  }

  ngOnInit(): void {
 
  }
 
  public get IsAuthenticated(): boolean {
    return (localStorage.getItem('authToken') !== null)
  }

  cargarDatos()
  {
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
    this.router.navigate(['/home']);
  }
}
