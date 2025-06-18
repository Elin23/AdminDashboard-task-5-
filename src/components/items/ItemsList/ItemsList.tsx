import { useEffect, useState } from 'react'
import './ItemsList.css'
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchProductsService } from '../../../services/FetchProductsServices';
import type { Product } from '../../../types/product';
import SearchBar from '../../SearchBar/SearchBar';
import ButtonComponent from '../../ButtonComponent/ButtonComponent';
import Loader from '../../Loader/Loader';
import ModelComponent from '../../ModelComponent/ModelComponent';
import PaginationComponent from '../../PaginationComponent/PaginationComponent';
import { deleteProductService } from '../../../services/DeleteProductService';


function ItemsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deletedProductId, setDeletedProductId] = useState<number | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [itemsToShow, setItemsToShow] = useState(8);

  useEffect(() => {
    const updateItemsToShow = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setItemsToShow(8); 
      } else if (width >= 768) {
        setItemsToShow(6); 
      } else {
        setItemsToShow(4);
      }
    };
    
  
    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
  
    return () => window.removeEventListener('resize', updateItemsToShow); 
  }, []);
  

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProductsService();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
      await deleteProductService(deletedProductId, token!);
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
    <div className='position-relative items-section-container w-100 d-flex flex-column'>
      {loading && <Loader />}
      <SearchBar onSearch={(value) => { setSearchInput(value); setCurrentPage(1);}}/>
      <ButtonComponent variant='primary' onClickEvent={() => navigate(`/products/new`)} label='ADD NEW PRODUCT' className='fs-14 fw-medium btn-w-20 btn-h-44 ms-auto custom_margin'/>

      <div className='items-container d-grid '>
        {currentItems.length === 0 ? (
          <p className="text-center text-muted mt-4 fs-5">No products found.</p>
        ) : (
          currentItems.map((product) => (
            <Card key={product.id} className='product-card position-relative rounded-16px overflow-hidden' onClick={() => navigate(`/products/${product.id}/show`)}>
              <Card.Img variant="top" className='w-100 h-100' src={product.image_url} 
              onError={(e) => {(e.target as HTMLImageElement).src = '/AdminDashboard-task-5-/assets/imgs/default-product.png';}}/>
              <div className="hover-effect w-100 h-100 rounded-4px position-absolute flex-column justify-content-center align-items-center d-none">
                <h3 className='product-name text-center'>{product.name}</h3>
                <div className="card-buttons d-flex gap-2">
                  <ButtonComponent variant='primary' onClickEvent={(e) => {e.stopPropagation(); navigate(`/products/${product.id}/edit`);}} label='Edit' className='btn text-light'/>
                  <ButtonComponent variant='danger' onClickEvent={(e) => {e.stopPropagation(); deleteProduct(product.id);}} label='Delete' className='btn text-light'/>
                </div>
              </div>
            </Card>
          ))
        )}

        <ModelComponent show={showDeleteAlert} onClose={() => setShowDeleteAlert(false)}
          onConfirm={async () => {
            setShowDeleteAlert(false);
            await confirmDelete();
          }}
          body='ARE YOU SURE YOU WANT TO DELETE THE PRODUCT?' close='NO' confirm='YES'
          confirmStyle='bg-primary-color' closeStyle='bg-primary-color'/>
      </div>

      <PaginationComponent currentPage={currentPage} totalPages={totalPages}
        goToNextPage={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        goToPrevPage={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        goToPage={(pageNumber) => setCurrentPage(pageNumber)}/>
    </div>
  );
}

export default ItemsList;

