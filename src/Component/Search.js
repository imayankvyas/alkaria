import React from 'react'
import { InputGroup, InputGroupText, Input } from "reactstrap";
import searchIcon from "./search.svg"


export default function Search({ search, setSearch, ...props }) {

    return (
        <>
            {/* Search Box */}
            <InputGroup className="input-group-merge mb-4 w-50">
                <InputGroupText><img src={searchIcon} height={20} alt='search-icon' /></InputGroupText>
                <Input className="searchInput" placeholder="search..." onChange={(e) => setSearch(e.target.value.trim())} data-cy="search" />

            </InputGroup>
        </>
    )
}
