import React from 'react';

interface NoItemsI {
  description?: string;
}

const NoItems = ({ description = '상품이' }: NoItemsI) => {
  return (
    <div className='flex justify-center mt-40'>
      {description} 없습니다.
      <br />
      다시 시도해주세요.
    </div>
  );
};

export default NoItems;
