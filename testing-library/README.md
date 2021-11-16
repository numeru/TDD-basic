# Testing Library

- DOM 테스팅 라이브러리
- 실제 DOM 노드에서 작동한다.

<br />

## 1. render

- 리액트 컴포넌트를 화면에 표시한다.

### 1. query

- ...Role,
  ...LabelText,
  ...PlaceholderText,
  ...Text,
  ...DisplayValue,
  ...AltText,
  ...Title,
  ...TestId 순으로 사용하는 것을 권장한다.

#### 1. getBy

- getBy\* 로 시작하는 쿼리는 조건에 일치하는 DOM 엘리먼트 하나를 선택한다. 없으면 에러가 발생한다.

#### 2. getAllBy

- getAllBy\* 로 시작하는 쿼리는 조건에 일치하는 DOM 엘리먼트 여러개를 선택한다. 하나도 없으면 에러가 발생한다.

#### 3. queryBy

- queryBy\* 로 시작하는 쿼리는 조건에 일치하는 DOM 엘리먼트 하나를 선택한다. 존재하지 않아도 에러가 발생하지 않는다.

#### 4. queryAllBy

- queryAllBy\* 로 시작하는 쿼리는 조건에 일치하는 DOM 엘리먼트 여러개를 선택한다. 존재하지 않아도 에러가 발생하지 않는다.

#### 5. findBy

- findBy\* 로 시작하는 쿼리는 조건에 일치하는 DOM 엘리먼트 하나가 나타날 때 까지 기다렸다가 해당 DOM 을 선택하는 Promise 를 반환한다. 기본 timeout 인 1000ms 이후에도 나타나지 않으면 에러가 발생한다.

#### 6. findAllBy

- findBy\* 로 시작하는 쿼리는 조건에 일치하는 DOM 엘리먼트 여러개가 나타날 때 까지 기다렸다가 해당 DOM 을 선택하는 Promise 를 반환한다. 기본 timeout 인 1000ms 이후에도 나타나지 않으면 에러가 발생한다.

```js
const { getByLabelText, queryAllByTestId } = render(<Component />);
```

<br />

### 2. container

- 렌더링된 리액트 컴포넌트에서 화면에 표시되는 부분을 담고 있는 오브젝트이다.
- document.body 를 기본값으로 한다.
- 일반적인 DOM 노드 이므로 container.querySelector 등으로 호출할 수 있다.
- 가급적 쿼리로 사용하지 않는다.

```js
const { container } = render(<Component />);
```

<br />

### 3. rerender

- props이 업데이트 되는 등의 상황에서 컴포넌트를 다시 렌더링 시킨다.

```js
const { rerender } = render(<NumberDisplay number={1} />);

rerender(<NumberDisplay number={2} />);
```

<br />

### 4. unmount

- 렌더링된 컴포넌트를 언마운드 되도록 한다.
- 컴포넌트가 페이지에서 없어진 후의 상황을 테스트 할 때 사용된다.

```js
const { container, unmount } = render(<Login />);

unmount();
```

---

## 2. fireEvent

- 이벤트를 발생시킨다.

```js
fireEvent[eventName](node: HTMLElement, eventProperties: Object)

fireEvent.change(input, {target: {value: ''}})
```

---

## 3. async

### 1. waitFor

- 시간 초과에 도달할 때까지 콜백을 여러 번 실행할 수 있다.

```js
function waitFor<T>(
  callback: () => T | Promise<T>,
  options?: {
    container?: HTMLElement
    timeout?: number
    interval?: number
    onTimeout?: (error: Error) => Error
    mutationObserverOptions?: MutationObserverInit
  },
): Promise<T>

await waitFor(() => expect(mockAPI).toHaveBeenCalledTimes(1))
```

<br />

### 2. findBy

<br />

### 3. waitForElementToBeRemoved

- DOM 요소가 제거되기를 기다린다.

```js
function waitForElementToBeRemoved<T>(
  callback: (() => T) | T, // elements
  options?: {
    container?: HTMLElement
    timeout?: number
    interval?: number
    onTimeout?: (error: Error) => Error
    mutationObserverOptions?: MutationObserverInit
  },
): Promise<void>

waitForElementToBeRemoved(document.querySelector('div.getOuttaHere')).then(() =>
  console.log('Element no longer in DOM'),
)
```

### 4. axios-mock-adapter

```js
import MockAdapter from 'axios-mock-adapter';

describe('<UserProfile />', () => {
  const mock = new MockAdapter(axios, { delayResponse: 200 }); // 200ms 가짜 딜레이 설정

  // API 요청에 대하여 응답 미리 정하기
  mock.onGet('https://jsonplaceholder.typicode.com/users/1').reply(200, result);

  // ...
});
```
