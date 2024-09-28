import { Routes } from '@angular/router';
import { PostListComponent } from './features/post-list/post-list.component';
import { PostCreateComponent } from './features/post-create/post-create.component';
import { PostDetailsComponent } from './features/post-details/post-details.component';

export const routes: Routes = [
    { path: '', component: PostListComponent },
    { path: 'post/:id', component: PostDetailsComponent },
    { path: 'create', component: PostCreateComponent },
];
