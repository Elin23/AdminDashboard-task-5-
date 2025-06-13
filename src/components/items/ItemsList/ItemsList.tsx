import { useEffect, useState } from 'react'
import './ItemsList.css'
import axios from 'axios'
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ModelComponent from '../../ModelComponent/ModelComponent';
import { fetchProductsService } from '../../../services/FetchProductsServices';
import type { Product } from '../../../types/product';
import SearchBar from '../../SearchBar/SearchBar';
import ButtonComponent from '../../ButtonComponent/ButtonComponent';

function ItemsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deletedProductId, setDeletedProductId] = useState<number | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const itemsToShow = 8;

  const fetchProducts = async () => {
    try {
      const data = await fetchProductsService();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = (id: number) => {
    setDeletedProductId(id);
    setShowDeleteAlert(true);
  }
  const confirmDelete = async () => {
    if (deletedProductId === null) return;
    try {
      await axios.delete(`https://web-production-3ca4c.up.railway.app/api/items/${deletedProductId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      });
      setDeletedProductId(null);
      await fetchProducts();
    } catch (err) {
      console.error(err);
    }
  }

  const filteredProducts = searchInput === '' ? products : products.filter(product => product.name.toLowerCase().includes(searchInput.toLowerCase()));
  const lastItem = currentPage * itemsToShow;
  const firstItem = lastItem - itemsToShow;
  const currentItems = filteredProducts.slice(firstItem, lastItem);

  const totalPages = Math.ceil(filteredProducts.length / itemsToShow);
  return (
    <div className='items-section-container pt-4 d-flex flex-column'>
      <SearchBar onSearch={(value) => {
        setSearchInput(value);
        setCurrentPage(1);
      }
      } />
      <ButtonComponent variant='primary' onClickEvent={() => navigate(`/products/new`)} label='ADD NEW PRODUCT' className='fs-14 fw-medium btn-w-20 mt-5 ms-auto' />
      <div className='items-container d-flex flex-wrap justify-content-center align-items-center'>
        {
          currentItems.map((product) => (
            <Card key={product.id} className='product-card position-relative rounded-16px' onClick={() => navigate(`/products/${product.id}/show`)} >
              <Card.Img
                variant="top"
                className='w-100 h-100'
                src={product.image_url}
                onError={(e) => { (e.target as HTMLImageElement).src = '/AdminDashboard-task-5-/assets/imgs/default-product.png'; }}
              />
              <div className="hover-effect w-100 h-100 rounded-4px position-absolute flex-column justify-content-center align-items-center d-none">
                <h3 className='product-name'>{product.name}</h3>
                <div className="card-buttons d-flex gap-2">
                  <button className="btn bg-primary-color text-light" onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/products/${product.id}/edit`);
                  }}>Edit</button>
                  <button className="btn btn-danger text-light" onClick={(e) => {
                    e.stopPropagation();
                    deleteProduct(product.id);
                  }}>delete</button>
                </div>
              </div>
            </Card>
          ))
        }
        <ModelComponent show={showDeleteAlert} onClose={() => setShowDeleteAlert(false)}
          onConfirm={async () => {
            setShowDeleteAlert(false);
            await confirmDelete();
          }}
          body='ARE YOU SURE YOU WANT TO DELETE THE PRODUCT?' close='NO' confirm='YES'
          confirmStyle='bg-primary-color' closeStyle='bg-primary-color' />
      </div>
      {[...Array(totalPages)].map((_, index) => (
        <button key={index} onClick={() => setCurrentPage(index + 1)}
          className={currentPage === index + 1 ? "active" : ""}>
          {index + 1}
        </button>
      ))}
    </div>

  )
}

export default ItemsList




