import { combineReducers } from 'redux'
import {
  ADD_NEW_RECTANGLE,
  UPDATE_RECTANGLE_POSITION,
  ADD_IMAGE,
  UPDATE_IMAGE_POSITION,
  ROTATE_IMAGE
} from '../actions'
import shortid from 'shortid'

const setUpInitialState = () => {
  return {
    rectList: [ {
      id: shortid.generate(),
      x: 200,
      y: 150,
      width: 150,
      height: 100,
      fill: 'green',
      selected: false,
      stroke: 'black'
    }],
    imageList: []
  }
}

export function adjustRotationCoordinates(startX, startY, rotation, width, height){
  if(rotation===90){ //adjusted
    return{
      x: startX + width,
      y: startY
    }
  } else if(rotation===180){
    return{
      x: startX + width,
      y: startY + height
    }
  } else if(rotation===270){
    return{
      x: startX,
      y: startY + height
    }
  } else {
    return {
      x: startX,
      y: startY
    }
  }
}

export function revertRotationCoordinates(startX, startY, rotation, width, height){
  if(rotation===90){
    return{
      x: startX - width,
      y: startY
    }
  } else if(rotation===180){
    return{
      x: startX - width,
      y: startY - height
    }
  } else if(rotation===270){
    return{
      x: startX,
      y: startY - height
    }
  } else {
    return {
      x: startX,
      y: startY
    }
  }
}

const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const addNewRectangle = (rectList, action) => {

  const newRect = {
    id: shortid.generate(),
    x: Math.random()*900, //Arbitrarily choose max position values that are smaller than the stage for ease of seeing
    y: Math.random()*400,
    width: Math.random()*250,
    height: Math.random()*250,
    fill: getRandomColor(),
    stroke: 'black',
    selected: false
  }

  let newRectList = Object.assign([], rectList)
  newRectList.push(newRect)

  return newRectList
}

const addImage = (imageList, action) => {
  let newImageList = Object.assign([], imageList)
  let newImage = {
    id: action.id,
    x: action.x,
    y: action.y,
    width: action.width,
    height: action.height,
    rotation: action.rotation,
    stroke: 'black',
    imgObj: action.imgObj,
    selected: false
  }

  newImageList.push(newImage)

  return newImageList
}

const rotateImage = (currentImage, action) => {

  if(currentImage.id === action.id){
    let existingRotation = currentImage.rotation
    let newRotation
    if(existingRotation === 270){
      newRotation = 0
    } else {
      newRotation = existingRotation + 90
    }

    let revertedCoords = revertRotationCoordinates(currentImage.x, currentImage.y, existingRotation, currentImage.width, currentImage.height)
    let newCoords = adjustRotationCoordinates(revertedCoords.x, revertedCoords.y, newRotation, currentImage.width, currentImage.height)
    let newImage = Object.assign({}, currentImage, {
      x: newCoords.x,
      y: newCoords.y,
      rotation: newRotation
    })

    return newImage
  } else {
    return currentImage
  }
}

const updateRectangle = (state, action) => {
  switch (action.type) {
    case UPDATE_RECTANGLE_POSITION:
      if(state.id !== action.id){
        return state
      }
      return Object.assign({}, state, {
        x: action.x,
        y: action.y
      })
    default:
      return state
  }
}

const updateImage = (state, action) => {
  switch (action.type) {
    case UPDATE_IMAGE_POSITION:
      if(state.id !== action.id){
        return state
      }
      return Object.assign({}, state, {
        x: action.x,
        y: action.y
      })
    case ROTATE_IMAGE:
      return rotateImage(state, action)
    default:
      return state
  }
}

const rectList = (state, action) => {
  switch (action.type) {
    case ADD_NEW_RECTANGLE:
      return addNewRectangle(state, action)
    case UPDATE_RECTANGLE_POSITION:
      return state.map(rect =>
        updateRectangle(rect, action)
      )
    default:
      return state
  }
}

const imageList = (state, action) => {
  switch (action.type) {
    case ADD_IMAGE:
      return addImage(state, action)
    case UPDATE_IMAGE_POSITION:
      return state.map(image =>
        updateImage(image, action)
      )
    case ROTATE_IMAGE:
      return state.map(image =>
        updateImage(image, action)
      )
    default:
      return state
  }
}

const stageObjects = (state = setUpInitialState(), action) => {
  switch (action.type) {
    case ADD_NEW_RECTANGLE:
      return Object.assign({}, state, {
        rectList: rectList(state.rectList, action)
      })
    case UPDATE_RECTANGLE_POSITION:
      return Object.assign({}, state, {
        rectList: rectList(state.rectList, action)
      })
    case ADD_IMAGE:
      return Object.assign({}, state, {
        imageList: imageList(state.imageList, action)
      })
    case UPDATE_IMAGE_POSITION:
      return Object.assign({}, state, {
        imageList: imageList(state.imageList, action)
      })
    case ROTATE_IMAGE:
      return Object.assign({}, state, {
        imageList: imageList(state.imageList, action)
      })
    default:
      return state
  }
}

const reducers = combineReducers({
  stageObjects: stageObjects
})

export default reducers
