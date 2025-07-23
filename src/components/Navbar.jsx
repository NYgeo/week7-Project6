import React from 'react';

const Navbar = ({ searchQuery, setSearchQuery, departmentFilter, setDepartmentFilter, dateFilter, setDateFilter }) => {
  const departments = [
    { id: "1", name: "American Decorative Arts" },
    { id: "3", name: "Ancient Near Eastern Art" },
    { id: "4", name: "Arms and Armor" },
    { id: "5", name: "Arts of Africa, Oceania, and the Americas" },
    { id: "6", name: "Asian Art" },
    { id: "7", name: "The Cloisters" },
    { id: "8", name: "The Costume Institute" },
    { id: "9", name: "Drawings and Prints" },
    { id: "10", name: "Egyptian Art" },
    { id: "11", name: "European Paintings" },
    { id: "12", name: "European Sculpture and Decorative Arts" },
    { id: "13", name: "Greek and Roman Art" },
    { id: "14", name: "Islamic Art" },
    { id: "15", name: "The Robert Lehman Collection" },
    { id: "17", name: "Medieval Art" },
    { id: "18", name: "Musical Instruments" },
    { id: "19", name: "Photographs" },
    { id: "21", name: "Modern Art" }
  ];
  
  const handleSearch = (e) => {
    e.preventDefault();
  };
  
  const handleDepartmentChange = (e) => {
    const value = e.target.value;
    console.log(`Department selected: ${value}`);
    setDepartmentFilter(value);
       };
  
        return (
    <nav className="navbar">
               <form className="search-container" onSubmit={handleSearch}>
              <input
          type="text"
          placeholder="Search artworks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      
      <div className="filter-container">
        <select 
             value={departmentFilter} 
          onChange={handleDepartmentChange}
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>

        <div className="date-filter">
          <label>Date Range:</label>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="">All Time</option>
            <option value="1900">After 1900</option>
                <option value="1800">After 1800</option>
            <option value="1500">After 1500</option>
                 <option value="1000">After 1000</option>
            <option value="0">After 0 CE</option>
            <option value="-1000">Before 0 CE</option>
          </select>
        </div></div> </nav>
  );};

export default Navbar; 