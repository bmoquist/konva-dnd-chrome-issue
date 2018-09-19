export const ADD_NEW_RECTANGLE = 'ADD_NEW_RECTANGLE'
export const UPDATE_RECTANGLE_POSITION = 'UPDATE_RECTANGLE_POSITION'
export const ADD_IMAGE = 'ADD_IMAGE'
export const UPDATE_IMAGE_POSITION = 'UPDATE_IMAGE_POSITION'
export const ROTATE_IMAGE = 'ROTATE_IMAGE'

export const addNewRectangle = () => {
  return {
    type: ADD_NEW_RECTANGLE
  }
}

export const updateRectanglePosition = (id, x, y) => {
  return {
    type: UPDATE_RECTANGLE_POSITION,
    id: id,
    x: x,
    y: y
  }
}

export const addImage = (id, x, y, width, height, rotation, imgObj) => {
  return {
    type: ADD_IMAGE,
    id: id,
    imgObj: imgObj,
    x: x,
    y: y,
    width: width,
    height: height,
    rotation: rotation
  }
}

export const updateImagePosition = (id, x, y) => {
  return {
    type: UPDATE_IMAGE_POSITION,
    id: id,
    x: x,
    y: y
  }
}

export const rotateImage = (id) => {
  return {
    type: ROTATE_IMAGE,
    id: id
  }
}
