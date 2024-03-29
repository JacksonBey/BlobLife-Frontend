let Users = []
// let userUrl = 'https://bloblife-api.herokuapp.com/users'
let userUrl = 'http://localhost:3000/users'
const body = document.querySelector('body')

function userForm() {

    let formDiv = document.createElement('div')
    formDiv.id = 'formDiv'
    formDiv.innerHTML = 
    `
    <form id='user-login' accept-charset='utf-8'>
        <input type= 'text' name='username' class= 'input' id='username' placeholder='Enter Your Name' autocomplete='off'>
        <input type='submit' name='submit' class='primary button' id='submit' value='submit'>
    </form>
    `
    body.appendChild(formDiv)

    let Users = getUsers();
    document.getElementById('user-login').addEventListener('submit', (e) => {
        e.preventDefault()
        let player = document.getElementById('username').value
        let exists = !!(Users.find(user => user.name === player))
        if (exists) {
            let h3 = document.createElement('h3')
            h3.textContent = `User: ${player}`
            h3.id = Users.find(user => user.name === player).id
            sidebar.appendChild(h3)
            // startBlob()
            selectBlob()
        } 
        else {
            let newUser = {
                'name': player,
                'id': Users.length + 1  // Assuming id is a simple increment.
            };
    
            // Instead of the fetch, push the new user to Users and update localStorage
            Users.push(newUser);
            localStorage.setItem('users', JSON.stringify(Users));
    
            // Rest of your logic remains the same.
            let h3 = document.createElement('h3');
            h3.textContent = `User: ${newUser.name}`;
            h3.id= newUser.id;
            sidebar.appendChild(h3);
            selectBlob();
        }
       
    })
}

// function getUsers() {
//     fetch(userUrl)
//     .then(res => res.json())
//     .then(users =>{
//         // console.log(users)
//         users.forEach(user => Users.push(user))
//     })
// }
function getUsers() {
    // Retrieve users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    return users;
}

function selectBlob() {
    let formDiv = document.getElementById('formDiv')
    if (!!(formDiv)) {formDiv.remove()}

    let blobDiv = document.createElement('div')
    blobDiv.setAttribute('class', 'blobDiv')
    blobDiv.id = 'blobDiv'
    blobDivText = document.createElement('h3')
    blobDivText.textContent = 'Select a Blob:'

    let fireBlobDiv = document.createElement('div')
    fireBlobDiv.id = 'fireBlob'

    let fireBlob = document.createElement('p')
    fireBlob.textContent = 'Blob type: Fire'
    fireBlob.id = 'blob'

    fireBlobDiv.addEventListener('click', e => {
        sidebar.append(fireBlob)
        startBlob('#950c25')
    })

    let fireBlobText = document.createElement('p')
    fireBlobText.textContent = 'Fire Blob. Moves quickly like a firenado.'

    let fireBlobImg = document.createElement('img')
    fireBlobImg.src = 'images/fireBlob.jpg';

    let waterBlobDiv = document.createElement('div')
    waterBlobDiv.id = 'waterBlob'

    let waterBlob = document.createElement('p')
    waterBlob.textContent = 'Blob type: Water'
    waterBlob.id = 'blob'

    waterBlobDiv.addEventListener('click', e => {
        sidebar.append(waterBlob)
        startBlob('#2695d9')
    })

    let waterBlobText = document.createElement('p')
    waterBlobText.textContent = 'Water Blob. Jumps high like a geyser.'

    let waterBlobImg = document.createElement('img')
    waterBlobImg.src = 'images/waterBlob.jpg';

    let earthBlobDiv = document.createElement('div')
    earthBlobDiv.id = 'earthBlob'

    let earthBlob = document.createElement('p')
    earthBlob.textContent = 'Blob type: Earth'
    earthBlob.id = 'blob'

    earthBlobDiv.addEventListener('click', e => {
        sidebar.append(earthBlob)
        startBlob('#b5651d')
    })

    let earthBlobText = document.createElement('p')
    earthBlobText.textContent = 'Earth Blob. Sturdy like a tree. Extra lives.'

    let earthBlobImg = document.createElement('img')
    earthBlobImg.src = 'images/earthBlob.jpg';


    let goldBlobDiv = document.createElement('div')
    goldBlobDiv.id = 'goldBlob'

    let goldBlob = document.createElement('p')
    goldBlob.textContent = 'Blob type: Gold'
    goldBlob.id = 'blob'

    goldBlobDiv.addEventListener('click', e => {
        sidebar.append(goldBlob)
        startBlob('#fca73b')
    })

    let goldBlobText = document.createElement('p')
    goldBlobText.textContent = 'Golden Blob. Moves fast. Jumps high. One life.'

    let goldBlobImg = document.createElement('img')
    goldBlobImg.src = 'images/goldBlob.jpg';

    // greyblob
    let greyBlobDiv = document.createElement('div')
    greyBlobDiv.id = 'greyBlob'

    let greyBlob = document.createElement('p')
    greyBlob.textContent = 'Blob type: Grey'
    greyBlob.id = 'blob'

    greyBlobDiv.addEventListener('click', e => {
        sidebar.append(greyBlob)
        startBlob('grey')
    })

    let greyBlobText = document.createElement('p')
    greyBlobText.textContent = 'Grey Blob. Falls slow like a feather.'

    let greyBlobImg = document.createElement('img')
    greyBlobImg.src = 'images/greyBlob.jpg';

    
    greyBlobDiv.append(greyBlobText, greyBlobImg)
    goldBlobDiv.append(goldBlobText, goldBlobImg)
    fireBlobDiv.append(fireBlobText, fireBlobImg)
    waterBlobDiv.append(waterBlobText, waterBlobImg)
    earthBlobDiv.append(earthBlobText, earthBlobImg)
    blobDiv.append(blobDivText, fireBlobDiv,waterBlobDiv, earthBlobDiv, goldBlobDiv, greyBlobDiv)

    body.append(blobDiv)

}

// startBlob()
userForm()