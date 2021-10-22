import React, { Component } from "react";
import Header from "./components/header/Header";
import API from "./utils/API";
import SearchForm from "./components/SearchForm/SearchForm";
import SearchResults from "./components/SearchResults/SearchResults";
import Moment from 'moment';
import  {sortItems}  from "./utils/sort";

class App extends Component {
    state = {
    search: "",
    results: [],
    filteredresults:[],
    sortAsc:true,
    error: ""
    };

    componentDidMount() {
    API.getEmployees()
        .then(res => {
        var resultItems= res.data.results.map(data=>{return {Image:data.picture.medium, Name:data.name.first+' '+data.name.last,Phone:data.phone,Email:data.email, DOB:Moment(data.dob.date).format('MM-DD-YYYY')  }});
        this.setState({ results:resultItems,filteredresults:sortItems(resultItems,this.state.sortAsc) });
        }
        )
        .catch(err => console.log(err));
    }