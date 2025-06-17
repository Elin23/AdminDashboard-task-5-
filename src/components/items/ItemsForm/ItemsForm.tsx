import { Col, Row } from 'react-bootstrap';
import GoBackButton from '../../GoBackButton/GoBackButton';
import FormFile from '../../FormFile/FormFile';
import InputComponent from '../../InputComponent/InputComponent';
import { useEffect, useState } from 'react';
import ButtonComponent from '../../ButtonComponent/ButtonComponent';
import { useParams } from 'react-router-dom';
import { postProductService } from '../../../services/PostProductService';
import { fetchProductsService } from '../../../services/FetchProductsServices';
import Loader from '../../Loader/Loader';
import NotificationComponent from '../../NotificationComponent/NotificationComponent';
import './ItemsForm.css'
type ItemFormProps = {
  pageTitle: string;
  buttonLabel: string;
};

function ItemsForm({ pageTitle, buttonLabel }: ItemFormProps) {
  const { id } = useParams<{ id?: string }>();
  const numericId = id ? Number(id) : undefined;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [product_image, setProductImage] = useState<File | null>(null);
  const [old_image, setOldImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchOldData = async () => {
      if (numericId !== undefined) {
        try {
          setLoading(true);
          const data = await fetchProductsService(numericId);
          setName(data.name);
          setPrice(data.price.toString());
          setOldImage(data.image_url);
        } catch (error: any) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOldData();
  }, [numericId]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    if (product_image) {
      formData.append('image', product_image);
    }
    try {
      const response = await postProductService(formData, numericId);

      if (!numericId) {
        setName('');
        setPrice('');
        setProductImage(null);
        setOldImage(null);
        setFormKey(prev => prev + 1);
        setErrors({})
      } else {
        if (response?.image_url) {
          setOldImage(response.image_url);
        }
      }
      setShowNotification(true);
    } catch (error: any) {
  if (error.response && error.response.data?.errors) {
    const serverErrors = error.response.data.errors;
    const extractedErrors: Record<string, string> = {};

    Object.keys(serverErrors).forEach((key) => {
      if (Array.isArray(serverErrors[key]) && serverErrors[key].length > 0) {
        extractedErrors[key] = serverErrors[key][0];
      }
    });

    setErrors(extractedErrors);
  } else if (error.response && error.response.data?.message) {
    setErrors({ general: error.response.data.message });
  } else {
    setErrors({ general: "Please check your internet connection or try again later." });
  }
}
  };

  return (
    <>
      <div className='position-relative w-100 pb-5 pt-4 px-64'>
        {loading && <Loader />}
        <GoBackButton path='/' />
        <div className="product-details d-flex flex-column">
          <h3 className='fs-60 fw-bold m-0'>{pageTitle}</h3>
          <Row className='form-row'>
            <Col className='form-col d-flex justify-content-between flex-column'>
              <InputComponent type='text' label='Name' fontSize='fs-2' value={name} className='col-12' error={errors.name}
                placeholder="Enter name" required={true} onChange={(e) => setName(e.target.value)} controlId="formGroupName" />
              <InputComponent type='text' label='Price' fontSize='fs-2' value={price} className='col-12' error={errors.price}
                placeholder="Enter price" required={true} onChange={(e) => setPrice(e.target.value)} controlId="formGroupPrice" />
            </Col>
            <Col>
              <FormFile key={formKey} label="Image" onChange={setProductImage} className='w-100 h-100 lg' iconSize='lg' defaultImage={old_image || undefined} error={errors.image}/>
            </Col>
          </Row>
          <ButtonComponent variant='primary' onClickEvent={handleSubmit} label={buttonLabel} className='fs-2 fw-medium btn-w-20 mt-5 mx-auto' />
        </div>
      </div>

      <NotificationComponent show={showNotification} onClose={() => setShowNotification(false)} label="Success" description={`Product has been ${numericId ? 'updated' : 'created'} successfully.`} />
    </>
  );
}

export default ItemsForm;
