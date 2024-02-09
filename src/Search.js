import React, { useState } from 'react';

const Search = ({ allBlogs, setFilteredBlogs }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    // Filter blogs based on the search term
    const filteredBlogs = allBlogs.filter((blog) => {
      return blog.name.toLowerCase().includes(newSearchTerm.toLowerCase());
    });

    setFilteredBlogs(filteredBlogs);
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search cats..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;