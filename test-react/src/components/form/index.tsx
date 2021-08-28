import React, { useState } from 'react';

type Props = {
  onInsert: (input: string) => void;
};

const Form = ({ onInsert }: Props) => {
  const [input, setInput] = useState('');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onInsert(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <input placeholder="enter title." value={input} onChange={handleChangeInput} />
      <button type="submit">submit</button>
    </form>
  );
};

export default Form;
