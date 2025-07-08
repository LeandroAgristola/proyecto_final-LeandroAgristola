import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import ItemListContainer from '../components/ItemListContainer';
import CategoryBanner from '../components/CategoryBanner.jsx'; // Import the new component

function Productos() {
  const { categoria } = useParams(); // Get category from URL params, if any

  return (
    <div className="container py-5">
      <h2 className="text-center my-4">Nuestros productos</h2>
      {/* Render CategoryBanner if a category is present in the URL */}
      {categoria && <CategoryBanner category={categoria} />}
      <ItemListContainer />
    </div>
  );
}

export default Productos;