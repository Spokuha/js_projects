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
  baseLevelRange: {
    column: 5,
    row: 5
  },
  generateLevel: function () {
    createEl({
      appendTo: 'body',
      className: 'level',
      style: {
        display: 'grid',
        width: '100vw',
        height: '50vh',
        'grid-template-rows': `repeat(${this.baseLevelRange.row}, 1fr`,
        'grid-template-columns': `repeat(${this.baseLevelRange.column}, 1fr`
      }
    })

    range({ from: this.baseLevelRange.column }).forEach(() => {
      range({ from: this.baseLevelRange.row }).forEach(() => {
        createEl({
          appendTo: '.level',
          className: 'row',
          style: {
            cursor: 'pointer'
          }
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

const menu = createEl({
  appendTo: 'body',
  className: 'menu'
})

const menuButtons = [
  {
    name: 'Начать'
  }
]

menuButtons.forEach(({ name }) => {
  createEl({
    appendTo: `.${menu.className}`,
    innerHTML: name
  })
})
