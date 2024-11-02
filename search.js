import createEl from './createEl.js;
import NAME from './NAMES.js;

const pathKeys = [];

const pathItem = createEl({
    appendTo: 'body',
    elName: 'p',
    store: [],
    setValue: (value) => value.join('.'),
});

const changePath = (type, newPath) => {
    if (type === NAME.add) pathItem.store.push(newPath);
    if (type === NAME.remove) pathItem.store.pop();
}

const log = (text) => console.log(text)

const input = createEl({
    appendTo: 'body',
    elName: 'input',
    onchange: (e) => {
        const text = e.target.value
        
        showOptions(text)
    },
    className: 'search',
})

const {
    bottom,
    height,
    left,
    width,
} = input.getBoundingClientRect();

const searchList = createEl({
    appendTo: 'body',
    className: 'searchList',
    style: {
        top: bottom,
        left: left,
        overflow: 'auto',
        position: 'fixed',
        height: '256px',
        width: '100vw',
        textAlign: 'center',
        whiteSpace: 'break-spaces',
    },
})

const showOptions = (text = '') => {
    const element = document.body;
    searchList.innerHTML = '';

    for (let key in element) {
        if(!text.length || key.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
            createEl({
                elName: 'p',
                innerHTML: key,
                appendTo: '.searchList',
                onclick: () => changePath(NAME.add, key)
            })
        }
    }
}

showOptions();