export const range = ({ from, to }) => {
  if (from && to) {
    const newArray = []
    for (let i = from; i <= to; i++) {
      newArray.push(i)
    }

    return newArray
  }

  return [...new Array(from || to).keys()]
}
