import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ReturnUser } from 'src/app/models/ReturnUser';
import { SharingService } from 'src/app/services/sharing.service';
import { TransferDataService } from 'src/app/services/transfer-data.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userNav: ReturnUser | undefined;
  private userNav$: Observable<ReturnUser>;
  image: any;
  url = false;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private sharingServ: SharingService
  ) {
    this.userNav$ = sharingServ.GetMyObservableUser;
  }

  ngOnInit(): void {
    this.userNav = undefined;
    if (this.IsAuthenticated) {
      this.userNav$.subscribe((u) => {
        this.userNav = u;
        if (this.userNav?.image === null) {
          this.url = true;
        } else {
          this.image =
            'data:image/jpeg;base64,' +
            (
              this.sanitizer.bypassSecurityTrustResourceUrl(
                this.userNav?.image.fileContents
              ) as any
            ).changingThisBreaksApplicationSecurity;
        }
      });
    }
  }

  public get IsAuthenticated(): boolean {
    return localStorage.getItem('authToken') !== null;
  }

  Register() {
    this.router.navigate(['/register']);
  }

  Login() {
    this.router.navigate(['/login']);
  }

  Logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/home']);
  }
}
