import React, {Component} from 'react';
import './randomChar.css';
import GotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../error";
import PropTypes from 'prop-types'

export default class RandomChar extends Component {
  constructor(props) {
    super(props);
    this.GotService = new GotService();
    this.state = {
      char: {},
      loading: true,
      error: false
    }

    this.onCharLoaded = (char) => {
      this.setState({char, loading: false})
    }

    this.onError = () => {
      this.setState(() => {
        return {
          error: true,
          loading: false
        }
      })
    }

    this.updateChar = () => {
      const id = Math.floor(Math.random() * 140 + 25)
      this.setState({loading: true})
      this.GotService.getCharacter(id)
        .then(this.onCharLoaded)
        .catch(this.onError)
    }
  }

  componentDidMount() {
    const {interval} = this.props
    this.updateChar()
    this.idTimer = setInterval(this.updateChar, interval)
  }

  componentWillUnmount() {
    clearInterval(this.idTimer)
  }

  render() {
    const {char, loading, error} = this.state
    const spinner = loading ? <Spinner/> : <RandomBlock char={char}/>
    const content = error ? <ErrorMessage/> : spinner
    return (
      <div className="random-block rounded">
        {content}
      </div>
    );
  }
}

RandomChar.defaultProps = {
  interval: 15000
}

RandomChar.propTypes = {
  interval: PropTypes.number
}


const RandomBlock = ({char}) => {
  const {name, gender, born, died, culture} = char
  return (
    <>
      <h4>Random Character: {name}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Gender </span>
          <span>{gender}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Born </span>
          <span>{born}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Died </span>
          <span>{died}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Culture </span>
          <span>{culture}</span>
        </li>
      </ul>
    </>
  )
}

