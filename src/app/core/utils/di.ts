import { InjectionToken } from '@angular/core';

export class DI {
  static API_URL = new InjectionToken<string>('API_URL');
}
