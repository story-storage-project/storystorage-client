import API from './http';

export async function getUserStory() {
  return API({
    method: 'get',
    url: `/users/stories`,
  });
}

export async function getStory(params) {
  return API({
    method: 'get',
    url: `/users/stories/${params}`,
  });
}

export async function createStory(data) {
  return API({
    method: 'post',
    url: `/users/stories`,
    data,
  });
}

export async function updateStory(userId, storyId) {
  return API({
    method: 'post',
    url: `/users/${userId}/stories/${storyId}`,
  });
}
