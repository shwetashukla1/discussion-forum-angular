import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/services/post.service';
import { faArrowUp, faArrowDown, faComment } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {

  
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faComments = faComment;

  @Input()
  posts: Array<Post> = [];

  constructor(private router: Router) {
    
   }

  ngOnInit(): void {
  }
  
  goToPost(id: number): void{
    this.router.navigateByUrl('/view-post/'+id);
  }

}
