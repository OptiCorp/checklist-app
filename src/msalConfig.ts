import { Configuration, LogLevel, PublicClientApplication } from '@azure/msal-browser';

const msalConfig: Configuration = {
  auth: {
    clientId: '8ba934ec-bbfb-45d0-83b8-4add12741ae0', //TODO:
    authority: 'https://login.microsoftonline.com/91020923-529b-458c-8796-98af46bf6003'
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            //console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      }
    }
  }
};

export const scopes = {
  checklistApi: {
    url: '', //todo:
    scopes: [] as string[]
  }
};

export const msalInstance = new PublicClientApplication(msalConfig);
await msalInstance.initialize(); //TODO: verify this
