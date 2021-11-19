import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Product = {
  name: string;
  imagePath: string;
};

const Products = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products`);
      setItems(response.data);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.name}>
              <img
                style={{
                  width: '20%',
                }}
                src={`http://localhost:5000${item.imagePath}`}
                alt={`${item.name} product`}
              />

              <label>
                {item.name}
                <input type="number" min={0} defaultValue={0} />
              </label>
            </li>
          );
        })}
      </ul>
      {error && <div data-testid="error_banner">에러가 발생했습니다.</div>}
    </>
  );
};

export default Products;
