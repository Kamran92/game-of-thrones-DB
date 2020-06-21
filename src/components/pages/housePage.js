import React, {Component} from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../error';
import gotService from "../../services/gotService";
import RowBlock from "../rowBlock";
import {Field} from "../itemDetails/itemDetails";
import ItemDetails from "../itemDetails";



export default class HousePage extends Component {
  constructor(props) {
    super(props);
    this.gotService = new gotService()
    this.state = {
      selectedId: "1",
      error: false
    }

    this.onItemSelected = (id) => {
      this.setState({
        selectedId: id
      })
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
    const {error, selectedId} = this.state
    if (error) {
      return <ErrorMessage/>
    }

    const renderItem = ({name, id}) => {
      return {name, id}
    }

    const itemList = (
      <ItemList onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllHouses}
                renderItem={renderItem}/>
    )


    const itemDetails = (
      <ItemDetails charId={selectedId} getData={this.gotService.getHouse}>
        <Field field='name' label='Name'/>
        <Field field='region' label='Region'/>
        <Field field='words' label='Words'/>
        <Field field='titles' label='Titles'/>
        <Field field='overlord' label='Overlord'/>
        <Field field='ancestralWeapons' label='Ancestral weapons'/>
      </ItemDetails>
    )

    return (
      <RowBlock left={itemList} right={itemDetails}/>
    )
  }
}


