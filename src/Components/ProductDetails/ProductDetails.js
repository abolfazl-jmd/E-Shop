import styles from "./ProductDetails.module.css";
import Shipping from "./Shipping/Shipping";
import ProductFlags from "./ProductFlags/ProductFlags";
import ProductSize from "./ProductSize/ProductSize";
import ProductColor from "./ProductColor/ProductColor";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchOneProductAsync } from "../../redux/oneProduct/oneProductActions";
import { useEffect, useState } from "react";
import { addToCart } from "../../redux/shoppingCart/shoppingCartActions";
import ProductNumber from "./ProductNumber/ProductNumber";
import { IconContext } from "react-icons/lib";

const ProductDetails = () => {
  const productData = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [productNumber, setProductNumber] = useState(1);
  const [productSize, setProductSize] = useState("");
  const [productColor, setProductColor] = useState("");
  const [favourite, setFavourite] = useState(false);
  const { loading, product, error } = productData;
  const { id } = useParams();

  const chooseProductColorHandler = (color) => {
    setProductColor(color);
  };

  const chooseProductSizeHandler = (e) => {
    setProductSize(e.target.value);
  };

  const productNumberIncrementHandler = () => {
    setProductNumber((prevState) => prevState + 1);
  };

  const productNumberDecrementHandler = () => {
    if (productNumber === 1) return;

    setProductNumber((prevState) => prevState - 1);
  };

  useEffect(() => {
    dispatch(fetchOneProductAsync(id));
  }, []);

  const toggleFavouriteHandler = () => {
    setFavourite(!favourite);
  };

  return (
    <div className={`${styles.product__details}`}>
      <div className={`${styles.product__image}`}>
        <img
          src={product.image}
          alt={product.name}
          className={`${styles.product__img}`}
        />
        <div
          className={`${styles.like__icon}`}
          onClick={toggleFavouriteHandler}
        >
          {favourite ? (
            <IconContext.Provider value={{ color: "#fbb03b" }}>
              <MdFavorite />
            </IconContext.Provider>
          ) : (
            <MdFavoriteBorder />
          )}
        </div>
      </div>
      <div className={`${styles.product__detail}`}>
        <div className={`${styles.product__delivery}`}>
          <Shipping
            type="Standard shipment"
            description="Free within 3-6 business days"
          />
          <Shipping type="Express delivery" description="$35,00 available" />
        </div>
        <ProductFlags productID={product._id} />
        <div className={`${styles.product__detail__name}`}>
          <h1 className={`${styles.product__name}`}>{product.name}</h1>
          <div className={`${styles.product__detail__price}`}>
            {product.offPrice && (
              <span className={`${styles.product__price__discount}`}>
                {product.offPrice && product.offPrice * productNumber}
              </span>
            )}
            <span
              className={`${styles.product__price} ${
                product.offPrice && styles.product__price__off
              } `}
            >
              ${product.price * productNumber}
            </span>
          </div>
        </div>

        <ProductColor
          productColor={productColor}
          onChangeColor={chooseProductColorHandler}
        />
        <ProductSize chooseProductSizeHandler={chooseProductSizeHandler} />
        <div className={`${styles.product__action__btns}`}>
          <ProductNumber
            productNumber={productNumber}
            onIncrement={productNumberIncrementHandler}
            onDecrement={productNumberDecrementHandler}
          />
          <div
            className={`${styles.product__btn}`}
            onClick={() =>
              dispatch(
                addToCart({
                  ...product,
                  productColor,
                  productNumber,
                  productSize,
                })
              )
            }
          >
            <span className={`${styles.addToCart__btn}`}>Add to cart</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
