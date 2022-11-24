import API from './http';

export async function getMe() {
  return API({
    method: 'get',
    url: `/user/me`,
  });
}

export async function logout() {
  return API({
    method: 'post',
    url: `/auth/logout`,
  });
}
