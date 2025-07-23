import React from 'react';

const StatsPanel = ({ artworks }) => {
   const totalArtworks = artworks.length;
  
  const artworksWithImages = artworks.filter(artwork => artwork.primaryImageSmall).length;
   const percentWithImages = totalArtworks > 0 
    ? Math.round((artworksWithImages / totalArtworks) * 100) 
       : 0;
  
   const modern = artworks.filter(art => art.objectBeginDate >= 1900).length;
     const renaissance = artworks.filter(art => art.objectBeginDate >= 1400 && art.objectBeginDate < 1900).length;
     const ancient = artworks.filter(art => art.objectBeginDate < 1400).length;
  
     const uniqueMediums = new Set(artworks.map(art => art.medium)).size;

  return (
    <div className="stats-panel">
       <h2>Collection Statistics</h2>
      <div className="stats-grid">
            <div className="stat-box">
          <h3>{totalArtworks}</h3>
          <p>Total Artworks</p>
        </div>
           <div className="stat-box">
         <h3>{percentWithImages}%</h3>
             <p>With Images</p>
        </div>
        <div className="stat-box">
           <h3>{uniqueMediums}</h3>
          <p>Unique Mediums</p>
             </div>
        <div className="stat-box">
          <h3>{modern} / {renaissance} / {ancient}</h3>
          <p>Modern / Renaissance / Ancient</p>
        </div></div></div>
);};

export default StatsPanel; 