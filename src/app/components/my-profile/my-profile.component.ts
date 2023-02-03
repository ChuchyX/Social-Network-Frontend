import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ReturnUser } from 'src/app/models/ReturnUser';
import { SharingService } from 'src/app/services/sharing.service';
import { TransferDataService } from 'src/app/services/transfer-data.service';
import { UploadService } from 'src/app/services/upload.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  image : any;

  url = false;

  userProfile: ReturnUser | undefined;
  private userProfile$: Observable<ReturnUser>;

  constructor(private uploadService: UploadService, private sanitizer: DomSanitizer, private sharingServ: SharingService) { 
    
  }

  ngOnInit(): void {
    this.userProfile$ = this.sharingServ.GetMyObservableUser;
    if(this.IsAuthenticated)
    {
      this.userProfile$.subscribe(u => {

        this.userProfile = u;

        if(this.userProfile?.image === null)
        {
          this.url = true
        }
        else
        {
          this.image = 'data:image/jpeg;base64,' + 
                          (this.sanitizer.bypassSecurityTrustResourceUrl(this.userProfile?.image.fileContents) as any).changingThisBreaksApplicationSecurity;
        }
       
      });       
    }  
  }

  public get IsAuthenticated(): boolean {
    return (localStorage.getItem('authToken') !== null)
  }

  handleFileInput(event: Event)
  {
    let files = (event.target as HTMLInputElement).files;
    if(files)
    {
      for(let index = 0; index < files.length; index++)
      {
        if(files.item(index))
        {
          this.postFile(files.item(index) as File);
        }
      }
    }

    (event.target as HTMLInputElement).files = null;
    (event.target as HTMLInputElement).value = "";
  }

  postFile(file: File)
  {
    this.uploadService.postFile(file).subscribe((u: ReturnUser) => {
      console.log('user upload', u);
      this.sharingServ.setMyObservableUser = u;
      this.ngOnInit();
    });
  }
}
