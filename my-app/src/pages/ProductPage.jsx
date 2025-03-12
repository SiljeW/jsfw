import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import styled from "styled-components";
import { Star, StarHalf, Star as StarOutline } from "lucide-react";

// Styled components
const PageWrapper = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Heading = styled.h1`
  text-align: left;
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: bold;
  color: #2c3e50;
`;

const ProductContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  max-height: 400px;
  margin-top: 30px;
  gap: 30px;
`;

const Image = styled.img`
  width: 50%;
  max-width: 600px;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  height: 400px;
  justify-content: space-evenly;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #2c3e50;
  margin: 15px 0;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #7f8c8d;
  line-height: 1.6;
`;

const Price = styled.p`
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 20px 0;
  font-weight: bold;

  span {
    font-size: 1.2rem;
    color: #e74c3c;
    text-decoration: line-through;
    margin-left: 10px;
  }
`;

const Button = styled.button`
  background-color: #4b4444;
  color: white;
  padding: 12px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f8f8f8;
    color: #4b4444;
    border: 2px solid #4b4444;
    font-weight: bold;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

const ReviewsSection = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Review = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: center;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ecf0f1;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const ReviewTitle = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  color: #2c3e50;
`;

const ReviewContent = styled.p`
  font-size: 1rem;
  color: #7f8c8d;
  margin-top: 5px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  gap: 2px;
  color: #f39c12;
`;

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={i} fill="#f39c12" size={20} />);
  }

  if (hasHalfStar) {
    stars.push(<StarHalf key="half" fill="#f39c12" size={20} />);
  }

  while (stars.length < 5) {
    stars.push(<StarOutline key={stars.length} stroke="#f39c12" size={20} />);
  }

  return stars;
};
const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart(); // Ensure real-time updates
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false); // Button state

  useEffect(() => {
    fetch(`https://v2.api.noroff.dev/online-shop/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const discount = product.price - product.discountedPrice;

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500); // Reset button after 1.5s
  };

  return (
    <PageWrapper>
      <Heading>Product</Heading>
      <ProductContainer>
        <Image src={product.image.url} alt={product.title} />
        <Content>
          <Title>{product.title}</Title>
          <Description>{product.description}</Description>
          <Price>
            ${product.discountedPrice} 
            {discount > 0 && <span>${product.price}</span>}
            
          </Price>
          <Button onClick={handleAddToCart} disabled={added}>
            {added ? "Added!" : "Add to Cart"}
          </Button>
        </Content>
      </ProductContainer>

      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 ? (
        <ReviewsSection>
          <h3>Customer Reviews</h3>
          {product.reviews.map((review, index) => (
            <Review key={index}>
              <ReviewTitle>{review.user}</ReviewTitle>
              <ReviewContent>{review.comment}</ReviewContent>
              <Rating>{renderStars(review.rating)}</Rating>
            </Review>
          ))}
        </ReviewsSection>
      ) : (
        <ReviewsSection>
          <h3>No reviews yet. Be the first to leave a review!</h3>
        </ReviewsSection>
      )}
    </PageWrapper>
  );
};

export default ProductPage;
