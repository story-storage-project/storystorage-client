// src/mocks/handlers.js
import { rest } from 'msw';
import templates from 'data/templates/templates';

const mockTemplates = templates['template-button'].map(template => {
  const copy = { ...template };
  copy.author = '6382e288e3b1623a23e22ce7';
  return copy;
});

const baseURL = process.env.REACT_APP_BASE_URL;

const handlers = [
  rest.get(`${baseURL}/user/me`, async (req, res, ctx) =>
    res(
      ctx.json({
        data: {
          _id: '6382e288e3b1623a23e22ce7',
          name: 'alex',
          email: 'alexalex@mgmail.com',
          picture:
            'https://lh3.googleusercontent.com/a/ALm5wu3pKmTTwgjlqEK2dUnq6F8cr5sGGjJEd5lajadpUw=s96-c',
          elementList: mockTemplates,
          __v: 39,
        },
      }),
    ),
  ),

  rest.post(`${baseURL}/auth/logout`, async (req, res, ctx) =>
    res(ctx.json({ result: 'success ' })),
  ),

  rest.post(
    `${baseURL}/users/6382e288e3b1623a23e22ce7/stories`,
    async (req, res, ctx) =>
      res(
        ctx.json({
          data: {
            _id: '637e20e3e19bb49e9c429d7f',
            author: '637e20e3e19bb49e9c429d7a',
            category: 'test',
            name: 'test',
            html: '<div>test</div>',
            css: 'div {\n\tcolor: red;\n}',
          },
        }),
      ),
  ),
  rest.patch(
    `${baseURL}/users/6382e288e3b1623a23e22ce7/stories/:id`,
    (req, res, ctx) =>
      res(
        ctx.json({
          data: {
            _id: '637e20e3e19bb49e9c429d7f',
            author: '637e20e3e19bb49e9c429d7a',
            category: 'test',
            name: 'test',
            html: '<div>test</div>',
            css: 'div {\n\tcolor: red;\n}',
          },
        }),
      ),
  ),
  rest.delete(
    `${baseURL}/users/6382e288e3b1623a23e22ce7/stories/:id`,
    async (req, res, ctx) => res(ctx.json({ result: 'success ' })),
  ),
];

export default handlers;
