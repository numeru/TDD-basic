import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Option = {
  name: string;
};

const Options = () => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    loadOptions();
  }, []);

  const loadOptions = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/options`);
      setOptions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul>
      {options.map((option) => {
        return (
          <li key={option.name}>
            <label>
              {option.name}
              <input type="checkbox" />
            </label>
          </li>
        );
      })}
    </ul>
  );
};

export default Options;
