import { Injectable } from '@angular/core';
import { ConnectionHttpService } from '@core/services/http/connection-http.service';
import { Actions } from '@ngrx/effects';
import {
} from './connnection.actions';

@Injectable()
export class ConnectionEffects {
  constructor(private actions$: Actions, private connectionHttpService: ConnectionHttpService) {}
}
