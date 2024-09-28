import { Component, inject, OnInit } from "@angular/core";
import { PostService } from "../../core/services/post.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-post-create",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./post-create.component.html",
  styleUrl: "./post-create.component.scss",
})
export class PostCreateComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _postService = inject(PostService);
  private readonly _router = inject(Router);

  postForm!: FormGroup;

  ngOnInit() {
    this.postForm = this._formBuilder.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      body: ["", [Validators.required, Validators.minLength(10)]],
      userId: [1, Validators.required],
      tags: [""],
    });
  }

  onSubmit() {
    if (!this.postForm.valid) {
      this.postForm.markAllAsTouched();
      return;
    }

    const { value: formValue } = this.postForm;

    this._postService.createPost(formValue).subscribe({
      next: (createdPost) => {
        console.log("Post created:", createdPost);
        this._router.navigate(["/"]);
      },
      error: (error) => {
        console.error("Error creating post:", error);
      },
    });
  }
}
