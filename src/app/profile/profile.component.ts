import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  isClickedFirst: boolean = false;
  isClickedSecond: boolean = false;

  onClick(ev: Event) {
    const target = ev.target as HTMLElement;

    if (target.className.includes('first')) {
      this.isClickedFirst = !this.isClickedFirst;
      this.isClickedSecond = false;
    } else {
      this.isClickedSecond = !this.isClickedSecond;
      this.isClickedFirst = false;
    }
  }
}
