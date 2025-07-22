import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-infosecuritycard',
  templateUrl: './infosecuritycard.component.html',
  styleUrl: './infosecuritycard.component.scss'
})
export class InfosecuritycardComponent {
    isDarkTheme: boolean = true;
    isLoading = true;
    famcoin = environment.famcoin; // Variabile per icona Famcoin

    private themeSubscription: Subscription;

    constructor(private http: HttpClient, private themeService: ThemeService){
      this.themeSubscription = this.themeService.isDarkTheme$.subscribe(isDark => {
        //console.log('Theme changed from infocard component:' , isDark); //Debug
        this.isDarkTheme = isDark;
      })
    }

    ngOnInit(): void {
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    }

    ngOnDestroy(): void {
      this.themeSubscription.unsubscribe();
    }

    get infoImage(): string {
      return this.isDarkTheme ? '/assets/images/icons/darkinfo.png' : '/assets/images/icons/lightinfo.png';
    }
    get thoughtImage(): string {
    return this.isDarkTheme ? '/assets/images/icons/darkthought.png' : '/assets/images/icons/lightthought.png';
    }
    get pollImage(): string {
      return this.isDarkTheme ? '/assets/images/icons/darkpoll.png' : '/assets/images/icons/lightpoll.png';
    }

    scrollTo(elementId: string): void {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
}
