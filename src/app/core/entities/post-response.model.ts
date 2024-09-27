import { Post } from "./post.model";

export interface PostResponse {
    posts: Post[];
    total: number;
    skip: number;
    limit: number;
}