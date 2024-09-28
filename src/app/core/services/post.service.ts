import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { PostResponse } from "../entities/post-response.model";
import { Post } from "../entities/post.model";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private readonly _http = inject(HttpClient);
  private readonly API_URL = "https://dummyjson.com/posts";

  getPosts(limit: number = 10, skip: number = 0): Observable<PostResponse> {
    return this._http.get<PostResponse>(`${this.API_URL}?limit=${limit}&skip=${skip}&select=id,title,body,userId,tags,reactions&sortBy=id&order=desc`).pipe(
      map((response) => ({
        ...response,
        posts: response.posts.map((post) => ({
          ...post,
          body: this.shortenBody(post.body),
        })),
      }))
    );
  }

  private shortenBody(body: string, maxLength: number = 200): string {
    if (body.length <= maxLength) {
      return body;
    }

    return `${body.substring(0, maxLength)}...`;
  }

  getPostById(id: number): Observable<Post> {
    return this._http.get<Post>(`${this.API_URL}/${id}`);
  }

  createPost(post: Post): Observable<Post> {
    return this._http.post<Post>(`${this.API_URL}/add`, post);
  }
}
