import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  goToCreateCommunity() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/create-community');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  goToCreatePost() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/create-post');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}
