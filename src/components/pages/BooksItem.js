import React, {Component} from 'react'
import gotService from "../../services/gotService";
import {Field} from "../itemDetails/itemDetails";
import ItemDetails from "../itemDetails";

class BooksItem extends Component {
  constructor(props) {
    super(props);
    this.gotService = new gotService()
  }

  render() {
    const {bookId}= this.props
    return (
      <ItemDetails charId={bookId} getData={this.gotService.getBook}>
        <Field field='name' label='Name'/>
        <Field field='numberOfPages' label='Number of pages'/>
        <Field field='publisher' label='Publisher'/>
        <Field field='released' label='Released'/>
      </ItemDetails>
    )
  }
}

export default BooksItem