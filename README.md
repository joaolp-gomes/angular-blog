# AngularBlog

This project is a blog post application using the [DummyJSON API](https://dummyjson.com/). It was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.6.

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (v18 or later)
- npm (v9 or later)
- Angular CLI (v18.2.6)

## Development server

Run `npm install` to install the dependencies.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

This project uses Jest as the test runner and Spectator for creating Angular tests. To execute the unit tests, run:

```bash
ng test
```

## State Management

The application uses NgRx Component Store for state management, specifically to manage the list of posts and pagination.

## Folder Structure

```
src/
├── app/
│   ├── core/
│   │   └── services/
│   │       └── post.service.ts
│   ├── features/
│   │   ├── post-create/
│   │   │   └── post-create.component.scss
│   │   └── post-list/
│   │       ├── post-list.store.ts
│   │       └── post-list.store.spec.ts
│   └── shared/
│       ├── header/
│       │   └── header.component.spec.ts
│       └── post-card/
│           └── post-card.component.html
```

This structure organizes the application into:

- `core`: Contains essential services like the `post.service.ts`
- `features`: feature-specific components and stores
- `shared`: Includes reusable components like the header and post-card
