import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Observable, switchMap, tap } from "rxjs";
import { PostService } from "../../core/services/post.service";
import { Post } from "../../core/entities/post.model";

interface PostListState {
  posts: Post[];
  currentPage: number;
  totalPages: number;
  postsPerPage: number;
}

const initialState: PostListState = {
  posts: [],
  currentPage: 1,
  totalPages: 1,
  postsPerPage: 10,
};

@Injectable()
export class PostListStore extends ComponentStore<PostListState> {
  constructor(private postService: PostService) {
    super(initialState);
  }

  readonly posts$ = this.select((state) => state.posts);
  readonly currentPage$ = this.select((state) => state.currentPage);
  readonly totalPages$ = this.select((state) => state.totalPages);

  readonly setCurrentPage = this.updater((state, page: number) => ({
    ...state,
    currentPage: page,
  }));

  readonly setPosts = this.updater((state, posts: Post[]) => ({
    ...state,
    posts,
  }));

  readonly setTotalPages = this.updater((state, total: number) => ({
    ...state,
    totalPages: Math.ceil(total / state.postsPerPage),
  }));

  readonly loadPosts = this.effect((trigger$: Observable<void>) => {
    return trigger$.pipe(
      switchMap(() => {
        const { currentPage, postsPerPage } = this.get();
        const skip = (currentPage - 1) * postsPerPage;
        return this.postService.getPosts(postsPerPage, skip).pipe(
          tap(({ posts, total }) => {
            this.setPosts(posts);
            this.setTotalPages(total);
          })
        );
      })
    );
  });

  readonly changePage = this.effect((page$: Observable<number>) => {
    return page$.pipe(
      tap((page) => {
        const { totalPages } = this.get();
        if (page >= 1 && page <= totalPages) {
          this.setCurrentPage(page);
          this.loadPosts();
        }
      })
    );
  });
}
