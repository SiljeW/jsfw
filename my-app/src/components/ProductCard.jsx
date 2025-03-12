import styled from "styled-components";

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  background: white;

  &:hover {
    transform: scale(1.03);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Price = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #007bff;
`;

const Button = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
  margin-top: 0.5rem;

  &:hover {
    background: #218838;
  }
`;

const ProductCard = ({ product, addToCart }) => {
  return (
    <Card>
      <Image src={product.image} alt={product.name} />
      <Content>
        <Title>{product.name}</Title>
        <Price>${product.price}</Price>
        <Button onClick={() => addToCart(product)}>Add to Cart</Button>
      </Content>
    </Card>
  );
};

export default ProductCard;
