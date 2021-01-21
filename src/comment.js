class Comment{
    constructor(comment){
        this.sneaker_id = comment.sneaker_id
        this.comment = comment.message
        this.id = comment.id
    }

    static createComment(e){
        e.preventDefault()
        const commentMessage = e.target.children[0].value
        const commentList = e.target.previousElementSibling
        const sneakerId = e.target.parentElement.dataset.id
        Comment.submitComment(commentMessage, commentList, sneakerId)
        e.target.reset()
    }

    renderComment(commentList){
        const li = document.createElement('li')
        li.dataset.id = this.sneaker_id
        li.innerText = this.comment

        const deleteButton = document.createElement('button')
        deleteButton.innerText = "Delete"
        li.appendChild(deleteButton)
        commentList.appendChild(li)
    }

    static submitComment(comment, commentList, sneakerId){
        fetch(commentURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
            message: comment,
            sneaker_id: sneakerId
            })
        })
        .then(response => response.json())
        .then(comment => {
            let newComment = new Comment(comment.data.attributes)
            newComment.renderComment(commentList)
        })
    }
}