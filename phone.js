


const loadSearch = () => {
    const searchField = document.getElementById('search-field');
    searchText = searchField.value;
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearch(data.data))

}
const displaySearch = phones => {

    const displayPhn = document.getElementById('display-phn')
    phones.forEach(phone => {

        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                    <button type="button" onclick="loadDetails('${phone.slug}')" class="btn btn-danger">Details</button>
                </div>
            </div>
       `
        displayPhn.appendChild(div)
    });
}
const loadDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))

}
const displayDetails = info => {
    console.log(info)
    const displayDetail = document.getElementById('detail')
    const div = document.createElement('div')
    div.innerHTML = `
        <div class="mt-5 d-flex">
                <div>
                <img src="${info.image}" class="m-auto" alt="...">
                <button type="button" onclick="" class="btn btn-danger mt-3">Details</button>
                </div>
                <div>
                <h5 class="card-title">${info.name}</h5>
                    <p class="card-text">${info.releaseDate}</p>
                    <p class="card-text">Chip Set: ${info.mainFeatures.chipSet}</p>
                    <p class="card-text">Memory: ${info.mainFeatures.memory}</p>
                    <p class="card-text">Storage: ${info.mainFeatures.storage}</p>
                    <p class="card-text">Diplay Size: ${info.mainFeatures.displaySize}</p>
                    
                </div>

        </div>
        `
    displayDetail.appendChild(div)


}