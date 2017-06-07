const app = {
    init(selectors) {
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        this.storedFlicks = []
        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', this.addFlick.bind(this))
        document.querySelector(selectors.swapSelector).addEventListener('submit', this.handleSwap.bind(this))
    },
    
    addFlick(ev) {
        ev.preventDefault()

        const f = ev.target
        const flick = {
            id: this.max + 1,
            name: f.flickName.value,
        }
        
        const listItem = this.renderListItem(flick)
        // this.list.appendChild(listItem)
        this.storedFlicks.push(listItem.textContent)
        this.reloadList()
        this.max++
    },

    renderListItem(flick) {
        const item = document.createElement('li')
        item.textContent = flick.name
        return item
    },
    reloadList() {
        this.list.innerHTML = ''
        for (let i = 0; i < this.storedFlicks.length; i++) {
            this.list.appendChild(this.createLI(this.storedFlicks[i], i))

            document.querySelector(`#s${i}`).addEventListener("click", this.handleDelete.bind(this))
            document.querySelector(`#h${i}`).addEventListener("click", this.handleHighlight.bind(this))
        }
    },

    createLI(content, number) {
        const li = document.createElement('li')

        const send = document.createElement('button')
        send.setAttribute("id", "s" + number)
        send.textContent = "Delete"
        li.appendChild(send)

        const highlight = document.createElement('button')
        highlight.setAttribute("id", "h" + number)
        highlight.textContent = 'Highlight'
        li.appendChild(highlight)

        const span = document.createElement('span')
        span.textContent = content
        li.appendChild(span)
        return li
    },

    handleDelete(event) {
        event.preventDefault()
        const itemContent = event.target.parentElement.querySelector('span').textContent
        console.log(this.storedFlicks.length)
        for (let i = 0; i < this.storedFlicks.length; i++) {
            if (itemContent === this.storedFlicks[i]) {
                this.storedFlicks.splice(i, 1)
                break
            }
        }
        event.target.parentElement.outerHTML = "";
    },
    handleHighlight(event) {
        event.preventDefault()
        if (event.target.parentElement.style.color == "green") {
            event.target.parentElement.style.color = "black"
            event.target.parentElement.style.fontFamily = "times"
            event.target.parentElement.style.fontSize = "18px"
        } else {
            event.target.parentElement.style.color = "green"
            event.target.parentElement.style.fontFamily = "Comic Sans MS"
            event.target.parentElement.style.fontSize = "50px"
        }
    },
    handleSwap(event) {
        event.preventDefault()
        const f = event.target
        const indexOne = document.querySelector('#swapOne').value - 1
        const indexTwo = document.querySelector('#swapTwo').value - 1
        const temp = this.storedFlicks[indexOne]
        this.storedFlicks[indexOne] = this.storedFlicks[indexTwo]
        this.storedFlicks[indexTwo] = temp
        this.reloadList()
    }

}

app.init({
  formSelector: '#flickForm',
  listSelector: '#flickList',
  swapSelector: '#swapForm',
})

    $(function(){
        var y = 0;
        setInterval(function(){
            y+=1;
            $('body').css('background-position', y + 'px 0');
        }, 10);
    })