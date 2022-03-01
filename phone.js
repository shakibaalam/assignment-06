
const error = document.getElementById('error')
const loadSearch = () => {
    // remove previous loaded
    document.getElementById('display-phn').textContent = ''
    document.getElementById('detail').textContent = ''

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = ''
    if (searchText === '') {
        return error.innerText = 'What are you searching for?'
    }
    else {
        error.innerText = ''
        const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.status == false) {
                    return error.innerText = 'your status is false'
                }
                else {
                    displaySearch(data.data)
                }
            })
    }

}
const displaySearch = phones => {

    const displayPhn = document.getElementById('display-phn')

    phones.slice(0, 20).forEach(phone => {
        console.log(phone)
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card w-75 card-style shadow-lg">
                <div class="w-75 ps-5 pt-3">
                <img src="${phone.image}" class="card-img-top" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                    <button type="button" onclick="loadDetails('${phone.slug}')" class="btn btn-style">Details</button>
                </div>
            </div>
       `
        displayPhn.appendChild(div)
    });
    // phones.slice(21, phones.length).forEach(phone => {
    //     const div = document.createElement('div')
    //     div.innerHTML = `
    //     <button type="button" onclick="loadDetailsOthers('${phone.slug}')" class="btn btn-style">Show more</button>
    //    `
    // });

}
const loadDetails = id => {
    document.getElementById('detail').textContent = ''
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))

}
const displayDetails = info => {
    // console.log(info)
    const displayDetail = document.getElementById('detail')
    const div = document.createElement('div')
    div.innerHTML = `
    <div  class="card m-auto w-50 mt-5 detail-card p-5">
        <div class="row g-0">
          <div class="col-md-4 mt-3 ">
              <img src="${info.image}" class="img-fluid rounded-start" alt="...">
              <button type="button" onclick="" class="btn btn-style mt-3">Details</button>
          </div>
          <div class="col-md-8">
            <div class="card-body">
            <h5 class="card-title">${info.name}</h5>
            <p class="card-text">${info.releaseDate}</p>
            <p class="card-text">Chip Set: ${info.mainFeatures.chipSet}</p>
            <p class="card-text">Memory: ${info.mainFeatures.memory}</p>
            <p class="card-text">Storage: ${info.mainFeatures.storage}</p>
            <p class="card-text">Diplay Size: ${info.mainFeatures.displaySize}</p>
            
            </div>
          </div>
        </div>
        </div>
    
    `
    displayDetail.appendChild(div)
}