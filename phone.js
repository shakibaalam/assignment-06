//error handle
const error = document.getElementById('error')
//spiner 

//search button clicked
const loadSearch = () => {
    //spinner starts
    document.getElementById('spinner').style.display = 'block'
    // remove previous loaded
    document.getElementById('display-phn').textContent = ''
    document.getElementById('detail').textContent = ''

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = ''
    if (searchText === '') {
        document.getElementById('spinner').style.display = 'none'
        return error.innerText = 'What are you searching for?'
    }
    else {
        error.innerText = ''
        const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.status == false) {
                    document.getElementById('spinner').style.display = 'none'
                    return error.innerText = 'your status is false'
                }
                else {
                    displaySearch(data.data)
                }
            })
    }

}
//display searched 
const displaySearch = phones => {
    //spinner stops
    document.getElementById('spinner').style.display = 'none'
    const displayPhn = document.getElementById('display-phn')
    phones.slice(0, 20).forEach(phone => {
        // console.log(phone.slug)
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

}
//details loading 
const loadDetails = id => {
    //spinner starts
    document.getElementById('spinner').style.display = 'block'
    document.getElementById('detail').textContent = ''
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`
    console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))

}
//display details
const displayDetails = info => {
    //spinner stops
    document.getElementById('spinner').style.display = 'none'
    // console.log(info)
    const displayDetail = document.getElementById('detail')
    const div = document.createElement('div')
    div.innerHTML = `
    <div  class="card m-auto w-75 mt-5 detail-card p-5">
        <div class="row g-0">
          <div class="col-md-4 mt-3 ">
              <img src="${info.image}" class="img-fluid rounded-start" alt="...">
          </div>
          </div>
          <div class="col-md-8">
            <div class="card-body">
            <h5 class="card-title">${info.name}</h5>
            <p class="card-text">${info.releaseDate ? info.releaseDate : 'Not Found '}</p>
            <p class="card-text">Chip Set: ${info.mainFeatures.chipSet}</p>
            <p class="card-text">Memory: ${info.mainFeatures.memory}</p>
            <p class="card-text">Storage: ${info.mainFeatures.storage}</p>
            <p class="card-text">Diplay Size: ${info.mainFeatures.displaySize}</p>
            <p class="card-text"><span class="fw-bold">Sensors:</span> ${info.mainFeatures.sensors}</p>
            <p class="card-text"><span class=" fw-bold">Others:</span>
            <span>Bluetooth-${info?.others?.Bluetooth ? info.others?.Bluetooth : 'not found'} </span>,
            <span>GPS-${info?.others?.GPS ? info.others?.GPS : 'not found'} </span>,
            <span>NFC-${info?.others?.NFC ? info.others?.NFC : 'not found'} </span>,
            <span>Radio-${info?.others?.Radio ? info.others?.Radio : 'not found'} </span>,
            <span>USB-${info?.others?.USB ? info.others?.USB : 'not found'} </span>,
            <span>WLAN-${info?.others?.WLAN ? info.others?.WLAN : 'not found'} </span>
            </p>
            </div>
          </div>
        </div>
        </div>
    
    `
    displayDetail.appendChild(div)
}
