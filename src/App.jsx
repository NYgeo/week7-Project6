import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
  import ArtCard from './components/ArtCard';
import StatsPanel from './components/StatsPanel';
    import { fetchObjectIds, fetchMultipleObjects } from './api/metApi';

function App() {
  const [artworks, setArtworks] = useState([]);
       const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
         const [dateFilter, setDateFilter] = useState('');
  
        useEffect(() => {
         const loadArtworks = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log(`Loading artworks for department: ${departmentFilter || 'all'}`);
        
        const objectIds = await fetchObjectIds(departmentFilter);
        
              if (!objectIds || objectIds.length === 0) {
          console.log('No object IDs returned from API');
                  setArtworks([]);
           setError('No artworks found. Please try a different department.');
          setLoading(false);
          return;
        }
        
        console.log(`Found ${objectIds.length} object IDs, fetching details...`);
        
        const objects = await fetchMultipleObjects(objectIds, 10);

             if (objects.length === 0) {
          console.log('No objects with images found');
              setArtworks([]);
          setError('No artwork images available. Please try a different department.');
        } else {
             console.log(`Successfully loaded ${objects.length} artworks`);
          setArtworks(objects);
          setError(null);
        }
            } catch (err) {
        console.error('Error loading artworks:', err);
        setArtworks([]);
            setError('Failed to load artworks. Please try again.');
      } finally {
        setLoading(false);
      }
           };
           
    loadArtworks();
    
  }, [departmentFilter]); 
  
  const filteredArtworks = artworks.filter(artwork => {
    const matchesSearch = searchQuery === '' || 
      (artwork.title && artwork.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
         (artwork.artistDisplayName && artwork.artistDisplayName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (artwork.medium && artwork.medium.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDate = dateFilter === '' || 
      (dateFilter > 0 && artwork.objectBeginDate >= parseInt(dateFilter)) || 
      (dateFilter < 0 && artwork.objectBeginDate <= parseInt(dateFilter));
    
    return matchesSearch && matchesDate;
  });

          return (
    <div className="app">
      <Header />
       <Navbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />
      
      {/* Stats Panel */}
      {filteredArtworks.length > 0 && <StatsPanel artworks={filteredArtworks} />}
      
      <div className="content">
        {loading ? (
          <div className="loading">Loading artworks from The Met Collection...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : filteredArtworks.length === 0 ? (
          <div className="no-results">No artworks found matching your criteria. Try adjusting your search or filters.</div>
        ) : (
          <div className="artwork-list">
            {filteredArtworks.map(artwork => (
              <ArtCard key={artwork.objectID} artwork={artwork} />
            ))}
          </div>
        )}</div></div>
  );
}

export default App;
