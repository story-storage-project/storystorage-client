const getGoogleUrl = from => {
  const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

  const options = {
    redirect_uri:
      process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT ||
      process.env.STORYBOOK_REACT_APP_GOOGLE_OAUTH_REDIRECT,
    client_id:
      process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID ||
      process.env.STORYBOOK_REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
    state: from,
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
};

export default getGoogleUrl;
