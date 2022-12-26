import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import { Post } from '../../posts/post.model';
import { PostsService } from "../posts.service";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']

})
export class PostListComponent implements OnInit, OnDestroy{
  // posts = [
  //   {title: "First Post", content: "This is the first post\'s content"},
  //   {title: "Second Post", content: "This is the second post\'s content"},
  //   {title: "Third Post", content: "This is the third post\'s content"}
  // ];
  posts: Post[] = [];
  private postsSub: Subscription;
  constructor(public postsService: PostsService) {}
  isLoading = false;
  totalPosts = 10;
  postPerPage = 2;
  pageSizeOptions = [1,2,5,10];
  currentPage = 1;


  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postPerPage, this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) =>{
      this.isLoading = false;
      this.posts = posts;
    });

  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
  onDelete(postId: string){
    this.postsService.deletePost(postId);

  }
  onChangedPage(pageData: PageEvent){
    // console.log(pageData);
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postPerPage, this.currentPage);

  }

}
