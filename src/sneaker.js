class Sneaker{

    constructor(sneaker){
        this.id = sneaker.id
        this.colorway = sneaker.attributes.colorway
        this.name = sneaker.attributes.name
        this.brand = sneaker.attributes.brand
        this.price = sneaker.attributes.price
        this.image = sneaker.attributed.image

        Sneaker.allSneakers.push(this)
        this.renderCocktail()
    }
    
    static allSneakers = []
    
    static renderSneaker(sneakers){
        sneakerList.innerHTML = ""
        for (let sneaker of sneakers){
            sneaker.renderSneaker()
        }
    }

    static fetchSneakers(){
        fetch(sneakersURL)
        .then(response => response.json())
        .then(sneakers => {
            for (let sneaker of sneakers.data){
                let newSneakerList = new Sneaker(sneaker)
            }
        })
    }

    renderSneaker(){
    
    const sneakerElement = document.createElement('li')
    sneakerElement.dataset.id = this.id
    sneakerList.appendChild(sneakerElement)

    const h2 = document.createElement('h2')
    h2.className = ("card-header")
    h2.innerText = this.colorway + this.name

    const cardText = document.createElement('p')
    cardText.className = "card-text"
    cardText.innerText = this.brand + this.price
    
    const img = document.createElement('img')
    img.src = this.image
    img.width = 200

    const deleteButton = document.createElement('button')
    deleteButton.className = "btn btn-primary btn-sm"
    deleteButton.innerText = "Remove Sneaker"
    deleteButton.addEventListener("click", this.deleteSneaker)

    
    const commentForm = document.createElement('form')
    commentForm.innerHTML += `<input type="text" class="form-control" id="size-input" placeholder="Size">
    <input type="text" class="form-control" id="comment-input" placeholder="Comment">
    <input type="submit" class="btn btn-primary btn-sm" value="Submit">`

    commentForm.addEventListener("submit", Comment.createComment)

    const commentList = document.createElement('ul')
    commentList.className = "list-group"
    commentList.dataset.id = this.id

    this.comments.forEach(comment =>{
        let newCmnt = new Comment(comment)
        newCmnt.renderComment(coomentList)
    })

    sneakerElement.append (h3, img, commentList, commentForm, cardText, deleteButton )

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

            sneakerForm.reset()
        })
    }

    deleteSneaker(){
        const SneakerId = this.parenElement.dataset.id

        fetch (`${sneakersUTL}/${sneakerId}`, {
            method: "DELETE"
        })

            this.parentELement.remove()
    }
}