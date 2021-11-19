# test shopping

## 1. msw

- 백엔드 요청 테스트를 위한 mock server 생성

```
yarn add msw
```

1. handlers

```ts
import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:5000/products', (req, res, ctx) => {
    return res(
      ctx.json(...)
    );
  }),
  rest.get('http://localhost:5000/options', (req, res, ctx) => {
    return res(
      ctx.json(...)
    );
  }),
];
```

2. server

```ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

3. setupTest

```ts
import { server } from './mocks/server';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
```
