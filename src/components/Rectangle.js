import React from 'react';
import { connect } from 'react-redux'
import { Rect } from 'react-konva';
import {
  updateRectanglePosition
} from '../actions'

class Rectangle extends React.Component {

    constructor(props) {
      super(props);
      this.handleMouseEnter = this.handleMouseEnter.bind(this)
      this.handleMouseOut = this.handleMouseOut.bind(this)
      this.handleDragEnd = this.handleDragEnd.bind(this);
      this.handleDragStart = this.handleDragStart.bind(this);
    }

    handleMouseEnter = () => {
      document.body.style.cursor = 'pointer'
    }

    handleMouseOut = () => {
      document.body.style.cursor = 'default'
    }

    handleDragStart = (evt) => {

      var objectLayer = this.refs.rectangle.getLayer()
      var stage = this.refs.rectangle.getStage()
      var dragLayer = stage.find('.dragLayer')[0]

      //Move to it's own layer for better perf
      dragLayer.add(this.refs.rectangle)

      //Redraw the mount layer once so the rectangle doesn't get 'stuck' in place
      objectLayer.draw()
    }

    handleDragEnd = (evt) =>{

      evt.evt.preventDefault();

      var stage = this.refs.rectangle.getStage()
      var objectLayer = stage.find('.objectLayer')[0]

      //Move image back to mount layer and its original group
      const rectObj = this.refs.rectangle
      objectLayer.add(rectObj)
      this.props.dispatch(updateRectanglePosition(this.props.id, rectObj.x(), rectObj.y()));
    }

    render() {

      return (
          <Rect
            ref="rectangle"
            key={this.props.id}
            name={this.props.id}
            width={this.props.width}
            height={this.props.height}
            x={this.props.x}
            y={this.props.y}
            fill={this.props.fill}
            stroke={this.props.stroke}
            strokeWidth={5}
            strokeHitEnabled={false}
            shadowForStrokeEnabled={false}
            onClick={this.handleClick}
            onMouseEnter={this.handleMouseEnter}
            onMouseOut={this.handleMouseOut}
            onDragStart={this.handleDragStart}
            onDragEnd={this.handleDragEnd}
            draggable={true}
          />
      );
    }
}

export default connect()(Rectangle);
