import React, { useState } from 'react';

const SummaryPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <form>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        주문을 확인했습니다.
      </label>

      <button disabled={!isChecked} type="submit">
        주문 확인
      </button>
    </form>
  );
};

export default SummaryPage;
