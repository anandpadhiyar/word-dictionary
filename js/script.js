// api
// https://api.dictionaryapi.dev/api/v2/entries/en_US/ + word
console.log('This is dictionary api using ajax');

const wordButton = document.getElementById('word-button');
const displayDesc = document.getElementById('display-desc');
const alertMessage = document.getElementById('alert-message');
const errorAlertBox = document.querySelector('.alert');
const closeAlert = document.getElementById('close-alert');
wordButton.addEventListener('click', wordSearch);
closeAlert.addEventListener('click', closeAlertFunc);


function wordSearch() {

    const wordInput = document.getElementById('word-input').value;
    if (wordInput != '') {
        let toPrint = '';
        console.log(wordInput);
        const xml = new XMLHttpRequest();
        xml.open('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en_US/' + wordInput, true);
        xml.onprogress = function () {
            console.log('Loading...');
        }
        xml.onload = function () {
            if (this.status == 200) {
                const results = JSON.parse(this.response);
                console.log(results);
                results.forEach((ele, index) => {
                    ele.meanings.forEach((items, index) => {
                        items.definitions.forEach((item, index) => {
                            console.log(item.definition);
                            toPrint += `<li class="list-group-item">${item.definition}</li>`;
                        });
                    });
                });
                displayDesc.innerHTML = toPrint;
            } else {
                console.log('Some error occurred');
                showAlert('Word is not found, please try something else');
            }
        }
        xml.send();
    }
    else {
        showAlert('Please enter something..');
    }
}

function showAlert(message) {
    // let toPrint = '';
    // toPrint =   `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    //                 <strong>Error!</strong> ${message}
    //                 <button type="button" class="btn-close" aria-label="Close"></button>
    //             </div>`;
    // errorAlert.innerHTML = toPrint;
    // console.log(error)
    alertMessage.innerHTML = message;
    errorAlertBox.style.visibility = 'visible';
    setTimeout(()=> {
        errorAlertBox.style.visibility = 'hidden';
    }, 5000)
}

function closeAlertFunc() {
    errorAlertBox.style.visibility = 'hidden';
}
