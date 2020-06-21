import React, {Component} from "react";
import Spinner from "../spinner";
import ErrorMessage from "../error";


export default class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: false
    }

    this.onCharListLoaded = (res) => {
      const {renderItem} = this.props
      const itemList = res.map((item) => renderItem(item))
      this.setState({
          data: itemList,
          loading: false,
          error: false
      })
    }

    this.onError = () => {
      this.setState({
          error: true,
          loading: false
      })
    }

    this.updateCharList = () => {
      const {getData} = this.props
      getData()
        .then(this.onCharListLoaded)
        .catch(this.onError)
    }

  }

  componentDidMount() {
    this.updateCharList()
  }

  render() {
    const {data, loading, error} = this.state
    const {onItemSelected} = this.props
    const charItem = data.map(({name, id}) => {
      return (
        <li className="list-group-item" key={id} onClick={() => onItemSelected(id)}>
          {name}
        </li>
      )
    })
    const spinner = loading ? <Spinner/> : charItem
    const content = error ? <ErrorMessage/> : spinner
    return (
      <ul className="item-list list-group">
        {content}
      </ul>
    )
  }
}




