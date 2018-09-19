import React from 'react'
import { connect } from 'react-redux'
import { Image } from 'react-konva'
import {
  updateImagePosition,
  rotateImage
  } from '../actions'

class ImageHolder extends React.Component {

  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseOut = this.handleMouseOut.bind(this)
    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleDragEnd = this.handleDragEnd.bind(this)
  }

  handleMouseEnter = () => {
    document.body.style.cursor = 'pointer'
  }

  handleMouseOut = () => {
    document.body.style.cursor = 'default'
  }

  handleDblClick = (evt) => {
    evt.evt.preventDefault()
    this.props.dispatch(rotateImage(this.props.id))
  }

  handleDragStart = (evt) => {

    var stage = this.refs.imageObj.getStage()
    var imageLayer = this.refs.imageObj.getLayer()
    var dragLayer = stage.find('.dragLayer')[0]
    dragLayer.add(this.refs.imageObj)

    //Redraw the canvas image layer once so the image doesn't get 'stuck' in place
    imageLayer.draw()
  }

  handleDragEnd = (evt) => {

    const imageObj = this.refs.imageObj
    var stage = imageObj.getStage()
    var objectLayer = stage.find('.objectLayer')[0]

    //Move image back to canvas layer and its original group
    objectLayer.add(imageObj)

    this.props.dispatch(updateImagePosition(this.props.id, imageObj.x(), imageObj.y()));
  }

  render() {

    return (
      <Image
        ref="imageObj"
        key={this.props.id}
        name={this.props.id}
        image={this.props.image}
        x={this.props.x}
        y={this.props.y}
        width={this.props.width}
        height={this.props.height}
        rotation={this.props.rotation}
        stroke={this.props.stroke}
        strokeWidth={2}
        strokeHitEnabled={false}
        shadowForStrokeEnabled={false}
        draggable={true}
        onMouseEnter={this.handleMouseEnter}
        onMouseOut={this.handleMouseOut}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
        onDblClick={this.handleDblClick}
        />
    )
  }
}

export default connect()(ImageHolder);
