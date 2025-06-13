import { useEffect, useState } from 'react';
import { fetchProductsService } from '../../../services/FetchProductsServices';
import GoBackButton from '../../GoBackButton/GoBackButton';
import './ShowItem.css';
import type { Product } from '../../../types/product';
import { useParams } from 'react-router-dom';

function ShowItem() {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);

  const fetchProduct = async () => {
    try {
      const data = await fetchProductsService(numericId);
      setProduct(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const InfoRow = ({label,value,}: {
    label: string;
    value: string | number | undefined;}
  ) => (
    <div className='details-row d-flex fs-60 fw-bold align-items-center gap-4'>
      {label}
      <div className='fs-40 color-gray-transparent fw-medium'>{value}</div>
    </div>
  );

  return (
    <div className='show-container w-100 pb-5 pt-4'>
      <GoBackButton path='/' />
      <div className="product-details d-flex flex-column">
        <h3 className='fs-60 fw-bold m-0'>{product?.name}</h3>

        <div className="d-flex justify-content-center ">
          <img src={product?.image_url} alt={product?.name} className='product-image-detail rounded-16px'/>
        </div>

        <div className='w-100 d-flex justify-content-between align-items-center'>
          <InfoRow label="Price:" value={`${product?.price}$`} />
          <InfoRow label="Added At:" value={
              product?.created_at &&
              new Date(product.created_at).toLocaleDateString('en-GB')
            }/>
        </div>

        <div className='d-flex fs-60 fw-bold align-items-center gap-4 justify-content-center'>
          <InfoRow label="Updated At:" value={
              product?.updated_at &&
              new Date(product.updated_at).toLocaleDateString('en-GB')
            }/>
        </div>
      </div>
    </div>
  );
}

export default ShowItem;

