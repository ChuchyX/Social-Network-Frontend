import { Component, OnInit } from '@angular/core';
import { ReturnUser } from 'src/app/models/ReturnUser';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UsersService) { }


  user: ReturnUser = new ReturnUser();


  ngOnInit(): void {

    this.cargarDatosUser();
  }

  public get IsAuthenticated(): boolean {
    return (localStorage.getItem('authToken') !== null)
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
