const sneakersURL = "http://localhost:3000/sneakers"
const commentsURL = "http://localhost:3000/comments"
const sneakerForm = document.getElementById("sneaker-form")
const sneakerColorway = document.getElementById("sneaker-colorway")
const sneakerName = document.getElementById("sneaker-name")
const sneakerBrand = document.getElementById("sneaker-brand")
const sneakerPrice = document.getElementById("sneaker-price")
const sneakerImage = document.getElementById("sneaker-image")
const sneakerList = document.getElementById("sneaker-list")
// const sortByPrice = document.getElementById("sort-by-price")

sneakerForm.addEventListener("submit", Sneaker.submitSneaker)
Sneaker.fetchSneakers()
// sortByPrice.addEventListener("click", Sneaker.sortSneaker)