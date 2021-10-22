import React from "react";
import "./SearchResults.css";

function SearchResults(props) {
    return (


    <table className="table table-striped table-hover">
    <thead>
    <tr>
    <th scope="col">Image</th>
    <th scope="col" onClick={props.handleSortChange}>Name {props.sortAsc && <span><i class="bi bi-sort-alpha-down"></i></span>} {!props.sortAsc && <span><i class="bi bi-sort-alpha-down-alt"></i></span>} </th>
    <th scope="col">Phone</th>
    <th scope="col">Email</th>
    <th scope="col">DOB</th>
    </tr>
</thead>
<tbody>
    