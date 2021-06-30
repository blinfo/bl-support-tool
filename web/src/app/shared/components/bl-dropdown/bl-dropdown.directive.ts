import { Directive, TemplateRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdownRootNotSelected]',
})
export class DropdownRootNotSelectedDirective {
  constructor(public tpl: TemplateRef<any>) {}
}

@Directive({
  selector: '[appDropdownRoot]',
})
export class DropdownRootDirective {
  constructor(public tpl: TemplateRef<any>) {}
}

@Directive({
  selector: '[appDropdownRootSelected]',
})
export class DropdownRootSelectedDirective {
  constructor(public tpl: TemplateRef<any>) {}
}

@Directive({
  selector: '[appDropdownHeader]',
})
export class DropdownHeaderDirective {
  constructor(public tpl: TemplateRef<any>) {}
}

@Directive({
  selector: '[appDropdownOption]',
})
export class DropdownOptionDirective {
  constructor(public tpl: TemplateRef<any>) {}
}

@Directive({
  selector: '[appDropdownOptionSelected]',
})
export class DropdownOptionSelectedDirective {
  constructor(public tpl: TemplateRef<any>) {}
}

@Directive({
  selector: '[appMouseListener]',
})
export class MouseListenerDirective {
  @Output() mouseEnter = new EventEmitter();
  @Output() mouseLeave = new EventEmitter();
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.mouseEnter.emit();
  }
  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.mouseLeave.emit();
  }
}
