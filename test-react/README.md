# Test React

## 1. 과정

### 1. Red

- 실패하는 테스트 코드를 작성한다.

### 2. Green

- 테스트 코드를 통과할 수 있는 최소한의 코드를 작성한다.

### 3. Refactor

- 해당 코드를 리팩토링 한다.

---

## 2. 적용

### 1. 최소한의 컴포넌트 틀 작성.

```ts
const Form = () => {
  return (
    <div>
      <>form</>
    </div>
  );
};

export default Form;
```

### 2. UI, 기능 사양 파악.

- input, button이 있어야한다.
- input에 change 이벤트가 발생하면 value가 바뀌어야한다.
- button을 누르면 submit 이벤트가 실행된다. 이때 props으로 받아온 함수를 실행시킨다.

  <br />

- 3, 4번의 과정을 반복하며 위의 사양을 각각 적용시킨다.

<br />

### 3. 실패하는 테스트 코드 작성.

```ts
// form.test.tsx

describe('<Form />', () => {
  it('has input and button', () => {
    const { getByPlaceholderText, getByText } = render(<Form />);

    const input = getByPlaceholderText('enter title.');
    const button = getByText('submit');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  }); // 1)

  it('changes input', () => {
    const { getByPlaceholderText } = render(<Form />);

    const input = getByPlaceholderText('enter title.');

    fireEvent.change(input, {
      target: {
        value: 'TDD',
      },
    });

    expect(input).toHaveAttribute('value', 'TDD');
  }); // 2)

  it('calls onInsert and clears input', () => {
    const onInsert = jest.fn(); // mock 함수

    const { getByPlaceholderText, getByText } = render(<Form onInsert={onInsert} />);

    const input = getByPlaceholderText('enter title.');
    const button = getByText('submit');

    fireEvent.change(input, {
      target: {
        value: 'TDD',
      },
    });

    fireEvent.click(button);

    expect(onInsert).toBeCalledWith('TDD');
    expect(input).toHaveAttribute('value', '');
  }); // 3)
});
```

<br />

### 4. 테스트 코드를 통과하는 최소한의 코드 작성.

```ts
type Props = {
  onInsert: (input: string) => void;
};

const Form = ({ onInsert }: Props) => {
  const [input, setInput] = useState('');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value); // 2)

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onInsert(input);
    setInput('');
  }; // 3)

  return (
    // 1)
    <form onSubmit={handleSubmitForm}>
      <input placeholder="enter title." value={input} onChange={handleChangeInput} />
      <button type="submit">submit</button>
    </form>
  );
};

export default Form;
```

<br />

### 5. 컴포넌트, 테스트 코드 리팩토링

```ts
describe('<Form />', () => {
  const setup = () => {
    const onInsert = jest.fn(); // mock 함수
    const queries = render(<Form onInsert={onInsert} />);

    const { getByText, getByPlaceholderText } = queries;

    const input = getByPlaceholderText('enter title.');
    const button = getByText('submit');

    return {
      ...queries,
      input,
      button,
      onInsert,
    };
  };
  it('has input and button', () => {
    const { input, button } = setup();

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('changes input', () => {
    const { getByPlaceholderText } = setup();

    const input = getByPlaceholderText('enter title.');

    fireEvent.change(input, {
      target: {
        value: 'TDD',
      },
    });

    expect(input).toHaveAttribute('value', 'TDD');
  });

  it('calls onInsert and clears input', () => {
    const { input, button, onInsert } = setup();

    fireEvent.change(input, {
      target: {
        value: 'TDD',
      },
    });

    fireEvent.click(button);

    expect(onInsert).toBeCalledWith('TDD');
    expect(input).toHaveAttribute('value', '');
  });
});
```

<br />

### 6. 추후 코드가 바뀌더라도 기존의 테스트 코드를 통해 기능이 정상적으로 작동하는지 확인할 수 있다.

---

## 그외

### 1. test router

```ts
describe('<App />', () => {
  it('renders component correctly', () => {
    const history = createMemoryHistory();
    history.push('/');

     const TestComponent = (): JSX.Element => {
      const { pathname } = useLocation();
      return <div>{pathname}</div>;
    };

    const { container } = render(
      <Router history={history}>
        <TestComponent />
        <App />
      </Router>,
    );

    const url = screen.getByText('/');
   // ...
  });
```

<br />

### 2. test style

```ts
expect(parent).toHaveStyleRule('background-color', 'black', {
  modifier: ':hover',
});
```
