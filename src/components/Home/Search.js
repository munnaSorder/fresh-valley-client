import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './home.css'

const Search = ({searchProduct}) => {
    const [searchValue, setSearchValue] = useState("")

    const customTextFiledStyle = {
        backgroundColor: 'rgba(241,241,241,255)',
        border: 'none',
        height: '50px',
        paddingLeft: '50px',
    }
    return (
        <div style={{width: '40%', margin: '0 auto', marginTop: '50px'}}>
            <div className="d-flex form-container">
                <span className="searchIcon"> <SearchIcon /> </span>
                <input
                    style={customTextFiledStyle}
                    type="text"
                    className="form-control shadow-none"
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search product"
                    required
                />
                <button
                    className="searchBtn" onClick={() => searchProduct(searchValue) }>Search</button>
            </div>
        </div>
    );
};

export default Search;