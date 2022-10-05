let accountID = "";

// Loads accounts user has access to into Accounts Dropdown in Nav Bar
async function loadAccounts(){
  try {     
    const response = await fetch('https://itp.vlee.me.uk/account/access', {
      headers: {"Content-type": "application/json"},
      method: 'get',
      credentials:"include"
    }).then(response => response.json())
    .then(json => {
        // Create a variable to store HTML
        let li = ``;
        let dd = ``;
        // href = "/${user.id}"
        
        // Loop through each data and add a table row
        json.forEach(user => {
            li += `<li><a class="dropdown-item" href="#">${user.name} (${user.reference})</a></li>`;
            dd += `<option selected value=${user.id}>${user.name}</option>`
            accountID = user.id;
           

        });
    
    // Display result
    document.getElementById("accountList").innerHTML = li;
    document.getElementById("accountSelect").innerHTML = dd;
    
});
  } catch(err) {
    console.error(`Error: ${err}`);
  }
  
};

//loadAccounts();

// Sets the account to the one selected in the Accounts Dropdown in Nav Bar
const button3 = document.getElementById('accountListItem');

button3.addEventListener('click', async _ => {
try{
    console.log('clicked');
}catch(err) {
    console.error(`Error: ${err}`);
  }

});

// Fetches compliance rules and the number of non-compliant resources into the Compliance Rules tables
async function loadRules(){
    
    try {     
        //633ad7aca938b45d958ae772
        await loadAccounts();
      const response = await fetch(`https://itp.vlee.me.uk/ruleOverview/${accountID}`, {
        headers: {"Content-type": "application/json"},
        method: 'get',
        credentials:"include"
      }).then(response => response.json())
      .then(json => {
          // Create a variable to store HTML
          let li = ``;
          // Loop through each data and add a table row
          json.forEach(user => {
            const name = user['rule']['name'];
            const length = user['non_compliant'].length;
            if (length >0) {
                li += `<tr>
                <td>${name}</td>
                <td >${length}</td>
                <td ><button type="button" class="btn btn-warning"><i class="fa-regular fa-pen-to-square"></i></button></td>
              </tr>`
            }
        });
      // Display result
      document.getElementById("rule-table").innerHTML = li;
  });
    } catch(err) {
      console.error(`Error: ${err}`);
    }
}

loadRules();