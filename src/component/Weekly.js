import React, { Component } from 'react';
import axios from 'axios';
import {Bar} from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class Weekly extends Component {
  constructor(){
    super();
    this.state = {
      Data: {},
      open: false
    }
  }
  componentDidMount(){
    //api call is made under componentDidMount
    axios.get(`https://bridge.buddyweb.fr/api/codingapi/weekly`)
    //axios get gets the promise which returns a responce abject
    .then(res => {
          const results = res.data;
          //results is assinged the value of responce data from the api
          let exposed = [];
          let control = [];
          let week = [];
          results.forEach(element => {
            exposed.push(element.exposed);
              //results are looped , each element of the exposed data is pushed into an empty array
            control.push(element.control);
              //results are looped , each element of the control data is pushed into an empty array
            week.push(element.week_commencing);
              //results are looped , each element of the week_commencing data is pushed into an empty array
          });
          this.setState({
            //state is changed
          Data: {
            //x-axis is metric
            labels: week,
            datasets:[
               {  type:'line',
               //contol is the data that is shown as line graph
                  label:'Control',
                  data: control,
                  fill: false,
                  borderColor:'rgba(255,105,145,0.6)'
              }, {
              type:'bar',
              //exposed data is shown as bar graph
              label: 'Exposed',
              data: exposed,
              fill: false,
              backgroundColor: 'rgba(90,178,255,0.6)'
          }//section exposed
        ]// end of dataset
      }//end of data
    });//end of set state
  })//end of axios
}//end of componentDidMount
  handleOpen = () => {
  this.setState({ open: true });
};
//function changes the state to true
  handleClose = () => {
  this.setState({ open: false });
};//function changes state to false
  render() {
    return (
      <div>
      <Grid container item sm={12}>
      {/*grid system is implemented*/}
        <Grid item sm>
          <article className="canvas-container">
          {/*section for the bar graph*/}
          <Bar
          data = {this.state.Data}
          options = {{
          title: {
          display: true,
          text: "Line Graph that show the difference between Control & Exposed value per week ",
          fontSize: 22
          },

          }}
          />
          </article>
        </Grid>
        <Grid item sm>
        {/*paragraph text that appears on the right of the bar graph*/}
          <p className="animated fadeInRight slower">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with the
          release of Letraset sheets containing Lorem</p>
          {/*button modal is implemented that shows more information*/}
          <Button onClick={this.handleOpen} className="animated infinite pulse slower" style={{marginTop:'20px'}}>More Info</Button>
          <Modal
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          >
          {/*below is text that appeears when the modal is selected*/}
          <div style={{postion:'absolute',width:'100',backgroundColor:'white',padding:'50px',margin:'220px'}}>
          <Typography variant="subtitle1" id="simple-modal-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with the
          release of Letraset sheets containing Lorem.
          </Typography>
          </div>
          </Modal>
        </Grid>
      </Grid>
      </div>
    );
  }
}

export default Weekly;
