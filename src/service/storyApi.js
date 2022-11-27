import API from './http';

export async function getUserAllStory() {
  return API({
    method: 'get',
    url: `/users/stories`,
  });
}

export async function createStory(userId, data) {
  return API({
    method: 'post',
    url: `/users/${userId}/stories`,
    data,
  });
}

export async function getStory(params) {
  return API({
    method: 'get',
    url: `/users/stories/${params}`,
  });
}

export async function patchStory(userId, storyId, data) {
  return API({
    method: 'patch',
    url: `/users/${userId}/stories/${storyId}`,
    data,
  });
}

export async function deleteStory(userId, storyId) {
  return API({
    method: 'delete',
    url: `/users/${userId}/stories/${storyId}`,
  });
}
