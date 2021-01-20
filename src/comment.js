class Comment{
    constructor(comment){
        this.id = comment.id
        this.comment = comment.comment
        this.sneaker_id = comment.sneaker_id
    }

    static createComment(c){
        c.preventDefault()
        const li = document.createElement('li')
        const commentComment = c.target.children[0].value
        const commentList = c.target.nextElementSibling
        const sneakerId = c.target.parentElement.dataset.id

        Comment.submitComment(commentComment, commentList, sneakerId)
        c.target.reset()
    }

    renderComment(commentList){
        
        const li = document.createElement('li')
        li.dataset.id = this.id
        li.innerText = this.comment

        const deleteButton = document.createElement('button')
        deleteButton.className = "badge badge-pill badge-primary"
        deleteButton.innerText = "Delete"

        li.append(deleteButton)

        deleteButton.addEventListener("click", this.deleteComment)
        commentList.appendChild(li)
    }

    static submitComment(commentComment, commentList, sneakerId){
        fetch(commentsURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            comment: commentComment,
            sneaker_id: sneakerId
            })
        })
        .then(response => response.json())
        .then(comment => {
            let newComment = new Comment(comment)
            newComment.renderComment(commentList)
        })
        .catch(err => alert(err))
        }
    
    deleteComment(){
        const commentId= this.parentElement.dataset.id

        fetch (`$(commentsURL)/$(commentId)`,{
            method: "DELETE"            
        })
        this.parentElement.remove()
    }
}