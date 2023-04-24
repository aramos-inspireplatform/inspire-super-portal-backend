export const RequestEmailTemplates = {
  AlmostThere: 'super_portal_almost_there',
  SuperPortalWelcomeInspire: 'super_portal_welcome_inspire',
} as const;

export const RequestEmailTemplatesSubject = {
  AlmostThere: {
    'pt-br': 'Inspire - Quase lá!',
    'en-us': 'Inspire - Almost there!',
  },
  SuperPortalWelcomeInspire: {
    'pt-br': 'Bem-vindo(a) a Inspire!',
    'en-us': 'Welcome to Inspire!',
  },
} as const;
