import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProductDetailsFromCard } from '../../actions';
import starburst from '../../assets/starburst.png';
import { useSelector } from 'react-redux';
import { displaySaleIds } from '../../reducers';

const ItemCard = ({ product }) => {
  const dispatch = useDispatch();
  const COLORS = useSelector((state) => state.designSetting);
  // ensure card has sale item data no matter where it's accessed from:
  const saleIds = useSelector(displaySaleIds);

  const {
    id,
    name,
    price,
    body_location,
    category,
    imageSrc,
    numInStock,
    companyId,
  } = product;

  let isOnSale = false;
  let discountPrice = 0;

  if (saleIds.includes(id)) {
    isOnSale = true;
    discountPrice = Math.round(Number(price.slice(1)) * 85) / 100;
  }

  // styled components:
  const Special = styled.div`
    color: whitesmoke;
    padding: 4px;
    z-index: 2;
    background-image: url(${starburst});
    background-repeat: no-repeat;
    background-size: 100%;
    height: 72px;
    width: 96px;
  `;

  const StruckThru = styled.span`
    text-decoration: line-through;
    color: ${COLORS.filter};
    margin-right: 8px;
  `;

  const Wrapper = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 240px;
    height: 360px;
    padding: 10px;
    margin: 10px 0;
    box-shadow: 5px 5px 5px grey, 5px 5px 8px ${COLORS.header};
    color: black;
    text-decoration: none;
    text-align: center;
    border-radius: 5px;
    transition: 250ms ease-in-out;
    background: ${COLORS.background};
    &:hover {
      transform: scale(1.01);
    }
    @media (max-width: 420px) {
      transform: scale(0.75);
      &:hover {
        transform: scale(0.78);
      }
    }
  `;

  return (
    <Wrapper
      onClick={() => dispatch(setProductDetailsFromCard(product))}
      to={`/product/${id}`}
    >
      <img src={imageSrc} />
      <div>{name}</div>
      {isOnSale ? (
        <div style={{ display: 'flex' }}>
          <StruckThru style={{ position: 'relative', top: 18 }}>
            {price}
          </StruckThru>
          <Special>
            <span
              style={{ position: 'relative', top: 14 }}
            >{`$${discountPrice.toFixed(2)}`}</span>
          </Special>
        </div>
      ) : (
        <span>{price}</span>
      )}
    </Wrapper>
  );
};

export default ItemCard;
