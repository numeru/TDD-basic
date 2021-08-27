# Jest

## 1. Describe

- 여러 테스트를 한 그룹으로 묶고 설명을 붙이기 위해 사용한다.
- 첫번째 매개변수는 명령 프롬프트에 표시할 설명이고, 두번째 매개변수는 여러 테스트를 그룹으로 묶을 콜백 함수이다.

```js
describe('test index.js file', () => {
  // ...
});
```

---

## 2. It

- 실제 테스트가 실행되는 테스트 명세를 작성할 때 사용한다.
- 첫번째 매개변수는 테스트명세의 설명을, 두번째 매개변수에는 실제로 테스트를 실행하는 테스트 코드를 작성한다.

```js
describe('test index.js file', () => {
  it('sum 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
```

---

## 3. Matcher

- 결과값을 비교하여 테스트의 성공 여부를 판단할 때 사용한다.

### 1. toEqual

- object를 비교할 때 사용한다.

```js
const person = (name, age) => {
  return {
    name,
    age,
  };
};

describe('test index.js file', () => {
  it('makes a person', () => {
    expect(person('Kim', 20)).toEqual({
      name: 'Kim',
      age: 20,
    });
  });
});
```

<br />

### 2. toBeTruthy, toBeFalsy

- 참, 거짓을 체크한다.

```js
const toggle = (a) => !a;

describe('test index.js file', () => {
  it('returns false', () => {
    expect(toggle(true)).toBeFalsy(); // pass
    expect(toggle(true)).toBeTruthy(); // fail
  });
});
```

<br />

### 3. toContain

- 배열에 특정값이 포함되어 있는지 확인한다.

```js
const range = (start, end) => {
  let result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }

  return result;
};

describe('test index.js file', () => {
  it('has 2', () => {
    expect(range(1, 3)).toContain(2);
  });
});
```
