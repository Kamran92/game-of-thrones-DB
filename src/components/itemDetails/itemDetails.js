import React, {Component} from 'react';
import './itemDetails.css';
import Spinner from "../spinner";

export default class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      loading: true
    }

    this.updateChar = () => {
      const {charId: id, getData} = this.props
      if (!id) {
        return
      }
      getData(id)
        .then((item) => {
          this.setState(({loading}) => {
            return {
              item,
              loading: !loading
            }
          })
        })
    }
  }

  componentDidMount() {
    this.updateChar()
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.setState(({loading}) => {
        return {
          loading: !loading
        }
      })
      this.updateChar()
    }
  }

  render() {
    const {item, loading} = this.state
    const {children} = this.props
    const spinner = loading ? <Spinner/> : <CharDetailsBlock item={item} children={children}/>

    return (
      <div className="char-details rounded">
        {spinner}
      </div>
    );
  }
}

const CharDetailsBlock = ({item, children}) => {
  const {name} = item
  return (
    <>
      <h4>{name}</h4>
      <ul className="list-group list-group-flush">
        {
          React.Children.map(children, (child) => {
            return React.cloneElement(child, {item})
          })
        }
      </ul>
    </>
  )
}

const Field = ({item, field, label}) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  )
}

export {Field}