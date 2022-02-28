


const loadSearch = () => {
    const searchField = document.getElementById('search-field');
    searchText = searchField.value;
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearch(data.data))

}
const displaySearch = phones => {
    console.log(phones)
}