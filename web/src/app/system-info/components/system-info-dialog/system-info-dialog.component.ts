import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SystemInfoDialogDataService } from '../../services/system-info-dialog-data.service';
import { SystemInfo } from '../../../shared/models/system-info';
import { TEXT } from '../../../shared/text.constants';

@Component({
  selector: 'app-system-info-dialog',
  templateUrl: './system-info-dialog.component.html',
  styles: [``],
})
export class SystemInfoDialogComponent implements OnInit {
  TEXT = TEXT.systemInfo;
  levels = [
    { title: TEXT.systemInfo.warning, value: 'WARNING' },
    { title: TEXT.systemInfo.info, value: 'INFO' },
    { title: TEXT.systemInfo.beta, value: 'BETA' },
  ];
  systemInfoEntry: SystemInfo;
  systemInfoForm: FormGroup = this.fb.group({
    level: [null, [Validators.required]],
    login: [null, [Validators.required]],
    start: [null, [Validators.required]],
    bank: [null, [Validators.required]],
    expireAtDate: [null],
    expireAtTime: [null],
    active: [null, [Validators.required]],
    message: [null, [Validators.required]],
  });
  constructor(private fb: FormBuilder, private dataService: SystemInfoDialogDataService) {}

  ngOnInit(): void {
    this.systemInfoEntry = this.dataService.systemInfoEntry;
    this.systemInfoForm = this.initForm();
    if (this.systemInfoEntry.id) {
      this.setInitialLabelFromEntry();
    } else {
      this.setInitialLabelOnNewEntry();
    }
    this.systemInfoForm.valueChanges.subscribe(form => {
      this.updateDataService(form);
      this.dataService.formIsValid(this.systemInfoForm.valid);
    });
  }

  initForm(): any {
    return this.fb.group({
      level: [
        this.systemInfoEntry.level ? this.systemInfoEntry.level : this.levels[0].value,
        [Validators.required],
      ],
      login: [null],
      start: [null],
      bank: [null],
      expireAtDate: [

        this.systemInfoEntry.expireAt ? this.systemInfoEntry.expireAt.toString().split(' ', 1)[0] : '',
      ],
      expireAtTime: [

        this.systemInfoEntry.expireAt ? new Date(this.systemInfoEntry.expireAt).toLocaleString('sv-SE',
          { hour: '2-digit', minute: '2-digit' }) : '',
      ],
      active: [this.systemInfoEntry.active],
      message: [this.systemInfoEntry.message, [Validators.required]],
    });
  }

  setInitialLabelFromEntry(): void {
    const form = this.systemInfoForm.controls;
    const label = this.systemInfoEntry.label;
    if (!label) {
      form['login'].patchValue(true);
      form['start'].patchValue(true);
      form['bank'].patchValue(true);
      return;
    }
    if (label.includes('login')) {
      form['login'].patchValue(true);
    } else {
      form['login'].patchValue(false);
    }
    if (label.includes('start')) {
      form['start'].patchValue(true);
    } else {
      form['start'].patchValue(false);
    }
    if (label.includes('bank')) {
      form['bank'].patchValue(true);
    } else {
      form['bank'].patchValue(false);
    }
  }

  setInitialLabelOnNewEntry(): void {
    const form = this.systemInfoForm.controls;
    form['login'].patchValue(false);
    form['start'].patchValue(false);
    form['bank'].patchValue(false);
  }

  updateDataService(form): void {
    const systemInfoEntry: SystemInfo = {
      active: form.active ? 1 : 0,
      createdAt: this.systemInfoEntry.createdAt
        ? this.systemInfoEntry.createdAt
        : this.getCurrentDateTime(),
      expireAt: this.setExpireAt(form.expireAtDate, form.expireAtTime),
      icon: this.systemInfoEntry.icon,
      id: this.systemInfoEntry.id,
      label: this.setLabel(form),
      level: form.level,
      message: form.message,
    };
    this.dataService.systemInfoEntry = systemInfoEntry;
  }

  getCurrentDateTime(): string {
    return new Date().toISOString();
  }

  setLabel(form: any): string {
    let label = '';
    const login = form.login ? 'login' : '';
    const start = form.start ? 'start' : '';
    const bank = form.bank ? 'bank' : '';
    if (login) {
      label = login;
    }
    if (start) {
      label = label ? `${label}, ${start}` : `${start}`;
    }
    if (bank) {
      label = label ? `${label}, ${bank}` : `${bank}`;
    }
    return label;
  }

  setExpireAt(date: string, time: string): string {
    if (!date) {
      return null;
    }
    let dateTime = new Date(date);
    if (time) {
      dateTime.setHours(+time.split(':')[0]);
      dateTime.setMinutes(+time.split(':')[1]);
    }

    return dateTime.toISOString();
  }
}
