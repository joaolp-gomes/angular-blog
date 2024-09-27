import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let spectator: Spectator<HeaderComponent>;
  let component: HeaderComponent;

  const createComponent = createComponentFactory({
    component: HeaderComponent,
    mocks: [Router],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });


  it('should navigate to create post page when "Create New Post" button is clicked', () => {
    const router = spectator.inject(Router);
    const createButton = spectator.query('button.create-post') as HTMLElement;
    
    spectator.click(createButton);

    expect(router.navigate).toHaveBeenCalledWith(['/create']);
  });
});
