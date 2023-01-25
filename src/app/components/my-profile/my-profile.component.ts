import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  url = '';

  constructor(private uploadService: UploadService, private uService: UsersService) { }

  ngOnInit(): void {
    this.readPPicture();
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

  readPPicture()
  {
    this.uService.getPPicture().subscribe(data => {
      console.log(data);
      this.url = window.URL.createObjectURL(data);
    })
  }

}
