import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Menu from '../../components/menu/Menu';
import TopAnchor from '../../components/top-anchor/TopAnchor';

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (productId) {
      fetchProduct();
    }

    return () => {
      // Cleanup function to clear the product state when unmounting
      setProduct(null);
    };
  }, [productId]);

  if (!product) {
    return <div className="loading-screen">
      <span>Loading...</span>
    </div>;
  }

  return (
    <main>
      <Menu />
      <TopAnchor />
      <div className="gridrowfull container-product">
        <div className="image-section col-d-6 col-12">
          <div className="image-container">
            <img src={product.image} alt={product.title} />
          </div>
        </div>
        <div className="product-info col-d-6 col-12">
          <h1 className="product-title col-12">{product.title}</h1>
          <div className="product-item col-12">
            <p className="product-item-title">Price: </p>
            <p className="product-item-content">{product.price} €</p>
          </div>
          <div className="product-item col-12">
            <p className="product-item-title">Category:</p>
            <p className="product-item-content">{product.category}</p>
          </div>
          <div className="product-item col-12">
            <p className="product-item-title product-item-title-description">Description:</p>
            <p className="product-item-content product-item-content-description">{product.description}</p>
          </div>
          <button className="add-to-cart">Add to Cart</button>
        </div>    
      </div>
    </main>
  );
}

export default ProductPage;
