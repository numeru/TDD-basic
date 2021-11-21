import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import ProductItem from '../product-item';

export type Product = {
  name: string;
  imagePath: string;
};

const Products = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  const [priceOfItem, setPriceOfItem] = useState<number[]>([0, 0, 0, 0]);

  const totalPrice = useMemo(
    () => priceOfItem.reduce((a, b) => a + b, 0) * 1000,

    [priceOfItem]
  );

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
      <p>Total Price : {totalPrice}</p>
      <ul>
        {items?.map((item, idx) => (
          <ProductItem
            key={item.name}
            item={item}
            index={idx}
            setPriceOfItem={setPriceOfItem}
          />
        ))}
      </ul>
      {error && <div data-testid="error_banner">에러가 발생했습니다.</div>}
    </>
  );
};

export default Products;
