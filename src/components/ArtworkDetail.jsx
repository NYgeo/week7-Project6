import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchObjectDetails } from '../api/metApi';

const ArtworkDetail = () => {
  const { objectId } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArtwork = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchObjectDetails(objectId);
        if (data) {
          setArtwork(data);
        } else {
          setError('Artwork not found.');
        }
      } catch (err) {
        setError('Failed to load artwork.');
      } finally {
        setLoading(false);
      }
    };
    loadArtwork();
  }, [objectId]);

  if (loading) return <div>Loading artwork...</div>;
  if (error) return <div>{error}</div>;
  if (!artwork) return null;

  return (
    <div className="artwork-detail">
      <h2>{artwork.title || 'Untitled'}</h2>
      {artwork.primaryImage && <img src={artwork.primaryImage} alt={artwork.title} />}
      <p><strong>Artist:</strong> {artwork.artistDisplayName || 'Unknown'}</p>
      <p><strong>Date:</strong> {artwork.objectDate || 'Unknown'}</p>
      <p><strong>Medium:</strong> {artwork.medium || 'Not specified'}</p>
      <p><strong>Department:</strong> {artwork.department || 'Not specified'}</p>
      {artwork.objectURL && (
        <p><a href={artwork.objectURL} target="_blank" rel="noopener noreferrer">View at The Met</a></p>
      )}
    </div>
  );
};

export default ArtworkDetail;
