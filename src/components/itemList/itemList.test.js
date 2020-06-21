import React from 'react'
import ItemList from './ItemList'
import {mount} from 'enzyme'
import gotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../error";


describe('Testing <ItemList/>', () => {
  const service = new gotService()
  const renderItem = ({name, id}) => ({name, id})
  const onItemSelected = () => {}

  const list = mount(
    <ItemList
      getData={service.getAllHouses}
      renderItem={renderItem}
      onItemSelected={onItemSelected}
    />
  )

  it('Checking the download output', () => {
    list.setState(
      {
        loading: true
      }
    )
    expect(list.contains([
      <ul className="item-list list-group">
        <Spinner/>
      </ul>
    ])).toEqual(true)

  })

  it('Checking for error output', () => {
    list.setState(
      {
        error: true
      }
    )
    expect(list.contains([
      <ul className="item-list list-group">
        <ErrorMessage/>
      </ul>
    ])).toEqual(true)
  })

})
