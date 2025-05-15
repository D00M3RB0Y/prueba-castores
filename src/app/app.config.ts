import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
  provideAppCheck,
} from '@angular/fire/app-check';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { HttpClientModule } from '@angular/common/http';
import {AngularFireModule} from '@angular/fire/compat'
import {AngularFirestoreModule} from '@angular/fire/compat/firestore'


const firebaseConfig = {
  projectId: 'prueba-castores',
  appId: '1:1061583479803:web:8634b146bd1a271454a15e',
  storageBucket: 'prueba-castores.firebasestorage.app',
  apiKey: 'AIzaSyDi4Gt9rcGMQZHLf4YxsJ59ENAOcleE04s',
  authDomain: 'prueba-castores.firebaseapp.com',
  messagingSenderId: '1061583479803',
  measurementId: 'G-02T6G0W6K4',
};
initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAppCheck(() => {
      // TODO get a reCAPTCHA Enterprise here https://console.cloud.google.com/security/recaptcha?project=_
      const provider = new ReCaptchaEnterpriseProvider(
        '6LeJGzQrAAAAAJbqBcfI6ESe52r5aMH_zyPJ4KxL'
      );
      return initializeAppCheck(undefined, {
        provider,
        isTokenAutoRefreshEnabled: true,
      });
    }),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    importProvidersFrom(HttpClientModule, AngularFireModule.initializeApp(firebaseConfig), AngularFirestoreModule),
  ],
};
