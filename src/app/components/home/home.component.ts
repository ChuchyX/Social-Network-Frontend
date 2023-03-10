import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnInit,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ReturnUser } from 'src/app/models/ReturnUser';
import { AuthService } from 'src/app/services/auth.service';
import { SharingService } from 'src/app/services/sharing.service';
import { TransferDataService } from 'src/app/services/transfer-data.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  image: any;
  url = false;
  userHome: ReturnUser | undefined;
  private userHome$: Observable<ReturnUser>;

  constructor(
    private sanitizer: DomSanitizer,
    private sharingServ: SharingService
  ) {
    this.userHome$ = sharingServ.GetMyObservableUser;
  }

  ngOnInit(): void {
    this.userHome = undefined;
    if (this.IsAuthenticated) {
      this.userHome$.subscribe((u) => {
        this.userHome = u;
        if (this.userHome?.image === null) {
          this.url = true;
        } else {
          this.image =
            'data:image/jpeg;base64,' +
            (
              this.sanitizer.bypassSecurityTrustResourceUrl(
                this.userHome?.image.fileContents
              ) as any
            ).changingThisBreaksApplicationSecurity;
        }
      });
    }
  }

  public get IsAuthenticated(): boolean {
    return localStorage.getItem('authToken') !== null;
  }
}
