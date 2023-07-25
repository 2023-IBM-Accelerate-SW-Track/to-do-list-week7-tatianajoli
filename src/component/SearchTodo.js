import React, { Component } from "react";
import { Button, TextField, createTheme, ThemeProvider } from "@mui/material";
import Axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: '#801aad',
    },
  },
});

class SearchTodo extends Component {
  
  state = {
    tmpdata: [],
  };

  handleChange = (e) => {
    this.setState({
      content: e.target.value,
      date: Date().toLocaleString('en-US'),
    });
  };
  

  handleSubmit = (e) => {
    //Begin Here
    e.preventDefault();  
    // HTTP Client to send a GET request
    Axios({
      method: "GET",
      url: "http://localhost:8080/items/search",
      headers: {
        "Content-Type": "application/json" 
      },
      params: {
        taskname: this.state.content
      }
    }).then(res => {
      this.setState({
        tmpdata: JSON.stringify(res.data),
      });
      // uncomment to see from the browser console log what is returned 
      //console.log(this.state.tmpdata);
    });
  };
  
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="search-item-input"
            label="Search for ToDo Item"
            variant="outlined"
            onChange={this.handleChange}
            value={this.state.value}
          /> 
          <ThemeProvider theme={theme}>
          <Button
            style={{ marginLeft: "10px" }}
            onClick={this.handleSubmit}
            variant="contained"
            color="primary"
            data-testid="new-item-button"
          >
            Search
          </Button>
        </ThemeProvider>
        </form>
        <div>{this.state.tmpdata}</div>
      </div>
    );
  }
}

export default SearchTodo;
