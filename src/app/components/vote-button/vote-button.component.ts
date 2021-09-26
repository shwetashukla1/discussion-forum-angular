import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { VoteService } from '../../services/vote.service';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { ToastrService } from 'ngx-toastr';
import { VotePayload } from 'src/app/model/vote-payload';
import { VoteType } from 'src/app/model/vote-type';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  votePayload: VotePayload = new VotePayload();
  @Input() post: Post;


  constructor(private voteService: VoteService,
    private authService: AuthService,
    private postService: PostService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  downvotePost(){
    if(this.authService.isLoggedIn()){
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
  }
  else{
    this.toastr.error('You need to login to vote');
  }
  }
  upvotePost(){
    if(this.authService.isLoggedIn()){
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
  }
  else{
    this.toastr.error('You need to login to vote');
  }
  }

  private vote(){
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      this.toastr.error('you cannot perform vote more than once');
      throwError(error);
    });
  }
  updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe(post => {
      this.post = post;
    })
  }

}
