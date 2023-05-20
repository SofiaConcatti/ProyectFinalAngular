import { Component } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent {
  isDarkThemeActive = false;

  constructor(@Inject(DOCUMENT) private document: Document) { }
  onChange(newValue: boolean) {
    if (newValue) {
      this.document.body.classList.add('dark-mode');
    }
    else {
      this.document.body.classList.remove('dark-mode');
    }
  }
}