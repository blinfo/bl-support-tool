import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appAvatarFallback]',
})
export class AvatarFallbackDirective {
  @Input() appAvatarFallback: string;

  constructor(private elRef: ElementRef) {}

  @HostListener('error')
  loadFallbackOnError(): void {
    const element: HTMLElement = <HTMLElement>this.elRef.nativeElement;
    switch (this.appAvatarFallback) {
      case 'profile-m':
        element.outerHTML = `<i
                     class="rounded-full fas fa-user-circle text-bl-grey-400 text-6xl"
                   ></i>`;
        break;
      case 'profile-s':
        element.outerHTML = `<i
                     class="rounded-full fas fa-user-circle text-bl-grey-400 text-4xl"
                     style="padding-top: 6px"
                   ></i>`;
        break;
      case 'dropdown':
        element.style.backgroundImage = 'none';
        break;
      default:
        element.outerHTML = '';
    }
  }
}
