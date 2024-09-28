import { Component, inject, OnInit } from "@angular/core";
import { PostCardComponent } from "../../shared/post-card/post-card.component";
import { CommonModule } from "@angular/common";
import { PostListStore } from "./post-list.store";

@Component({
  selector: "app-post-list",
  standalone: true,
  imports: [CommonModule, PostCardComponent],
  templateUrl: "./post-list.component.html",
  styleUrl: "./post-list.component.scss",
  providers: [PostListStore],
})
export class PostListComponent implements OnInit {
  private readonly _store = inject(PostListStore);

  posts$ = this._store.posts$;
  currentPage$ = this._store.currentPage$;
  totalPages$ = this._store.totalPages$;

  ngOnInit(): void {
    this._store.loadPosts();
  }

  onPageChange(page: number): void {
    this._store.changePage(page);
  }
}
