import { Badge, Button, Card, Image } from "@mantine/core";
import React from "react";

function ProductCard({ products }) {

  function calculateDiscountPercentage(price, discountedPrice) {
    if (price <= 0) {
      throw new Error("Fiyat 0'dan büyük olmalıdır.");
    }
    
    const discountPercentage = ((1 - (discountedPrice / price)) * 100).toFixed(2);
    return discountPercentage;
  }
  return (
    <div className="container mt-4">
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-6 col-lg-4 col-xl-3 mb-4">
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{height:"100%", display:"grid"}}>
              <Card.Section py="xs">
                <Image
                  src={product.images}
                  alt={product.name}
                  height={160}
                  fit="contain"
                />
              </Card.Section>

              <div className="text-center mt-3">
                <Badge color="green" variant="light" className="mb-2">
                  {product.sale_status}
                </Badge>
              </div>

              <div className="mt-2 text-center">
                <h6 className="text-uppercase text-muted">{product.category}</h6>
                <a href={product.link} title={product.name} className="text-dark text-decoration-none">
                  <strong>{product.name}</strong>
                </a>
              </div>

              <div className="mt-3 text-center">
                <strong className="text-danger">{product.price}</strong>
                <div className="text-muted">
                  <s>{product.oldPrice}</s>
                  <Badge color="orange" variant="filled" className="ms-2">
                    %{calculateDiscountPercentage(product.price, product.discounted_price)} İndirim
                  </Badge>
                </div>
              </div>

              <Button
                fullWidth
                color="blue"
                className="mt-3"
                component="a"
                href={product.link}
              >
                Sepete Ekle
              </Button>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCard;
