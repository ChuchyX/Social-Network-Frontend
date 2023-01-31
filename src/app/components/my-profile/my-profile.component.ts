import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ReturnUser } from 'src/app/models/ReturnUser';
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

  constructor(private uploadService: UploadService, private sanitizer: DomSanitizer, private userService: UsersService, private transferData: TransferDataService) { }

  ngOnInit(): void {
      this.transferData.myTrigger.subscribe(data => {
      this.userProfile = data.data;
      if(this.IsAuthenticated)
      {
          if(this.userProfile?.image === null)
          {
            this.url = true
          }
          else
          {
            this.image = 'data:image/jpeg;base64,' + 
                            (this.sanitizer.bypassSecurityTrustResourceUrl(this.userProfile?.image.fileContents) as any).changingThisBreaksApplicationSecurity;
          }
      }
     })
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
    this.uploadService.postFile(file).subscribe(() => {});
  }
}
