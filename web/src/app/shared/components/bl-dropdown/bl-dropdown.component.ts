import {
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  HostListener,
  OnDestroy,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  DropdownRootNotSelectedDirective,
  DropdownRootSelectedDirective,
  DropdownOptionDirective,
  DropdownOptionSelectedDirective,
  DropdownHeaderDirective,
  DropdownRootDirective,
} from './bl-dropdown.directive';
import { IDropdownItem, DropdownTypeEnum } from '@app/shared/interfaces/dropdown-item';

@Component({
  selector: 'app-bl-dropdown',
  templateUrl: './bl-dropdown.component.html',
  styleUrls: ['./bl-dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlDropdownComponent implements OnDestroy, AfterViewInit, OnChanges {
  @ViewChild('rootRef') rootRef: ElementRef;
  @ViewChild('virtualScrollRef') virtualScrollRef: ElementRef;
  @ViewChild('menuRef') menuRef: ElementRef;
  @ViewChild('defaultRootNotSelectedTpl')
  defaultRootNotSelectedTpl: TemplateRef<any>;
  @ViewChild('defaultRootSelectedTpl')
  defaultRootSelectedTpl: TemplateRef<any>;
  @ViewChild('defaultOptionTpl')
  defaultOptionTpl: TemplateRef<any>;
  @ViewChild('defaultOptionSelectedTpl')
  defaultOptionSelectedTpl: TemplateRef<any>;

  @ContentChild(DropdownRootDirective, { read: TemplateRef })
  rootTpl: TemplateRef<any>;
  @ContentChild(DropdownRootNotSelectedDirective, {
    read: TemplateRef,
  })
  rootNotSelectedTpl: TemplateRef<any>;
  @ContentChild(DropdownRootSelectedDirective, {
    read: TemplateRef,
  })
  rootSelectedTpl: TemplateRef<any>;
  @ContentChild(DropdownHeaderDirective, { read: TemplateRef })
  headerTpl: TemplateRef<any>;
  @ContentChild('dropDownHeaderRef') dropDownHeaderRef: ElementRef;
  @ContentChild(DropdownOptionDirective, { read: TemplateRef })
  optionTpl: TemplateRef<any>;
  @ContentChild(DropdownOptionSelectedDirective, {
    read: TemplateRef,
  })
  optionSelectedTpl: TemplateRef<any>;

  @Input() items: IDropdownItem[];
  @Input() value!: IDropdownItem;
  @Input() hover = false;
  @Input() closeMenuOnRootClick = true;
  @Input() disabled = false;
  @Input() titleClass: string;
  @Input() isButton = false;
  @Input() isMultirowDropdown = false;
  @Input() useThresholdEvent = false;
  @Input() maxHeight = 259;
  @Input() listItemHeight = 37;
  @Output() valueChange: EventEmitter<IDropdownItem>;
  @Output() tabKey: EventEmitter<Event>;
  @Output() enterKey: EventEmitter<Event>;
  @Output() escKey: EventEmitter<Event>;
  @Output() mouseClick: EventEmitter<{ action: string }>;
  @Output() scrollEvent: EventEmitter<{ currentPage: number }>;

  public isShowingMenu: boolean;
  private changeDetectorRef: ChangeDetectorRef;
  private dropdownTimeoutId;
  public highlightedItem: IDropdownItem;
  private highlightedIndex = -1;
  private isParentAutocompelete = false;
  private autocompleteHeight = 0;
  private currentItemPage = 1;
  private recentlyUpdated = false;
  public virtualScrollStyle = {
    height: 'unset',
    width: 'unset',
    'padding-right.px': 0,
  };

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.handleMousedown(event);
  }
  @HostListener('window:keyup.esc')
  onEsc(): void {
    if (this.isShowingMenu) {
      const event = new Event('EscKeyEvent', { cancelable: true });
      this.escKey.emit(event);

      if (!event.defaultPrevented) {
        this.hideMenu();
      }
    }
  }
  @HostListener('window:keyup.enter', ['$event'])
  onEnter(event: KeyboardEvent): void {
    if (this.isShowingMenu) {
      this.enterKey.emit(event);

      if (!event.defaultPrevented) {
        this.selectValue(this.items.hasValues() ? this.highlightedItem : undefined);
      }
    }
  }
  @HostListener('window:keydown.tab', ['$event'])
  onTab(event: KeyboardEvent): void {
    if (this.isShowingMenu) {
      this.tabKey.emit(event);

      if (!event.defaultPrevented) {
        this.selectValue(this.items.hasValues() ? this.highlightedItem : undefined);
      }
    }
  }
  @HostListener('window:keyup', ['$event'])
  onKeyup(event: KeyboardEvent): void {
    const upKeys = ['Up', 'ArrowUp'];
    const downKeys = ['Down', 'ArrowDown'];
    const isUpKey = (key: string) => upKeys.includes(key);
    const isDownKey = (key: string) => downKeys.includes(key);
    const isValidKey = (key: string) => isUpKey(key) || isDownKey(key);

    if (this.isShowingMenu && this.items.hasValues() && isValidKey(event.key)) {
      const decrease = () =>
        this.highlightedIndex <= 0 ? this.items.length - 1 : this.highlightedIndex - 1;
      const increase = () =>
        this.highlightedIndex >= this.items.length - 1 ? 0 : this.highlightedIndex + 1;

      this.highlightedIndex = isUpKey(event.key) ? decrease() : increase();
      this.highlightedItem = this.items[this.highlightedIndex];

      setTimeout(() => this.scrollToHighlightedItem(), 0);
    }
  }
  @HostListener('window:resize')
  onResize(): void {
    if (this.isShowingMenu) {
      this.hideMenu();
      this.showMenu(false);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    if (this.isShowingMenu) {
      this.hideMenu();
      this.showMenu(false);
    }
  }

  @HostListener('window:blTableScroll')
  onBlTableScroll(): void {
    this.hideMenu();
  }

  @HostListener('mouseenter')
  mouseenter(): void {
    if (this.hover) {
      this.showMenu();
    }
  }

  @HostListener('mouseleave')
  mouseout(): void {
    if (this.hover) {
      this.dropdownTimeoutId = setTimeout(() => {
        this.hideMenu();
      }, 100);
    }
  }

  get rootTemplate(): TemplateRef<any> {
    if (this.rootTpl) {
      return this.rootTpl;
    } else if (this.value) {
      return this.rootSelectedTpl || this.defaultRootSelectedTpl;
    }
    return this.rootNotSelectedTpl || this.defaultRootNotSelectedTpl;
  }

  get dropdownRootTplContext(): object {
    return this.value ? { $implicit: this.value } : undefined;
  }

  constructor(changeDetectorRef: ChangeDetectorRef) {
    this.changeDetectorRef = changeDetectorRef;

    this.isShowingMenu = false;
    this.valueChange = new EventEmitter();
    this.tabKey = new EventEmitter();
    this.enterKey = new EventEmitter();
    this.escKey = new EventEmitter();
    this.mouseClick = new EventEmitter();
    this.scrollEvent = new EventEmitter();
  }

  ngOnDestroy(): void {
    if (this.menuRef) {
      this.getParent().removeChild(this.menuRef.nativeElement);
    }
  }

  ngAfterViewInit(): void {
    this.getParent().appendChild(this.menuRef.nativeElement);
    this.drawMenuOptions(); // Init position of the menu.
    setTimeout(() => {
      this.changeDetectorRef.markForCheck();
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.items && this.isShowingMenu) {
      let currentSelectedValueIndex = -1;

      if (this.value && this.items) {
        currentSelectedValueIndex = this.items.findIndex((item) =>
          this.isMatchingItems(item, this.value),
        );
      }

      this.setHighlightedItem(currentSelectedValueIndex);

      setTimeout(() => {
        this.drawMenuOptions();
        // this.drawMenuOptions2();
        this.scrollToHighlightedItem();
      }, 0);
    }
  }

  getParent(): any {
    // if this dropdown is child to a autocompelete component, get that parent - otherwise take the body as parent
    const parent = this.getAutocompleteParentIfExists();

    return parent ? this.processAutocompleteParent(parent) : document.body;
  }

  getAutocompleteParentIfExists(): any {
    return this.findParent('app-bl-autocomplete');
  }

  findParent(tagName: string): any {
    if (this.rootRef.nativeElement.closest) {
      return this.rootRef.nativeElement.closest(tagName);
    }
    return this.closestPolyfill(this.rootRef.nativeElement, tagName);
  }

  closestPolyfill(el: any, sel: any): any {
    // tslint:disable-next-line:no-conditional-assignment
    while ((el = el.parentElement) && !(el.matches || el.matchesSelector).call(el, sel)) { }
    return el;
  }

  processAutocompleteParent(parent: any): any {
    // get the parent of the autocompelete node so we can place the menu container at the same level as autocomplete component
    const parentOfAutocompelete = parent.parentNode;

    this.isParentAutocompelete = true;
    // get the height of the autocomplete to place the dropdown at right position
    this.autocompleteHeight = parent.firstChild.getBoundingClientRect().height;
    // set the menu options container to use absolute position (instead of fixed)
    this.menuRef.nativeElement.style.position = 'absolute';

    // the parent of autocomplete must have position relative to make the menu options to be placed at the right position
    if (
      !parentOfAutocompelete.classList.contains('relative') &&
      parentOfAutocompelete.style.position !== 'relative'
    ) {
      parentOfAutocompelete.style.position = 'relative';
    }

    return parentOfAutocompelete;
  }

  setHighlightedItem(currentSelectedValueIndex: number): void {
    if (currentSelectedValueIndex >= 0) {
      this.highlightedIndex = currentSelectedValueIndex;
    } else {
      const customOptionsCount = this.items.filter((i) => i.type !== DropdownTypeEnum.DEFAULT)
        .length;
      const defaultOptionCount = this.items.length - customOptionsCount;

      this.highlightedIndex = defaultOptionCount > 0 ? customOptionsCount : customOptionsCount - 1;
    }

    this.highlightedItem =
      this.highlightedIndex >= 0 ? this.items[this.highlightedIndex] : undefined;
  }

  optionTemplate(item: IDropdownItem): TemplateRef<any> {
    if (!!this.value && this.isMatchingItems(item, this.value)) {
      return this.optionSelectedTpl || this.defaultOptionSelectedTpl;
    }
    return this.optionTpl || this.defaultOptionTpl;
  }

  onMenuRefMouseEnter(): void {
    if (this.hover) {
      clearTimeout(this.dropdownTimeoutId);
    }
  }
  onMenuRefMouseLeave(): void {
    if (this.hover) {
      this.hideMenu();
    }
  }

  onVirtualScrollRefScroll(event: any): void {
    if (!this.useThresholdEvent) {
      return;
    }
    const loadNewItemsThreshold = 1000;
    if (
      !this.recentlyUpdated &&
      event.srcElement.scrollTop + loadNewItemsThreshold >= event.srcElement.scrollHeight
    ) {
      this.scrollEvent.emit({ currentPage: ++this.currentItemPage });
      this.showMenu(false);
      this.recentlyUpdated = true;
    }
  }

  handleMousedown(event: MouseEvent): void {
    if (this.isShowingMenu && this.menuRef.nativeElement.contains(event.target)) {
      this.mouseClick.emit({ action: 'MENU_ITEM' });
    }
    if (this.isShowingMenu && this.rootRef.nativeElement.contains(event.target)) {
      this.mouseClick.emit({ action: 'ROOT_ITEM' });
    }

    if (
      this.isShowingMenu &&
      !this.rootRef.nativeElement.contains(event.target) &&
      !this.menuRef.nativeElement.contains(event.target)
    ) {
      this.mouseClick.emit({ action: 'OUTSIDE_MENU' });
      this.hideMenu();
    }
  }

  hasHighlightedItem(): boolean {
    return !!this.highlightedItem;
  }

  selectHighlightedItem(): void {
    this.selectValue(this.highlightedItem);
  }

  hideMenu(): void {
    if (this.isShowingMenu) {
      this.changeDetectorRef.markForCheck();
    }
    this.isShowingMenu = false;
    this.highlightedItem = undefined;
    this.highlightedIndex = -1;
  }

  public trackByKey(index, item): any {
    return item._key ? item._key : item.title;
  }

  public isMatchingItems(item1: IDropdownItem, item2: IDropdownItem): boolean {
    const isFreeTextItem = (dropdownItem: IDropdownItem) =>
      dropdownItem.type === DropdownTypeEnum.CUSTOM_FREETEXT_OPTION;
    const compareValue = (dropdownItem: IDropdownItem) =>
      dropdownItem.compareValue ||
      (isFreeTextItem(dropdownItem) ? dropdownItem.customConfig.originalText : dropdownItem.title);

    return compareValue(item1) === compareValue(item2);
  }

  public onMenuItemClicked(value: IDropdownItem): void {
    this.selectValue(value);
  }

  public selectValue(value: IDropdownItem): void {
    if (!value) {
      this.changeDetectorRef.markForCheck();
      this.hideMenu();

      setTimeout(() => {
        this.valueChange.emit(undefined);
      }, 0);
      return;
    }

    if (!value.readOnly) {
      this.changeDetectorRef.markForCheck();
      this.hideMenu();

      if (this.value !== value) {
        setTimeout(() => {
          this.valueChange.emit({ ...value });
        }, 0);
      }
    }
  }

  public showMenu(scrollMenuToTop = true): void {
    if (this.disabled) {
      return;
    }

    if (!this.isShowingMenu) {
      this.isShowingMenu = true;

      if (this.value && this.items) {
        const currentSelectedValueIndex = this.items.findIndex((item) =>
          this.isMatchingItems(item, this.value),
        );

        if (currentSelectedValueIndex >= 0) {
          this.highlightedIndex = currentSelectedValueIndex;
          this.highlightedItem = this.items[currentSelectedValueIndex];
        }
      }
      this.drawMenuOptions();
      // this.drawMenuOptions2();
      setTimeout(() => {
        if (scrollMenuToTop) {
          this.scrollListToTop();
        }
        this.scrollToHighlightedItem();
      }, 0);
    } else if (this.closeMenuOnRootClick) {
      this.hideMenu();
    }
  }

  drawMenuOptions(): void {
    if (this.isParentAutocompelete) {
      const rootRect = this.rootRef.nativeElement.getBoundingClientRect();

      this.menuRef.nativeElement.style.top = `${this.autocompleteHeight}px`;
      this.menuRef.nativeElement.style.width = `100%`;
      this.menuRef.nativeElement.style.minWidth = `${rootRect.width}px`;
      this.menuRef.nativeElement.style.maxHeight = `${this.maxHeight}px`;
      this.virtualScrollStyle.width = `${rootRect.width}px`;
      this.virtualScrollStyle.height = `${this.maxHeight}px`;

      // "collapse" the height of the menu if it's the initialize of the menu
      if (!this.isShowingMenu) {
        this.menuRef.nativeElement.style.minHeight = 'auto';
        this.menuRef.nativeElement.style.height = '0px';
        return;
      }

      this.menuRef.nativeElement.style.minHeight = '50px';
      this.menuRef.nativeElement.style.height = 'auto';

      const menuRect = this.menuRef.nativeElement.getBoundingClientRect();
      const documentHeight = document.documentElement.clientHeight;

      // if menu options is near the document bottom the height is recalculated
      if (documentHeight < menuRect.top + menuRect.height) {
        const diff = menuRect.bottom - documentHeight;
        const height = menuRect.height - diff - 10;
        this.menuRef.nativeElement.style.height = `${height}px`;
      }

      return;
    }

    this.drawMenuOptionsForParentBody();
  }

  // Note - menu option placed on body has position "fixed"
  drawMenuOptionsForParentBody(): void {
    const rootRect = this.rootRef.nativeElement.getBoundingClientRect();
    let headerHeight = 0;
    if (this.dropDownHeaderRef?.nativeElement) {
      const dropDownHeaderRect = this.dropDownHeaderRef.nativeElement.getBoundingClientRect();
      headerHeight = dropDownHeaderRect.height;
    }
    const rootTop = rootRect.top;

    this.menuRef.nativeElement.style.left = `${rootRect.left}px`;
    this.menuRef.nativeElement.style.top = `${rootTop}px`;
    this.menuRef.nativeElement.style.width = null;
    this.menuRef.nativeElement.style.minWidth = `${rootRect.width}px`;
    this.menuRef.nativeElement.style.height = null;

    this.changeDetectorRef.detectChanges();

    const windowHeight = document.documentElement.clientHeight;
    const menuRect = this.menuRef.nativeElement.getBoundingClientRect();

    const minLeft = 10;
    const maxTop = 40;
    const maxBottom = windowHeight - 10;

    const adjustedRect = {
      left: rootRect.right - (menuRect.right - menuRect.left),
      right: rootRect.right,
      top: menuRect.top + rootRect.height,
      bottom: menuRect.bottom + rootRect.height,
    };

    if (adjustedRect.left < minLeft) {
      adjustedRect.left = rootRect.left;
      adjustedRect.right = rootRect.left + (menuRect.right - menuRect.left);
    }

    if (adjustedRect.bottom > maxBottom) {
      adjustedRect.top = rootTop - (menuRect.bottom - menuRect.top);
      if (
        adjustedRect.top < maxTop &&
        windowHeight - rootTop > rootTop // kollar om det är mer plats ovanför
      ) {
        adjustedRect.top = menuRect.top + rootRect.height;
        adjustedRect.bottom = Math.min(maxBottom, this.maxHeight + adjustedRect.top);
      } else {
        adjustedRect.bottom = rootTop;
        adjustedRect.top = Math.max(adjustedRect.top, maxTop);
        const tempHeight = Math.min(adjustedRect.bottom - adjustedRect.top, this.maxHeight);
        adjustedRect.top = adjustedRect.bottom - tempHeight;
      }
    }

    adjustedRect.left = Math.max(adjustedRect.left, minLeft);

    this.menuRef.nativeElement.style.top = `${adjustedRect.top}px`;
    this.menuRef.nativeElement.style.left = `${adjustedRect.left}px`;
    if (this.items.length * this.listItemHeight > this.maxHeight) {
      this.menuRef.nativeElement.style.height = `${this.maxHeight + headerHeight}px`;
      const styles = {
        height: `${this.maxHeight + headerHeight}px`,
        width: `${menuRect.width}px`,
        'padding-right.px': 10,
      };
      this.virtualScrollStyle = { ...styles };
    } else {
      this.menuRef.nativeElement.style.height = `${
        headerHeight + this.items.length * this.listItemHeight
      }px`;
      const styles = {
        height: `${headerHeight + this.items.length * this.listItemHeight}px`,
        width: `${menuRect.width}px`,
        'padding-right.px': 0,
      };
      this.virtualScrollStyle = { ...styles };
    }
    this.changeDetectorRef.markForCheck();
  }

  scrollToHighlightedItem(): any {
    if (this.recentlyUpdated) {
      this.recentlyUpdated = false;
      return;
    }
    const element = document.querySelector('.highlighted-item');

    if (!element) {
      return;
    }

    // @ts-ignore
    if (element.scrollIntoViewIfNeeded) {
      // @ts-ignore
      return element.scrollIntoViewIfNeeded();
    }

    element.scrollIntoView({ block: 'end' });
  }

  scrollListToTop(): void {
    if (this.menuRef && this.menuRef.nativeElement && this.menuRef.nativeElement.scrollTo) {
      this.menuRef.nativeElement.scrollTo(0, 0);
    }
  }
}
