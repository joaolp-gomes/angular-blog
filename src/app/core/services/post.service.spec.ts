import { createHttpFactory, HttpMethod, SpectatorHttp } from "@ngneat/spectator/jest";
import { PostService } from "./post.service";
import { PostResponse } from "../entities/post-response.model";
import { Post } from "../entities/post.model";

describe("PostService", () => {
  let spectator: SpectatorHttp<PostService>;
  const createHttp = createHttpFactory(PostService);

  beforeEach(() => (spectator = createHttp()));

  describe("getPosts", () => {
    it("should get posts with default parameters", () => {
      const mockResponse: PostResponse = {
        posts: [{ id: 1, title: "Test Post", body: "This is a test post body", userId: 1, tags: ["test"] } as Post],
        total: 1,
        skip: 0,
        limit: 10,
      };

      spectator.service.getPosts().subscribe((response) => {
        expect(response).toEqual({
          ...mockResponse,
          posts: [
            {
              ...mockResponse.posts[0],
              body: "This is a test post body",
            },
          ],
        });
      });

      const req = spectator.expectOne("https://dummyjson.com/posts?limit=10&skip=0&select=id,title,body,userId,tags,reactions&sortBy=id&order=desc", HttpMethod.GET);
      req.flush(mockResponse);
    });
  });

  describe("getPostById", () => {
    it("should get a post by id", () => {
      const mockPost: Post = { id: 1, title: "Test Post", body: "This is a test post body", userId: 1, tags: ["test"] } as Post;

      spectator.service.getPostById(1).subscribe((post) => {
        expect(post).toEqual(mockPost);
      });

      const req = spectator.expectOne("https://dummyjson.com/posts/1", HttpMethod.GET);
      req.flush(mockPost);
    });
  });
});
