import React from 'react'
import { InputGroup, InputGroupText, Input, Container } from "reactstrap";
import searchIcon from "./search.svg"

export default function Search({ search, setSearch, ...props }) {

    return (
        <>
            {/* Search Box */}
            <InputGroup className="input-group-merge mb-4 w-50">
                <InputGroupText><img src={searchIcon} height={20} /></InputGroupText>
                <Input placeholder="search..." onChange={(e) => setSearch(e.target.value)} data-cy="search" />
            </InputGroup>
        </>
    )
}
