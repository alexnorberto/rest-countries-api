import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rest-countries-api';
  darkMode = false;

  ngOnInit():void{
  }

  toggleDarkMode():void{
    if (this.darkMode) {
      document.documentElement.style
      .setProperty('--bg', 'var(--lightModeBG)');
      document.documentElement.style
      .setProperty('--elements', 'var(--white)');
      document.documentElement.style
      .setProperty('--input', 'var(--lightModeInput)');
      document.documentElement.style
      .setProperty('--text', 'var(--lightModeTxt)');
      document.getElementById('darkMode-toggle').style.background = 'var(--bg)';
      this.darkMode = false;
    } else {
      document.documentElement.style
      .setProperty('--bg', 'var(--darkModeBG)');
      document.documentElement.style
      .setProperty('--elements', 'var(--darkMode)');
      document.documentElement.style
      .setProperty('--input', 'var(--white)');
      document.documentElement.style
      .setProperty('--text', 'var(--white)');
      this.darkMode = true;
    }
  }

  toggleLoading(value): void{
    document.getElementById("hideLoadingBar").style.display = value;
  }



}
