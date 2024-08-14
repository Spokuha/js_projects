const createEl = ({
  elName = 'div',
  className = '',
  value = null,
  type = '',
  innerHTML = '',
  appendTo = '',
  onclick = null,
  onchange = null,
  style = {},
  datasets = [],
  appendInnerHTML = ''
}) => {
  const el = document.createElement(elName)

  if (className) el.className = className
  if (type) el.type = type
  if (value) el.value = value
  if (style) {
    Object.keys(style).forEach(field => {
      el.style[field] = style[field]
    })
  }
  if (innerHTML) el.innerHTML = innerHTML
  if (onclick) el.onclick = onclick
  if (onchange) el.onchange = onchange
  if (appendInnerHTML) el.append(appendInnerHTML)
  if (datasets.length) {
    datasets.forEach(dataset => {
      el.dataset[dataset.name] = dataset.value
    })
  }

  if (appendTo) {
    const body = document.body
    if (appendTo === 'body') {
      body.append(el)
    } else {
      body.querySelector(appendTo).append(el)
    }
  }

  return el
}

export default createEl
