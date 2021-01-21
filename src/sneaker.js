class Sneaker{

    static allSneakers = []

    constructor(sneaker){
        this.id = sneaker.id
        this.colorway = sneaker.attributes.colorway
        this.name = sneaker.attributes.name
        this.brand = sneaker.attributes.brand
        this.price = sneaker.attributes.price
        this.image = sneaker.attributes.image

        Sneaker.allSneakers.push(this)
    }
        
    static renderSneaker(sneakers){
        for (let sneaker of this.allSneakers){
            sneaker.renderSneaker()
        }
    }

    static fetchSneakers(){
        fetch(sneakersURL)
        .then(response => response.json())
        .then(sneakers => {
            for (let sneaker of sneakers.data){
                let newSneakerList = new Sneaker(sneaker)
            newSneakerList.renderSneaker
            }
        this.renderSneaker()
        })
    }

    renderSneaker(){
    
    const sneakerLi = document.createElement('li')
    sneakerLi.dataset.id = this.id
    sneakerList.appendChild(sneakerLi)

    const h2 = document.createElement('h2')
    h2.className = ("card-header")
    h2.innerText = this.colorway + " " + this.name

    const p = document.createElement('p')
    p.className = ("card-text")
    p.innerText = this.brand + " " + this.price

    const img = document.createElement('img')
    img.src = this.image
    img.width = 200

    const deleteButton = document.createElement('button')
    deleteButton.className = "btn btn-primary btn-sm"
    deleteButton.innerText = "Remove Sneaker"
    deleteButton.addEventListener("click", this.deleteSneaker)

    
    const commentForm = document.createElement('form')
    commentForm.innerHTML += `<input type="text" class="form-control" id="comment-input" placeholder="Comment">
    <input type="submit" class="btn btn-primary btn-sm" value="Submit">`

    commentForm.addEventListener("submit", Comment.createComment)

    const commentList = document.createElement('ul')
    commentList.className = "list-group list-group-flush"
    commentList.dataset.id = this.id

    sneakerLi.append (h2, img, p, commentList, commentForm, deleteButton)

    }
    
    static submitSneaker(s){
        s.preventDefault()
        fetch(sneakersURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },           
            body: JSON.stringify({
            colorway: sneakerColorway.value,
            name: sneakerName.value,
            brand: sneakerBrand.value,
            price: sneakerPrice.value,
            image: sneakerImage.value,
            })
        })
        .then(response => response.json())
        .then(sneaker => {
            let newSneaker = new Sneaker(sneaker.data)
            console.log(newSneaker)
            newSneaker.renderSneaker()
            sneakerForm.reset()
        })
    }

    deleteSneaker(){
        const sneakerId = this.parentElement.dataset.id

        fetch(`${sneakersURL}/${sneakerId}`, {
            method: "DELETE"
        })
            // .catch(err => alert(err))
            this.parentElement.remove()
    }
}
