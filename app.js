const app = {
  init(selectors) {
    this.flicks = []
    this.max = 0
    this.list = document
      .querySelector(selectors.listSelector)
    this.template = document
      .querySelector(selectors.templateSelector)
    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', this.addFlickViaForm.bind(this))
      
      this.load()
  },

  addFlickViaForm(ev) {
    ev.preventDefault()
    const f = ev.target
    const flick = {
      id: this.max + 1,
      name: f.flickName.value,
    }

    this.flicks.unshift(flick)
    this.save()

    const listItem = this.renderListItem(flick)
    this.list
      .insertBefore(listItem, this.list.firstChild)

    ++ this.max
    f.reset()
  },

  save() {
    localStorage.setItem('flicks', JSON.stringify(this.flicks))
    localStorage.setItem('max', this.max)
  },

  addFlick(flick) {
    const listItem = this.renderListItem(flick)
    this.list
      .insertBefore(listItem, this.list.firstChild)
    const decreaseButton = document.createElement('button')
    decreaseButton.classList.add('button', 'success')
    decreaseButton.innerText = 'Down'
    listItem.appendChild(decreaseButton)
    decreaseButton.addEventListener('click', this.decreaseFunc.bind(this))
    
    
    ++ this.max
    this.flicks.unshift(flick)
    this.save()
  },
  moveUp(ev) {
      const button = ev.target
      const listItem = button.closest('li')
      this.list.insertBefore(listItem, listItem.previousElementSibling)
      this.save()
  },

  // moveDown(ev) {
  //     const button = ev.target
  //     const listItem = button.closest('li')
  //     this.list.insertAfter(listItem, listItem.previousElementSibling)
  // },


  decreaseFunc(ev){
    const keyA = ev.target.parentNode.parentNode
    const keyB = keyA.dataset.key
    const num = this.flicks.indexOf(keyB)

    if(this.flicks[0] == keyA){
        return;
    }
    //switching elements in the array
    const temp = this.flicks[num - 1]
    this.flicks[num] = temp
    this.flicks[num - 1] = keyB

    this.list.insertBefore(ev.target.parentNode, ev.target.parentNode.nextSibling.nextSibling)
    this.save()
},

  renderListItem(flick) {
    const item = this.template.cloneNode(true)
    item.classList.remove('template')
    item.dataset.id = flick.id
    item
      .querySelector('.flick-name')
      .textContent = flick.name

    item
      .querySelector('button.remove')
      .addEventListener('click', this.removeFlick.bind(this))
    item.querySelector('.moveUp').addEventListener('click', this.moveUp.bind(this))

    // item.querySelector('.moveDown').addEventListener('click', this.decreaseFunc.bind(this))

    return item
  },

  removeFlick(ev) {
    const listItem = ev.target.closest('.flick')
    listItem.remove()

    for (let i = 0; i < this.flicks.length; i++) {
        const currentId = this.flicks[i].id.toString()
        if (listItem.dataset.id === currentId) {
            this.flicks.splice(i, 1)
            break
        }
    }



    listItem.remove()
    this.save()

  },

  load() {
      // Get the JSON string out of localStorage
      const flicksJSON = localStorage.getItem('flicks')
      const sysMax = localStorage.getItem('max')
      this.max = sysMax

      // Turn that into an array
      const flicksArray = JSON.parse(flicksJSON)

      // Set this.flicks to that array
      if (flicksArray){
          flicksArray.reverse().map(this.addFlick.bind(this))
      }
  },


    handleSwap(event) {
        event.preventDefault()
        const f = event.target
        const indexOne = document.querySelector('#swapOne').value - 1
        const indexTwo = document.querySelector('#swapTwo').value - 1
        const temp = this.flicks[indexOne]
        this.flicks[indexOne] = this.storedFlicks[indexTwo]
        this.flicks[indexTwo] = temp
        const sysFlicks = JSON.parse(localStorage.getItem('flicks'))
        localStorage.setItem('flicks', JSON.stringify(this.flicks))
        // this.reloadList()
    },
}

app.init({
  formSelector: '#flick-form',
  listSelector: '#flick-list',
  templateSelector: '.flick.template',
})