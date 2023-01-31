import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReturnUser } from './models/ReturnUser';
import { AuthService } from './services/auth.service';
import { TransferDataService } from './services/transfer-data.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private userService: UsersService, private sanitizer: DomSanitizer, private authServ: AuthService, private transferService: TransferDataService){}

  userApp: ReturnUser = new ReturnUser();

  ngOnInit(): void{
    if(this.IsAuthenticated)
    {
      this.cargarDatosUser();
    }  
  }

  public get IsAuthenticated(): boolean {
    return (localStorage.getItem('authToken') !== null)
  }
  
  cargarDatosUser()
  {  
      this.userService.getMe().subscribe(data => {
        this.userApp = data;
        console.log(this.userApp);
      }, error => {
        console.log(error);
      })   
  }
}
