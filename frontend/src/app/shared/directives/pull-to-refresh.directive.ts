import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appPullToRefresh]'
})
export class PullToRefreshDirective {
  @Output() refresh = new EventEmitter<void>();
  @Output() pullProgress = new EventEmitter<number>(); // valore da 0 a 1

  private startY = 0;
  private isPulling = false;
  private readonly maxPull = 250;
  private readonly threshold = 250; // il punto esatto per attivare il refresh
  private currentPull = 0;

  private pullAtLimitSince = 0; // timestamp in ms
  private readonly holdDuration = 300; // 0.8s in ms

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    if (this.el.nativeElement.scrollTop === 0) {
      this.startY = event.touches[0].clientY;
      this.isPulling = true;
      this.pullAtLimitSince = 0;
    }
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (!this.isPulling) return;

    const delta = event.touches[0].clientY - this.startY;
    if (delta > 0) {
      this.currentPull = Math.min(delta, this.maxPull);
      const progress = this.currentPull / this.maxPull;
      this.pullProgress.emit(progress);

      // Se supera la soglia, salva solo il PRIMO timestamp
      if (progress >= 0.95) {
        if (this.pullAtLimitSince === 0) {
          this.pullAtLimitSince = Date.now();
        }
      } else {
        // Se si scende sotto la soglia, azzera
        this.pullAtLimitSince = 0;
      }

      this.renderer.setStyle(this.el.nativeElement, 'transform', `translateY(${this.currentPull}px)`);
      event.preventDefault();
    }
  }

  @HostListener('touchend')
  onTouchEnd(): void {
    if (!this.isPulling) return;

    this.isPulling = false;
    const now = Date.now();
    const heldEnough =
      this.currentPull >= this.threshold &&
      this.pullAtLimitSince > 0 &&
      now - this.pullAtLimitSince >= this.holdDuration;

    this.pullProgress.emit(0);

    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s ease');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');

    setTimeout(() => {
      this.renderer.removeStyle(this.el.nativeElement, 'transition');
    }, 300);

    if (heldEnough) {
      this.refresh.emit();
    }

    this.currentPull = 0;
    this.pullAtLimitSince = 0;
  }
}
