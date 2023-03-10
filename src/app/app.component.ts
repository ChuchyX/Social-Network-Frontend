import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReturnUser } from './models/ReturnUser';
import { AuthService } from './services/auth.service';
import { SharingService } from './services/sharing.service';
import { TransferDataService } from './services/transfer-data.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userApp: ReturnUser = new ReturnUser();
  private userHome$: Observable<ReturnUser>;

  constructor(
    private userService: UsersService,
    private sanitizer: DomSanitizer,
    private sharingServ: SharingService
  ) {
    this.userHome$ = sharingServ.GetMyObservableUser;
  }

  ngOnInit(): void {
    if (this.IsAuthenticated) {
      this.cargarDatosUser();
      this.userHome$.subscribe((u) => {
        this.userApp = u;
      });
    }
  }

  public get IsAuthenticated(): boolean {
    return localStorage.getItem('authToken') !== null;
  }

  cargarDatosUser() {
    this.userService.getMe().subscribe(
      (data) => {
        this.userApp = data;
        this.sharingServ.setMyObservableUser = this.userApp;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
