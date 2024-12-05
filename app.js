const bannarItem = document.getElementById("bannar_item");
const addBannar = document.getElementById("bannar_add");
const searchInput = document.querySelector("[search_data]");
const total = document.getElementById("total_collect");

let arrList = []

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    // console.log(value);
    arrList.forEach(user => {
        const haveStay = user.name.toLowerCase().includes(value);
        if(!haveStay) {
            user.details.classList.add("hide");
        }
        if(haveStay) {
            user.details.classList.remove("hide");
        }
        
        // user.details.classList.toggle("hide",!haveStay)
    }) 
})

fetch("https://www.freetestapi.com/api/v1/users")
.then(res => res.json())
.then(data => {
    UserDetails(data);
})

let UserDetails = (userData) => {
    arrList = userData.map (user => {
        const div = document.createElement("div");
        div.classList.add("item_box");
        div.innerHTML = `
            <h2>Name<br>${user.name} </h2>
            <p>UserName: ${user.username} </p>
            <p>Phone: ${user.phone} </p>
            <div class="email_div"><p>Email:</p><p>${user.email}</p></div>
            <p>City: ${user.address.city} </p>
            <button type="button" class="add_button" onclick="addtogroup('${user.name}','${user.username}')">Add to group</button>
            <button type="button" class="add_button_2" onclick="details('${user.name}','${user.occupation}')" data-bs-toggle="modal" data-bs-target="#exampleModal")">Details</button>
        `;
        bannarItem.append(div);
        return {name: user.name, email: user.email, details: div}
    }
);
}

const addtogroup = (mainName, userName) => {
    const div = document.createElement("div");
    div.classList.add("add_div_box");
    div.innerHTML = `
        <h2>${mainName} </h2>
        <p>UserName: ${userName} </p>
        <div class="right_cls_btn">
        <button type="button" id="cls_btn" class="close_btn" onclick="closeBtn(this)">Close</button>
        </div>
        
    `;
    addBannar.append(div);
    total.innerText = parseInt(total.innerText) + 1;
}

function closeBtn(button) {
    const divtoclose = button.closest('.add_div_box');
    divtoclose.remove();
    total.innerText = parseInt(total.innerText) - 1;
}


const details = (name,occupation) => {
    const sv = document.getElementById("add_modal_head");
    const tt = document.getElementById("modal_head_body");
    sv.innerText = name;
    tt.innerText = occupation;
}
