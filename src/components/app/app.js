import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import Button from "../button";
import ErrorMessage from "../error";
import {BrowserRouter, HashRouter, Route} from "react-router-dom";
import RandomChar from "../randomChar";
import {CharacterPage, HousePage, BooksPage, BooksItem} from "../pages";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRandomChar: true,
      error: false
    }

    this.onToggle = () => {
      this.setState(({showRandomChar}) => {
        return {
          showRandomChar: !showRandomChar
        }
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
    const {showRandomChar, error} = this.state
    const randomChar = showRandomChar ? <RandomChar/> : null

    if (error) {
      return <ErrorMessage/>
    }



    return (
      <HashRouter>
        <div>
          <Container>
            <Header/>
          </Container>
          <Container>
            <Row>
              <Col lg={{size: 5, offset: 0}}>
                {randomChar}
              </Col>
            </Row>
            <Row>
              <Button onToggle={this.onToggle}/>
            </Row>
            <Route path='/' exact component={()=><h1 style={{color: '#ffffff'}}>Welcome</h1>}/>
            <Route path='/character' component={CharacterPage}/>
            <Route path='/house' component={HousePage}/>
            <Route path='/books' exact component={BooksPage}/>
            <Route path='/books/:id' exact render={
              ({match}) => {
                const {id} = match.params
                return <BooksItem bookId={id}/>
              }
            }/>
          </Container>
        </div>
      </HashRouter>
    );
  }
}

export default App;