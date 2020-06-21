import React, {Component} from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../error';
import gotService from "../../services/gotService";
import {withRouter} from "react-router-dom";


class BooksPage extends Component {
  constructor(props) {
    super(props);
    this.gotService = new gotService()
    this.state = {
      error: false
    }
  }


  componentDidCatch() {
    this.setState(({error}) => {
      return {
        error: !error
      }
    })
  }

  render() {
    const {error} = this.state
    const {history} = this.props

    if (error) {
      return <ErrorMessage/>
    }

    const renderItem = ({name, id}) => {
      return {name, id}
    }

    return (
      <ItemList onItemSelected={(itemId)=> {
        history.push(itemId)
      }}
                getData={this.gotService.getAllBooks}
                renderItem={renderItem}/>
    )
  }
}

export default withRouter(BooksPage)


