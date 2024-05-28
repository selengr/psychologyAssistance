import { authHttp } from '@/services/psya_services/core';
import { configResponsive, useResponsive } from 'ahooks';
import { Buffer } from 'buffer';
import { Cookie, LocalStorage } from 'storage-manager-js';

checkLS();
configResponsive({
  large: 1024,
  middle: 600,
  small: 0,
});

function Encoder(data?: any, json?: boolean) {
  let string: string;
  if (json) {
    string = JSON.stringify(data);
  } else {
    string = data.toString();
  }
  const buffer = new Buffer(string);
  return buffer.toString('base64');
}

function Decoder(data?: any) {
  const buffer = new Buffer(data, 'base64');
  return buffer.toString(`utf8`);
}

function LoggedIn() {
  let Auth: any = undefined;
  try {
    Auth = Cookie.get('localAuth');
  } catch (e) {}
  return Auth?.loggedIn;
}

function checkLS() {
  GetMe().then((r) => r);
  try {
    if (!Cookie.has('localAuth')) {
      Cookie.set('localAuth', { loggedIn: false }, { useSecure: true });
      LocalStorage.delete('userData');
    } else {
      StorageInitializer();
    }
  } catch (e) {}
}

function UserInfoData() {
  // const data = JSON.parse(Decoder(localStorage.userData));
  const data = JSON.parse(localStorage.userData);
  const roles: any[] = [];
  let agent: { customID: string; id: string; name: string; roleType: number; type: any; userName: any; userType: string };
  let scope: { customID: string; id: string; name: string; roleType: number; type: number; userName: any; userType: string };
  data.data.agents.forEach((value: { id: string; name: any; type: any }) => {
    agent = {
      customID: 'A-' + value.id,
      id: value.id,
      name: `مدیر ${value.name}`,
      roleType: 1,
      type: value.type,
      userName: data.data.name,
      userType: 'agent',
    };
    roles.push(agent);
  });
  data.data.scopes.forEach((value: { id: string; name: any; type: number; scope_name: any }) => {
    scope = {
      customID: 'S-' + value.id,
      id: value.id,
      name: `کاربر ${value.name}`,
      roleType: 0,
      type: value.type,
      userName: value.scope_name,
      userType: value.type === 1 ? 'user' : 'scope',
    };
    roles.push(scope);
  });
  // const roleData = Encoder(roles, true);
  const roleData = roles

  LocalStorage.set('userRole', roleData);
  Cookie.set('localAuth', { loggedIn: true }, { useSecure: true });

  return { data, roles };
}

function ScreenSize() {
  const responsive = useResponsive();
  const resolution = responsive.large;
  return resolution ? 'web' : 'mobile';
}

function DefaultFontSize() {
  const deviceType = ScreenSize();
  return deviceType === 'web' ? 'web14' : 'mobile10';
}

async function GetMe() {
  let Result: any = false;
  // const auth: boolean = LoggedIn();
  const auth: boolean = true
  if (auth) {
    // Result = await authHttp.me();
    // const data: string = Encoder(Result.data, true);
    

  let data = {
    "data": {
        "id": 3,
        "name": "\u0639\u0644\u06cc \u0645\u062d\u0645\u062f \u0639\u0644\u06cc\u0632\u0627\u062f\u0647",
        "sex": 1,
        "birth": "2001-12-02 00:00:00",
        "role": 2,
        "email": "9365413435",
        "email_verified_at": null,
        "status": 1,
        "last_role": 1,
        "last_role_type": 1,
        "created_at": null,
        "updated_at": "2024-05-25T11:28:56.000000Z",
        "age": 22,
        "mresalatInfo": {
            "mresalat_id": null,
            "national_code": null,
            "merchant_id": "152"
        },
        "agents": [
            {
                "id": 1,
                "type": 2,
                "name": "raya"
            },
            {
                "id": 9,
                "type": 2,
                "name": "\u062a\u0633\u062a \u0631\u0627\u06cc\u0627\u0641\u0636\u0627"
            },
            {
                "id": 10,
                "type": 2,
                "name": "\u0639\u0644\u06cc\u0632\u0627\u062f\u0647"
            }
        ],
        "scopes": [
            {
                "id": 1,
                "type": 2,
                "name": "raya",
                "scope_name": "\u0639\u0644\u06cc \u0645\u062d\u0645\u062f\u0639\u0644\u06cc\u0632\u0627\u062f\u0647"
            },
            {
                "id": 2,
                "type": 3,
                "name": "faza",
                "scope_name": "front"
            },
            {
                "id": 9,
                "type": 2,
                "name": "\u062a\u0633\u062a \u0631\u0627\u06cc\u0627\u0641\u0636\u0627",
                "scope_name": "\u0639\u0644\u06cc \u0639\u0644\u06cc\u0632\u0627\u062f\u0647"
            },
            {
                "id": 3,
                "type": 1,
                "name": "\u0633\u0627\u0645\u0627\u0646\u0647",
                "scope_name": "\u0639\u0644\u06cc \u0645\u062d\u0645\u062f \u0639\u0644\u06cc\u0632\u0627\u062f\u0647"
            }
        ],
        "orders_count": 0,
        "appVersion": "1401-02-05_1"
    }
  }


    LocalStorage.set('userData', data);
    UserInfoData();
  }
  return Result;
}

function StorageInitializer() {
  if (LocalStorage.has('userData') && LocalStorage.has('userRole')) {
    const userData: string = localStorage.userData;
    const userRole: string = localStorage.userRole;
    ClearStorage();
    localStorage.setItem('userData', userData);
    localStorage.setItem('userRole', userRole);
  } else {
    ClearStorage();
  }
}

function ClearStorage() {
  LocalStorage.deleteAll();
}

function ClearCookie() {
  Cookie.deleteAll();
}

function LogOut() {
  // Cookie.set('localAuth', { loggedIn: true }, { useSecure: true });
  ClearCookie();
  ClearStorage();
  sessionStorage.clear();
  window.location.href = '/login';
  window.location.reload();
}

function userAllData() {
  const auth: boolean = LoggedIn();
  return LocalStorage.has('userData') && LocalStorage.has('userRole')
    ? {
        data: LocalStorage.get('userData'),
        roles: LocalStorage.get('userRole'),
        // data: JSON.parse(Decoder(LocalStorage.get('userData'))),
        // roles: JSON.parse(Decoder(LocalStorage.get('userRole'))),
        loggedIn: auth,
      }
    : { roles: '', data: '', loggedIn: false };
}

function extractID() {
  return JSON.parse(Decoder(localStorage.userData)).data.last_role;
}

export { ScreenSize, UserInfoData, checkLS, GetMe, Encoder, Decoder, DefaultFontSize, LogOut, ClearStorage, StorageInitializer, LoggedIn, userAllData, extractID };
