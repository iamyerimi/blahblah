import { Auth, getAuth } from 'firebase/auth';
import { getApps, initializeApp } from 'firebase/app';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const FirebaseCredentials = {
  apiKey: publicRuntimeConfig.apiKey,
  authDomain: publicRuntimeConfig.authDomain,
  projectId: publicRuntimeConfig.projectId,
};

export default class FirebaseClient {
  private static instance: FirebaseClient;

  private auth: Auth;

  //constructor: constructor 메소드는 클래스의 인스턴스 객체를 생성하고 초기화하는 특별한 메서드이다.
  public constructor() {
    const apps = getApps();

    // app이 한 번도 initialized 돼 있지 않다면,
    if (apps.length === 0) {
      console.info('firebase client init start');
      initializeApp(FirebaseCredentials);
    }
    this.auth = getAuth();
    console.info('firebase auth');
  }

  public static getInstance(): FirebaseClient {
    if (FirebaseClient.instance === undefined || FirebaseClient.instance === null) {
      FirebaseClient.instance = new FirebaseClient();
    }
    return FirebaseClient.instance;
  }

  public get Auth(): Auth {
    return this.auth;
  }
}
