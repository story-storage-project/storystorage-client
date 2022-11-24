function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export default {
  base: required('REACT_APP_BASE_URL'),

  googleOauth: {
    clientId: required('REACT_APP_GOOGLE_OAUTH_CLIENT_ID'),
    clientSecret: required('REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET'),
    endPoint: required('REACT_APP_GOOGLE_OAUTH_ENDPOINT'),
    redirect: required('REACT_APP_GOOGLE_OAUTH_REDIRECT'),
  },
};
