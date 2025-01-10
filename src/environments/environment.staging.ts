// Staging environment
export const environment = {
  production: false,
  appName: 'DigiCoffer-Staging',
  apiVersion: 'v1',
  apis: {
    digicoffer: {
      baseUrl: 'https://staging-api.digicoffer.com/consumer',
      endpoints: {
        login: '/login',
        register: '/register',
        emailVerification: {
          resendToken: '/register/email/token/resend',
          verifyToken: '/register/email/token/verify'
        },
        forgotPassword: {
          sendEmail: '/forgot/email',
          verifyToken: '/forgot/email/token/verify'
        },
        relationships: '/relationships',
        reminders: '/reminders'
      }
    },
    vitagist: {
      baseUrl: 'https://staging-api.vitagist.com/api/v1',
      endpoints: {
        createUser: '/user/create',
        medicationLog: '/consumer/medicationlog',
        activityLog: '/consumer/activitylog'
      }
    }
  },
  auth: {
    tokenKey: 'auth_token',
    refreshTokenKey: 'refresh_token',
    tokenExpiryKey: 'token_expiry',
    userKey: 'current_user'
  },
  googleAuth: {
    clientId: 'your-staging-google-client-id'
  }
};
