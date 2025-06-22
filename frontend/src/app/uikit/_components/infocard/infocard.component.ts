import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-infocard',
  templateUrl: './infocard.component.html',
  styleUrl: './infocard.component.scss'
})
export class InfocardComponent implements OnInit, OnDestroy {
  isDarkTheme: boolean = true;
  isLoading = true;

  private themeSubscription: Subscription;

  constructor(private http: HttpClient, private themeService: ThemeService){
    this.themeSubscription = this.themeService.isDarkTheme$.subscribe(isDark => {
      console.log('Theme changed from infocard component:' , isDark); //Debug
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
