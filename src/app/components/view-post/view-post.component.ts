import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Post } from 'src/app/model/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { CommentPayload } from '../../model/comment-payload';
import { CommentService } from '../../services/comment.service';
import { VotePayload } from 'src/app/model/vote-payload';
import { VoteType } from 'src/app/model/vote-type';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { VoteService } from 'src/app/services/vote.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  postId: number;
  post: Post= new Post();
  commentForm: FormGroup;
  commentPayload: CommentPayload = new CommentPayload();
  comments: CommentPayload[];

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  votePayload: VotePayload = new VotePayload();

  constructor(private postService: PostService,
     private activateRoute: ActivatedRoute,
     private commentService: CommentService,
     private authService: AuthService,
     private router: Router,
     private voteService: VoteService,
     private toastr: ToastrService) {

    this.postId = this.activateRoute.snapshot.params.id;
    this.getCommentsForPost();

    this.getPostById();
    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  postComment() {
    if(this.authService.isLoggedIn()){
    this.commentPayload.text = this.commentForm.get('text').value;
    this.commentService.postComment(this.commentPayload).subscribe(data => {
      this.commentForm.get('text').setValue('');
      this.getCommentsForPost();
    }, error => {
      throwError(error);
    })
  }
  else{
    this.router.navigateByUrl('/login');
  }
  }

  private getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
    }, error => {
      throwError(error);
    });
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data => {
      this.comments = data;
    }, error => {
      throwError(error);
    });
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
