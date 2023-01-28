import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ReturnUser } from 'src/app/models/ReturnUser';
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

  user: ReturnUser = new ReturnUser();

  constructor(private uploadService: UploadService, private sanitizer: DomSanitizer, private userService: UsersService) { }

  ngOnInit(): void {
    if(this.IsAuthenticated)
    {
      this.cargarDatosUser();
    }
    this.readPPicture();
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

  readPPicture()
  {
    this.url = false;
    this.userService.getPPicture().subscribe(data => {
      console.log(data);
      // this.url = window.URL.createObjectURL(data);

      let objectURL = URL.createObjectURL(data); 
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL); 
    
    }, err => {
      this.url = true;
      
    });
  }

  async cargarDatosUser()
  {  
      this.userService.getMe().subscribe(data => {
        this.user = data;
      }, error => {
        console.log(error);
      })
    
  }

}
