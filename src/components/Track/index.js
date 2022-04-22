
import React, { FC, useState } from 'react';
import Button from '../Button';

// type Ttrack = { imageUrl: any, title: any, artist: String, toggleSelect: any }


const Track = ({ imageUrl, title, artist, toggleSelect }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleToggleSelect = () => {
    setIsSelected(!isSelected);
    toggleSelect();
  }

  return (
    <div>

      <div className="card mb-3" style={{ width: '250px' }}>
        <div className="row g-0">
          <div className="col-md-4" >
            <img src={imageUrl} alt={title} className="img-fluid rounded-start" />
          </div>
          <div className="col-md-8" >
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text" style={{ margin: '0px 0px 20px 0px' }}>{artist}</p>
              <Button variant={isSelected ? 'primary' : 'secondary'} onClick={handleToggleSelect}>{isSelected ? 'Deselect' : 'Select'}</Button>
            </div>
          </div>
        </div>
      </div>


    </div >

  );
}


export default Track;