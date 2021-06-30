import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { KeyCreatorService } from '@core/services/key-creator.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DropdownItem } from '@shared/models/dropdown-item';
import { DevSecretService } from '@core/services/http/dev-secret.service';
import { BlSnackbarService } from '@core/services/bl-snackbar.service';
import { MessageType } from '@shared/interfaces/snackbar-message';

@Component({
  selector: 'app-secret-popup',
  templateUrl: './secret-popup.component.html',
  styleUrls: ['./secret-popup.component.css'],
})
export class SecretPopupComponent implements OnInit {
  @Input() publicKey: string;
  @Input() email: string;
  @Input() icon: string;

  blAppUrl = 'https://app.bjornlunden.se/';
  isShowingMenu = false;
  items: DropdownItem[] = [
    { title: 'AGI', value: { userId: 'blapp-agi@blinfo.se', source: 'agi' } },
    {
      title: 'Integration',
      value: { userId: 'blapp-integration@blinfo.se', source: 'integration' },
    },
    { title: 'Finans', value: { userId: this.email, source: 'blfinance' } },
    { title: 'Simple-Credentials', value: this.publicKey },
  ];
  showSpinner = false;

  @HostListener('document:click', ['$event'])
  clickOut(event): void {
    if (!this.element.nativeElement.contains(event.target) && this.isShowingMenu) {
      this.isShowingMenu = !this.isShowingMenu;
    }
  }

  constructor(
    private keyCreator: KeyCreatorService,
    private element: ElementRef,
    private devSecretService: DevSecretService,
    private snackbarService: BlSnackbarService,
  ) {}

  ngOnInit(): void {}

  createKey(item: DropdownItem): void {
    this.showSpinner = true;
    this.getKey(item).subscribe(key => {
      this.showSpinner = false;
      this.copyToClipboard(key);
    });
  }

  copyToClipboard(text: string): void {
    window.navigator.clipboard
      .writeText(text)
      .then(() => {
        this.showSnackbar();
        console.log(text);
      });
  }

  showMenu(): void {
    this.isShowingMenu = !this.isShowingMenu;
  }

  getKey(item: DropdownItem): Observable<string> {
    this.isShowingMenu = false;
    if (item.title === 'Simple-Credentials') {
      return this.devSecretService.getSimpleCredentials(this.publicKey);
    }
    return this.getKeyFromDataSafe(item.value);
  }

  getKeyFromDataSafe(item: QueryLogin): Observable<string> {
    const encodedSecret = this.keyCreator.encode(item.userId, this.publicKey, item.source);
    return this.keyCreator
      .postToDataSafe(encodedSecret)
      .pipe(map(key => `${this.blAppUrl}${item.source}?key=${key}`));
  }

  showSnackbar(): void {
    this.snackbarService.show({
      headerText: 'Nyckel skapad',
      contentText: `Kopierat till urklipp`,
      type: MessageType.SUCCESS,
      dismissable: true,
      duration: 10000
    });
  }
}

interface QueryLogin {
  userId: string;
  source: string;
}
