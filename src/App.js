import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Layer, Stage } from 'react-konva';
import './App.css';
import ImageHolder from './components/ImageHolder'
import Rectangle from './components/Rectangle'
import { addNewRectangle, addImage } from './actions'
import shortid from 'shortid'

class App extends Component {

  constructor(props) {
    super(props);
    this.handleAddRectClick = this.handleAddRectClick.bind(this)
  }

  handleAddRectClick = () => {
    this.props.dispatch(addNewRectangle())
  }

  handleAddImageClick = () => {

    let imageURL = 'http://konvajs.github.io/assets/yoda.jpg'
    let newImg = new window.Image()

    newImg.onload = function(){
      let id = shortid.generate()
      let x = Math.random()*500 //Arbitrarily choose max position values that are smaller than the stage for ease of seeing
      let y = Math.random()*250
      let width = newImg.naturalWidth
      let height = newImg.naturalHeight
      let rotation = 0
      this.props.dispatch(addImage(id, x, y, width, height, rotation, newImg))
    }.bind(this)

    newImg.src = imageURL
  }


  render() {

    const buttonStyleA = {
      backgroundColor: '#4CAF50',
      border: 'none',
      color: 'white',
      padding: '15px 32px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px',
      margin: '4px 8px',
      cursor: 'pointer'
    }

    let imageObjects = []
    let rectObjects = []

    for(var hh=0; hh < this.props.imageList.length; hh++){
      imageObjects.push(
        <ImageHolder
            key={"Img"+hh}
            id={this.props.imageList[hh].id}
            width={this.props.imageList[hh].width}
            height={this.props.imageList[hh].height}
            x={this.props.imageList[hh].x}
            y={this.props.imageList[hh].y}
            image={this.props.imageList[hh].imgObj}
            rotation={this.props.imageList[hh].rotation}
            selected={this.props.imageList[hh].selected}
            stroke={this.props.imageList[hh].stroke}
        />
      )
    }

    for(var ii=0; ii < this.props.rectList.length; ii++){
      rectObjects.push(
        <Rectangle
            key={"Rect"+ii}
            id={this.props.rectList[ii].id}
            width={this.props.rectList[ii].width}
            height={this.props.rectList[ii].height}
            x={this.props.rectList[ii].x}
            y={this.props.rectList[ii].y}
            fill={this.props.rectList[ii].fill}
            selected={this.props.rectList[ii].selected}
            stroke={this.props.rectList[ii].stroke}
        />
      )
    }

    return (
      <div className="App">
        <div>
          <button
            style={buttonStyleA}
            onClick={this.handleAddRectClick}>Add Rectangle</button>
          <button
            style={buttonStyleA}
            onClick={this.handleAddImageClick}>Add Image</button>
        </div>
        <div>
          <Stage width={1000} height={500}>
            <Layer name={"objectLayer"}>
              {rectObjects}
              {imageObjects}
            </Layer>
            <Layer
              name={"dragLayer"} >
            </Layer>
          </Stage>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    imageList: state.stageObjects.imageList,
    rectList: state.stageObjects.rectList,
   }
};

export default connect(mapStateToProps)(App);
