class Comment{

    constructor(comment){
        
        this.id = comment.id
        this.message = comment.message
        this.sneaker_id = comment.sneaker_id
        // console.log(comment.id)
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
        li.dataset.id = this.id
        li.innerText = this.message

        const deleteButton = document.createElement('button')
        deleteButton.innerText = "Delete"

        li.append(deleteButton)
        
        deleteButton.addEventListener("click", this.deleteComment)
        commentList.appendChild(li)
    }

    static submitComment(commentMessage, commentList, sneakerId){

        fetch(commentsURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                message: commentMessage,
                sneaker_id: sneakerId,
            })
        })
        .then(response => response.json())
        .then(comment => {
            let newComment = new Comment(comment)
            newComment.renderComment(commentList)
        })
    
    }
    
    deleteComment(){
        
        const commentId = this.parentElement.dataset.id
             fetch(`${commentsURL}/${commentId}`,{
             method: "DELETE"
         })
         
         this.parentElement.remove()
    }
}