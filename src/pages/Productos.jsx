import React from 'react'; 
import { useLocation } from 'react-router-dom';
import ItemListContainer from '../components/ItemListContainer';
import CategoryBanner from '../components/CategoryBanner.jsx';

function Productos() {
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search); 
  const category = queryParams.get('categoria'); 

  return (
    <div className="container py-5">
      {category && <CategoryBanner category={category} />}
      <ItemListContainer />
    </div>
  );
}

export default Productos;