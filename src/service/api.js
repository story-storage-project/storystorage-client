import API from './http';

export async function getUserStory() {
  return API({
    method: 'get',
    url: `/users/stories`,
  });
}

export async function createStory(data) {
  return API({
    method: 'post',
    url: `/users/stories`,
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
    method: 'post',
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
