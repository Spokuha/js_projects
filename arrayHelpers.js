export const range = ({ from = 0, to = 0 }) => {
  if (from !== 0 && to !== 0) {
    const newArray = []
    for (let i = from; i <= to; i++) {
      newArray.push(i)
    }

    return newArray
  }

  return [...new Array(from || to).keys()]
}
