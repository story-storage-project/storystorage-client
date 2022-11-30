import API from './http';

export async function createStory(userId, data) {
  return API({
    method: 'post',
    url: `/users/${userId}/stories`,
    data,
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
