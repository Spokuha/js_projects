import createEl from './createEl.js'
import NAME from './NAMES.js'
import { range } from './arrayHelpers.js'

const ENTITY = {
  coords: {},
  [`${NAME.action}Id`]: '',
  [`${NAME.entity}Id`]: '',
  name: ''
}

const createEntity = ({ name }) => {
  const newEntity = {
    ...ENTITY,
    [`${NAME.entity}Id`]: IDS.add({ type: NAME.entity }),
    name
  }

  IDS.add({ entity: newEntity, type: NAME.entity })

  return newEntity
}

const IDS = {
  [NAME.action]: {},
  [NAME.entity]: {},
  add: function ({ entity = ENTITY, type = NAME.action }) {
    const typeId = this[type]

    let newMaxId = entity[`${type}Id`]

    if (!newMaxId) {
      Object.keys(typeId).reduce((maxId, currentId) => {
        if (Number(maxId) < currentId) return currentId

        return maxId
      }, 0)

      newMaxId += 1
    }

    typeId[newMaxId] = entity

    return newMaxId
  }
}

const player = createEntity({ name: 'player' })

console.log('IDS', IDS)

const gameWorld = {
  baseLevelRange: [5, 5],
  generateLevel: function () {
    createEl({
      appendTo: 'body',
      className: 'level'
      style: {
        display: 'grid',
        gridTemplateRow: `${this.baseLevelRange[0]}fr`
      }
    })

    range({ from: this.baseLevelRange[0] }).forEach(x => {
      range({ from: this.baseLevelRange[1] }).forEach(y => {
        createEl({
          appendTo: '.game'
        })
      })
    })
  },
  world: {
    ['0,0']: {
      units: []
    }
  },
  level: {
    ['0,0']: {
      units: []
    }
  }
}

gameWorld.generateLevel()
