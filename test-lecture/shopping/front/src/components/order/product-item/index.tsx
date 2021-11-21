import React from 'react';
import { Product } from '../products';

type Props = {
  item: Product;
  index: number;
  setPriceOfItem: React.Dispatch<React.SetStateAction<number[]>>;
};

const ProductItem = ({ item, index, setPriceOfItem }: Props) => {
  return (
    <li>
      <img
        style={{
          width: '20%',
        }}
        src={`http://localhost:5000${item.imagePath}`}
        alt={`${item.name} product`}
      />
      <label>
        {item.name}
        <input
          type="number"
          min={0}
          defaultValue={0}
          onChange={(e) =>
            setPriceOfItem((prev) =>
              prev.map((price, idx) => {
                if (idx === index) return parseInt(e.target.value);
                return price;
              })
            )
          }
        />
      </label>
      <p>1000$</p>
    </li>
  );
};

export default ProductItem;
