import React, {Component} from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../error';
import gotService from "../../services/gotService";
import RowBlock from "../rowBlock";
import {Field} from "../itemDetails/itemDetails";
import ItemDetails from "../itemDetails";



export default class CharacterPage extends Component {
  constructor(props) {
    super(props);
    this.gotService = new gotService()
    this.state = {
      selectedChar: "41",
      error: false
    }

    this.onItemSelected = (id) => {
      this.setState({
        selectedChar: id
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
    const {error, selectedChar} = this.state
    if (error) {
      return <ErrorMessage/>
    }

    const renderItem = ({name, id}) => {
      return {name, id}
    }

    const itemList = (
      <ItemList onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllCharacters}
                renderItem={renderItem}/>
    )

    const itemDetails = (
      <ItemDetails charId={selectedChar} getData={this.gotService.getCharacter}>
        <Field field='gender' label='Gender'/>
        <Field field='born' label='Born'/>
        <Field field='died' label='Died'/>
        <Field field='culture' label='Culture'/>
      </ItemDetails>
    )

    return (
      <RowBlock left={itemList} right={itemDetails}/>
    )
  }
}


