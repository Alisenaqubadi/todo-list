import { setNewList_detector } from '../index.js'
import { writedatas } from './writedatas.js'

function switchList(newInputValue) {
  setNewList_detector(newInputValue)
  writedatas(newInputValue)
}

export { switchList }
