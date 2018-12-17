import React, { Component } from 'react';
import axios from 'axios';
import {Bar} from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class TopPCT extends Component {
  constructor(){
    super();
    this.state = {
      Data: {},
      open: false
    }
  }
  componentDidMount(){
    //api call is made under componentDidMount
    axios.get(`https://bridge.buddyweb.fr/api/sains/sains`)
    //axios get gets the promise which returns a responce abject
    .then(res => {
          const results = res.data;
          //results is assinged the value of responce data from the api
          let metric = [];
          let uplift = [];
          results.forEach(element => {
            metric.push(element.metric);
            //results are looped , each element of the metric data is pushed into an empty array
            uplift.push(element.uplift);
            //results are looped , each element of the uplift data is pushed into an empty array
          });
          this.setState({
            //state is changed
          Data: {
            labels: metric,
            //x-axis is metric
            datasets:[
               {
                  label:'Uplift',
                  //y-axis is uplift
                  data: uplift,
                  //color for each element in the bar graph
                  backgroundColor:[
                    'rgba(255,105,145,0.6)',
                    'rgba(255,105,145,0.6)',
                    'rgba(255,105,145,0.6)',
                    'rgba(255,105,145,0.6)',
                    'rgba(255,105,145,0.6)',
                    'rgba(255,105,145,0.6)',
                    'rgba(255,105,145,0.6)',
                    'rgba(255,105,145,0.6)',
                    'rgba(255,105,145,0.6)',
                    'rgba(255,105,145,0.6)',
                    'rgba(255,105,145,0.6)',
                    'rgba(255,105,145,0.6)',

                ]
              }

            ]//end of datasets
         }//end of datasets
       }); //end of setState
      })
  }
  handleOpen = () => {
  this.setState({ open: true });
};
//function changes the state to true
  handleClose = () => {
  this.setState({ open: false });
};
//function changes state to false

  render() {
    return (
      <div>
      {/*grid system is implemented*/}
      <Grid container item sm={12}>
        <Grid item sm>
          <article className="canvas-container">
          {/*section for the bar graph*/}
            <Bar
            data = {this.state.Data}
            options = {{
            title: {
            display: true,
            text: "Table that show Uplift value compared to the Metric",
            fontSize: 22
            }
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
export default TopPCT;
