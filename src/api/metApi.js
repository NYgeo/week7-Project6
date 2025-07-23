export const fetchObjectIds = async (departmentId = '') => {
  try {
    let url;
    
    if (departmentId) {
      url = `/api/public/collection/v1/objects?departmentIds=${departmentId}`;
    } else {
      url = '/api/public/collection/v1/search?hasImages=true&q=art';
        }
    
    console.log(`Fetching from: ${url}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Found ${data.objectIDs?.length || 0} objects`);
    
    return data.objectIDs || [];
  } catch (error) {
    console.error('Error fetching object IDs:', error);
    return [];
  }
};

export const fetchObjectDetails = async (objectId) => {
  try {
    const url = `/api/public/collection/v1/objects/${objectId}`;
    
    const response = await fetch(url);
        if (!response.ok) {
         return null;
    }
    
    const data = await response.json();
    
    if (data && data.primaryImageSmall) {
          return data;
          }
        return null;
      } catch (error) {
          console.error(`Error fetching object ${objectId}:`, error);
    return null;
  }};

        export const fetchMultipleObjects = async (objectIds, limit = 20) => {
  try {
    if (!objectIds || objectIds.length === 0) {
      return [];
       }
    
        const shuffled = [...objectIds].sort(() => 0.5 - Math.random());
    const limitedIds = shuffled.slice(0, Math.min(200, limit * 10));
    
        console.log(`Attempting to fetch details for ${limitedIds.length} objects`);
    
      const validObjects = [];
        let attempts = 0;
    
         for (const id of limitedIds) {
          attempts++;
      if (validObjects.length >= limit || attempts > 200) {
        break;
      }
      
            const obj = await fetchObjectDetails(id);
           if (obj && obj.primaryImageSmall) {
        validObjects.push(obj);
        console.log(`Found valid object: ${obj.title || 'Untitled'} (${validObjects.length}/${limit})`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
         console.log(`Successfully retrieved ${validObjects.length} objects with images`);
       return validObjects;
  } catch (error) {
       console.error('Error fetching multiple objects:', error);
    return [];
      }}; 