import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PageWrapper = styled.div`
  background-color: #f7f7f7;
  min-height: 100vh;
  padding: 2rem 0;
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  display: block;
  width: 90%;
  max-width: 400px;
  margin: 0 auto 1.5rem;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
    transform: scale(1.02);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Content = styled.div`
  padding: 1rem;
  text-align: center;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Price = styled.p`
  font-size: 1rem;
  color: #555;
  margin-top: 0.5rem;

  span {
    font-weight: bold;
    color: #28a745;
  }
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #42576c;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  margin-top: 1rem;
  transition: background 0.2s ease-in-out;

  &:hover {
    color: #42576c;
    background: #fff;
    border: 2px solid #42576c;
  }
`;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://v2.api.noroff.dev/online-shop")
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);
        setProducts(data.data);
      });
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageWrapper>
      <Heading>Find todays catch!</Heading>

      
      <SearchInput
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Container>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <Card key={p.id}>
              <Image src={p.image.url} alt={p.image.alt} />
              <Content>
                <Title>{p.title}</Title>
                <Price> ${p.discountedPrice}</Price>
                <Button to={`/product/${p.id}`}>View Product </Button>
              </Content>
            </Card>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>No products found.</p>
        )}
      </Container>
    </PageWrapper>
  );
};

export default HomePage;
