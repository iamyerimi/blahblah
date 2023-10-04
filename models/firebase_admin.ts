// npx yarn add firebase-admin
import * as admin from 'firebase-admin';

interface Config {
  credential: {
    privateKey: string;
    clientEmail: string;
    projectId: string;
  };
}

// Singleton 패턴
export default class FirebaseAdmin {
  public static instance: FirebaseAdmin;

  private init = false;

  public static getInstance(): FirebaseAdmin {
    if (FirebaseAdmin.instance === undefined || FirebaseAdmin.instance === null) {
      // 초기화 진행
      FirebaseAdmin.instance = new FirebaseAdmin();
      // TODO: 환경을 초기화한다.
      FirebaseAdmin.instance.bootstrap();
    }
    return FirebaseAdmin.instance;
  }

  // 환경을 초기화할 때 사용할 메소드
  private bootstrap(): void {
    // 어플리케이션이 등록되어있는지 확인
    const haveApp = admin.apps.length != 0;
    if (haveApp) {
      this.init = true;
      return;
    }

    // config를 활용해서 초기화
    const config: Config = {
      credential: {
        projectId: process.env.projectId || '',
        clientEmail: process.env.clientEmail || '',
        privateKey: (process.env.privateKey || '').replace(/\\n/g, '\n'),
      },
    };
    admin.initializeApp({ credential: admin.credential.cert(config.credential) });
    console.info('bootstrap firebase admin');
  }

  /** firebase를 반환 */
  public get Firebase(): FirebaseFirestore.Firestore {
    if(this.init === false){
        this.bootstrap();
    }
    return admin.firestore();
  }

  public get Auth(): admin.auth.Auth {
    if(this.init === false){
      this.bootstrap();
  }
  return admin.auth();
  }
}
