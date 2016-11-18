import React from 'react'
import { Link } from 'react-router'

class PartyChooser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      localUser: "",
      remoteUser: "standin"
    }
  }

  generateUsername() {
    //eventually this should be replaced with oAuth or something more secure but for now this will do.
    var username = '';
    for (var i = 0; i < 20; i++) {
      username += String.fromCharCode(Math.floor(97+(Math.random()*26)))
    }
    return username
  }

  componentDidMount() {
    var usr = this.generateUsername()
    this.setState({localUser: usr});
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value})
  }

  render() {
    return (
      <div data-reactroot="">
        <div className="jumbotron">
          <div className="container">
            <div>
              <h1><span className="dep">Dep</span><span className="olarize">olarize</span> <span className="me">Me</span></h1>
            </div>
            <div>
    					<p>The USA is polarized. Most of the people we know share our views. Want to chat with the other side?</p>
    				</div>
          </div>
          <div className="image-container">
            <div className="donkey">
                <img className="image-donkey" src="assets/donkey-silhouette-black-small.jpg"></img>
                <div className="button-left">
                  <Link to={"/waiting/democrat/" + this.state.localUser} style={{color:'black', textDecoration:'none'}}>
                    <button className="myButton-left">
                      <span>Democrat</span>
                    </button>
                  </Link>
                </div>
            </div>
            <span className="choosecommand-text">Choose your party</span>
            <div className="elephant">
                <img className="image-elephant" src="assets/elephant-silhouette-black-small.png"></img>
                <div className="button-right">
                  <Link to={"/waiting/republican/" + this.state.localUser} style={{color:'black', textDecoration:'none'}}>
                    <button className="myButton-right">
                      <span>Republican</span>
                    </button>
                  </Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PartyChooser
