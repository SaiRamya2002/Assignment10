import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCurrency } from '../utils/addCurrency';
import { addToCart } from '../slices/cartSlice';
import Rating from './Rating';

const Product = ({ product }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  return (
    <Card
      className='my-3 p-3 rounded text-center'
      style={{
        backgroundColor: '#FAFAFA', // Soft neutral background
        border: '1px solid #E0E0E0', // Subtle border for structure
      }}
    >
      <Link
        to={`/product/${product._id}`}
        style={{
          textDecoration: 'none',
          color: '#3A506B', // Rich text color for links
        }}
      >
        <Card.Img
          variant='top'
          src={product.image}
          style={{
            height: '200px',
            objectFit: 'contain',
            borderRadius: '10px',
          }}
        />
        <Card.Body>
          <Card.Title as='div' className='product-title'>
            <strong style={{ color: '#1C2833' }}>{product.name}</strong> {/* Darker for better visibility */}
          </Card.Title>

          <Card.Text as='div' className='mb-3'>
            <Rating
              value={product.rating}
              text={`(${product.numReviews} reviews)`}
              style={{
                color: '#FFB400', // Bright and engaging for stars
              }}
            />
          </Card.Text>
          <Card.Text as='h3' style={{ color: '#4CAF50' }}>
            {addCurrency(product.price)} {/* Fresh green for price */}
          </Card.Text>
        </Card.Body>
      </Link>
      <Button
        variant='primary'
        type='button'
        disabled={product.countInStock === 0}
        onClick={addToCartHandler}
        style={{
          backgroundColor: '#FF5722', // Vibrant orange for CTA
          borderColor: '#FF5722',
          color: '#FFFFFF', // Clean contrast with white text
          fontWeight: 'bold',
        }}
      >
        Add To Cart
      </Button>
    </Card>
  );
};

export default Product;

