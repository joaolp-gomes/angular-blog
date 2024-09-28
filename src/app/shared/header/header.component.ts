import { Component, inject } from "@angular/core";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  templateUrl: "./header.component.html",
  imports: [RouterModule],
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  private readonly _router = inject(Router);

  navigateToCreatePost(): void {
    this._router.navigate(["/create"]);
  }
}
