import { createServiceFactory, SpectatorService, mockProvider } from "@ngneat/spectator/jest";
import { PostListStore } from "./post-list.store";
import { PostService } from "../../core/services/post.service";
import { Observable, of } from "rxjs";
import { Post } from "../../core/entities/post.model";
import { PostResponse } from "../../core/entities/post-response.model";

describe("PostListStore", () => {
  let spectator: SpectatorService<PostListStore>;
  let store: PostListStore;
  let postService: jest.Mocked<PostService>;

  const createService = createServiceFactory({
    service: PostListStore,
    providers: [
      mockProvider(PostService, {
        getPosts: jest.fn(),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createService();
    store = spectator.service;
    postService = spectator.inject(PostService) as jest.Mocked<PostService>;
  });

  describe("Selectors", () => {
    it("should select posts", (done) => {
      const mockPosts: Post[] = [{ id: 1, title: "Test Post" } as Post];
      store.setPosts(mockPosts);

      store.posts$.subscribe((posts) => {
        expect(posts).toEqual(mockPosts);
        done();
      });
    });

    it("should select currentPage", (done) => {
      store.setCurrentPage(2);

      store.currentPage$.subscribe((page) => {
        expect(page).toBe(2);
        done();
      });
    });

    it("should select totalPages", (done) => {
      store.setTotalPages(50);

      store.totalPages$.subscribe((total) => {
        expect(total).toBe(5);
        done();
      });
    });
  });

  describe("Updaters", () => {
    it("should update currentPage", (done) => {
      store.setCurrentPage(3);
      store.currentPage$.subscribe((page) => {
        expect(page).toBe(3);
        done();
      });
    });

    it("should update posts", (done) => {
      const mockPosts: Post[] = [
        { id: 1, title: "Test Post" },
        { id: 2, title: "Another Test Post" },
      ] as Post[];
      store.setPosts(mockPosts);
      store.posts$.subscribe((posts) => {
        expect(posts).toEqual(mockPosts);
        done();
      });
    });

    it("should update totalPages", (done) => {
      store.setTotalPages(50);
      store.totalPages$.subscribe((total) => {
        expect(total).toBe(5);
        done();
      });
    });
  });

  describe("Effects", () => {
    it("should load posts", (done) => {
      const mockPosts: Post[] = [{ id: 1, title: "Test Post" }] as Post[];
      postService.getPosts.mockReturnValue(of({ posts: mockPosts, total: 1, skip: 0, limit: 10 }) as Observable<PostResponse>);

      store.loadPosts();

      store.posts$.subscribe((posts) => {
        expect(postService.getPosts).toHaveBeenCalledWith(10, 0);
        expect(posts).toEqual(mockPosts);
        done();
      });
    });

    it("should change page and load posts", (done) => {
      const mockPosts: Post[] = [{ id: 2, title: "Second Page Post" }] as Post[];
      postService.getPosts.mockReturnValue(of({ posts: mockPosts, total: 15, skip: 10, limit: 10 }) as Observable<PostResponse>);

      store.setTotalPages(15);
      store.changePage(2);

      store.posts$.subscribe((posts) => {
        expect(postService.getPosts).toHaveBeenCalledWith(10, 10);
        expect(posts).toEqual(mockPosts);
        done();
      });
    });
  });
});
