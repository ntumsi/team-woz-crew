import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Container, Button, Row, Col, Modal } from 'react-bootstrap';
import axios from 'axios';
import parse from 'html-react-parser';

require("./index.css");

export class Jobs extends Component {
    constructor(props){
      super(props);
      this.state = {
        jobs: [],
        interest: 'nodeJs',
        readMore: false,
        modalData: { title: "", description: "<div></div>", company: "", location: "" }
      }
    }
  
    componentDidMount = () => {
      this.getGitHubJobs();
    }

    handleModalShow = ( index ) => {
      const { jobs } = this.state

      this.setState({ readMore: !this.state.readMore, modalData: jobs[index] })
    }

    handleShareAction = () => {
      console.log("clicked")
    }

    // Get GitHubJobs API.
    getGitHubJobs = async () => {
      let interest = this.state.interest;
  
      const jobs = await axios.get(`https://cors-anywhere.herokuapp.com/jobs.github.com/positions.json?description=${interest}&location=us`,{crossDomain: true})

      this.setState({
        jobs: jobs.data
      })
    }

    
  render() {
    const { modalData } = this.state
    return (
      <Container fluid  className="jobs">
        <div className="contents">
          <h3>Jobs</h3>
          <hr></hr>
          { this.state.jobs ? this.state.jobs.map(( job, index ) => {
            return (
              <div key={ index }>

                <div className="job-title">
                  <h4>{ job.title }</h4>
                </div>

                <div className="job-content">
                  <p><strong>Company:</strong> { job.company }  |  <strong>Location:</strong> { job.location }</p>
                </div>
                <Button variant="primary" onClick={ this.handleModalShow.bind( this, index )}>
                  Read More
                </Button>
                <Modal
                    { ...this.props }
                    show={ this.state.readMore }
                    onHide={ this.handleModalShow.bind( this, index )}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      <h4>{ modalData.title } </h4>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h5>Company: { modalData.company }  |  Location: { modalData.location }</h5>
                    <div className="job-description">
                      <div>Description: { parse(modalData.description) }</div>
                    </div>
                    <a href={ modalData.url } target="_blank" rel="noopener noreferrer">Go To Posting</a>
                  </Modal.Body>                  
                </Modal>

                <a href={ job.url } target="_blank" rel="noopener noreferrer">Go To Posting</a>
                <Button className="btn" variant="dark" onClick={ this.handleShareAction.bind(this) }>Share</Button>
                <hr></hr>
              </div>
            )
            }) : <div><br></br><h4 className="center">Loading...</h4><br></br></div>
          }
        
        </div>
      </Container>
    )
  }
}
    
export default Jobs
    

    



    







































































































    

