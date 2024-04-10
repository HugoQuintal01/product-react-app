import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../menu/Menu";
import Header from "../header/Header";
import TopAnchor from "../top-anchor/TopAnchor";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(9);
    const [category, setCategory] = useState("");
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [sortOrder, setSortOrder] = useState("");
    const [orderActive, setOrderActive] = useState(false);
    const [orderButtonText, setOrderButtonText] = useState("Order +");
    const [filterActive, setFilterActive] = useState(false);
    const [filterButtonText, setFilterButtonText] = useState("Filter +");

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => setProducts(json));
    }, []);

    const loadMoreProducts = () => {
        setVisibleProducts(prevCount => prevCount + 9);
    };

    const filteredProducts = products.filter(product => {
        if (category && product.category !== category) return false;
        if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
        return true;
    });

    const sortedProducts = sortOrder === "asc"
        ? filteredProducts.sort((a, b) => a.price - b.price)
        : sortOrder === "desc"
            ? filteredProducts.sort((a, b) => b.price - a.price)
            : sortOrder === "alpha_asc"
                ? filteredProducts.sort((a, b) => a.title.localeCompare(b.title))
                : sortOrder === "alpha_desc"
                    ? filteredProducts.sort((a, b) => b.title.localeCompare(a.title))
                    : filteredProducts;


    const toggleOrderActive = () => {
        setOrderActive(!orderActive);
        setOrderButtonText(orderActive ? "Order +" : "Order -");
    }

    const toggleFilterActive = () => {
        setFilterActive(!filterActive);
        setFilterButtonText(filterActive ? "Filter +" : "Filter -");
    }


    return (
        <section className="store-content gridrowfull">
            <Menu />
            <Header />
            <div className="filter-products gridrowfull">
                <div className="filter-by filter-products-text">
                    <span id="filter-id" className={filterActive ? 'active' : ''} onClick={toggleFilterActive}>{filterButtonText}</span>
                    <div className={`filter-list gridrow col-d-12 col-12 ${filterActive ? 'active' : ''}`}>
                        <span className="category-filter col-12">Category</span>
                        <button className={`col-3 ${category === "" ? 'active' : ''}`} onClick={() => setCategory("")}>All</button>
                        <button className={`col-3 ${category === "electronics" ? 'active' : ''}`} onClick={() => setCategory("electronics")}>Electronics</button>
                        <button className={`col-3 ${category === "jewelery" ? 'active' : ''}`} onClick={() => setCategory("jewelery")}>Jewelery</button>
                        <button className={`col-3 ${category === "men's clothing" ? 'active' : ''}`} onClick={() => setCategory("men's clothing")}>Men's Clothing</button>
                        <button className={`col-3 ${category === "women's clothing" ? 'active' : ''}`} onClick={() => setCategory("women's clothing")}>Women's Clothing</button>
                        <span className="price-filter col-12">Price</span>
                        <input
                            className="col-12 slider"
                            type='range'
                            min={0}
                            max={1000}
                            value={priceRange[1]}
                            onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        />
                        <p id="price-value" className="price-value">{priceRange[1]}€</p>
                    </div>
                </div>
                <div className="order-products filter-products-text">
                    <span id="order-id" className={orderActive ? 'active' : ''} onClick={toggleOrderActive}>{orderButtonText}</span>
                    <div className="order-list">
                    <div className={`filter-list gridrow col-12 ${orderActive ? 'active' : ''}`}>
                            <button className={sortOrder === "asc" ? 'active' : ''} onClick={() => setSortOrder("asc")}>Price Ascending</button>
                            <button className={sortOrder === "desc" ? 'active' : ''} onClick={() => setSortOrder("desc")}>Price Descending</button>
                            <button className={sortOrder === "alpha_asc" ? 'active' : ''} onClick={() => setSortOrder("alpha_asc")}>Alphabetical Ascending</button>
                            <button className={sortOrder === "alpha_desc" ? 'active' : ''} onClick={() => setSortOrder("alpha_desc")}>Alphabetical Descending</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-list gridrowfull">
                {sortedProducts.slice(0, visibleProducts).map(product => (
                    <div className="product col-d-6 col-6" key={product.id}>
                        <Link to={`/products/${product.id}`}>
                            <div>
                                <div className="product-name product-div col-12">
                                    <span>{product.title}</span>
                                </div>
                                <div className="product-price product-div col-12">
                                    <span>{product.price} €</span>
                                </div>
                                <div className="product-reference product-div col-12">
                                    <span>{product.category}</span>
                                </div>
                                <div className="product-image product-div col-12">
                                    <img src={product.image} alt={product.title} />
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
                {visibleProducts < sortedProducts.length && (
                    <button className="show-more-products" onClick={loadMoreProducts}>Load More</button>
                )}
            </div>
            <TopAnchor />
        </section>
    );
}

export default ProductList;
