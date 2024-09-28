import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PostService } from "../../core/services/post.service";
import { CommonModule } from "@angular/common";
import { Post } from "../../core/entities/post.model";

@Component({
  selector: "app-post-details",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./post-details.component.html",
})
export class PostDetailsComponent implements OnInit {
  private readonly _postService = inject(PostService);
  private readonly _route = inject(ActivatedRoute);

  post!: Post;

  ngOnInit(): void {
    const id = Number(this._route.snapshot.paramMap.get("id"));
    this._postService.getPostById(id).subscribe((post) => {
      this.post = post;
    });
  }
}
