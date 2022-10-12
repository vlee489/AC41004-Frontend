let defaultAccountID = '';
let fixedAddress = ' ';
let homeAddress = ' ';

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
        let accountLink = window.location.href;
 
        // Loop through each data and add a table row
        json.forEach(user => {

            let accountLink2 = ``;
            if (!accountLink.endsWith(user.id)){
                let accountLink2 = `${accountLink}?id=${user.id}`;
            }else{
                let accountLink2 = accountLink;
            }
            
            li += `<li><a class="dropdown-item" role="button" tabindex="0" href=${accountLink2} >${user.name} (${user.reference})</a></li>`;
            defaultAccountID = user.id;
        });
    
    // Display result
    document.getElementById("accountList").innerHTML = li;
    
});
  } catch(err) {
    console.error(`Error: ${err}`);
  }
  
};



// Fetches compliance rules and the number of non-compliant resources into the Compliance Rules tables
async function loadRules(filterType){
    
    try {     
     //633ad7aca938b45d958ae772
     await loadAccounts();
     const params = new URLSearchParams(window.location.search);
     let non_compliant_resources = [];
    let URLaccountID = params.get("id");
    if (URLaccountID == null){
        URLaccountID = defaultAccountID;
        let newURL = `${window.location.href}?id=${URLaccountID}`;
        window.location.replace(newURL);
    }
    const response = await fetch(`https://itp.vlee.me.uk/ruleOverview/${URLaccountID}`, {
        headers: {"Content-type": "application/json"},
        method: 'get',
        credentials:"include"
      }).then(response => response.json())
      .then(json => {
          // Create a variable to store HTML
          let li = ``;
          let li2 = ``;
          // Loop through each data and add a table row
          json.forEach(user => {
            const name = user['rule']['name'];
            const length = user['non_compliant'].length;
            const ruleID = user['rule']['id'];

            let accountLink = window.location.href;
            let accountLink2 = accountLink.replace("index.html", "ruleIndex.html");
            accountLink2 = `${accountLink2}&ruleName=${ruleID}`;
            

            //let accountLink2 = `http://127.0.0.1:5500/CRDRIndex.html?id=${URLaccountID}&ruleName=${name}`;
            // let accountLink2 = `${fixedAddress}CRDRIndex.html?id=${URLaccountID}&ruleName=${name}`;

            
if(filterType === 'nonValues')
{
    if (length > 0) {
    li += `<tr>
                <td>${name}</td>
                <td >${length}</td>
                <td><a href=${accountLink2} class="btn btn-warning" role="button" tabindex="0"><i class="fa-regular fa-pen-to-square"></i></a></td>
              </tr>`

    //for item in non compliant
    //resource id add to list
    user['non_compliant'].forEach(resourceid => {
        non_compliant_resources.push(resourceid);
    });

}} else
{
    li += `<tr>
                <td>${name}</td>
                <td >${length}</td>
                <td><a href=${accountLink2} class="btn btn-warning" role="button" tabindex="0"><i class="fa-regular fa-pen-to-square"></i></a></td>
              </tr>`

    //for item in non compliant
    //resource id add to list
    user['non_compliant'].forEach(resourceid => {
        non_compliant_resources.push(resourceid);
    });
}

        });
      // Display result
      
      document.getElementById("rule-table").innerHTML = li;
      
  });
    } catch(err) {
      console.error(`Error: ${err}`);
    }
}

loadRules('allRules');

function filterApply(filterType)
{
    loadRules(filterType);
}

async function loadOverdue(){
    
    try {     
     //633ad7aca938b45d958ae772
     await loadAccounts();
     const params = new URLSearchParams(window.location.search);
     let URLaccountID = params.get("id");
     if (URLaccountID == null){
        URLaccountID = defaultAccountID;
        let newURL = `${window.location.href}?id=${URLaccountID}`;
        window.location.replace(newURL);
    }
    const response = await fetch(`https://itp.vlee.me.uk/exceptions/account/${URLaccountID}/overdue`, {
        headers: {"Content-type": "application/json"},
        method: 'get',
        credentials:"include"
      })
      
      .then(response => response.json())
      .then(json => {
          // Create a variable to store HTML
          let li = ``;
          let counter = 0;
          // Loop through each data and add a table row
          json.forEach(user => {
            const name = user['rule']['name'];
            const type = user['rule']['resource_type']['name'];
            const review = user['review_date'];
            
                li += `<tr>
                <td>${name}</td>
                <td >${type}</td>
                <td >${review}</td>
                <td ><button type="button" class="btn btn-warning" tabindex="0"><i class="fa-regular fa-pen-to-square"></i></button></td>
              </tr>`
            counter++;
        });
      // Display result
      document.getElementById("overdue-table").innerHTML = li;
      document.getElementById("overdue-counter").innerHTML = counter;
  });
  //console.log(response);
    } catch(err) {
      console.error(`Error: ${err}`);
    }
}

loadOverdue();

async function loadUpcoming(){
    try {     
     //633ad7aca938b45d958ae772
     await loadAccounts();
     const params = new URLSearchParams(window.location.search);
     let URLaccountID = params.get("id");
     if (URLaccountID == null){
        URLaccountID = defaultAccountID;
        let newURL = `${window.location.href}?id=${URLaccountID}`;
        window.location.replace(newURL);
    }
    const response = await fetch(`https://itp.vlee.me.uk/exceptions/account/${URLaccountID}/upcoming?days=350`, {
        headers: {"Content-type": "application/json"},
        method: 'get',
        credentials:"include"
      })
      
      .then(response => response.json())
      .then(json => {
          // Create a variable to store HTML
          let li = ``;
          let counter = 0;
          // Loop through each data and add a table row
          json.forEach(user => {
            const name = user['rule']['name'];
            const type = user['rule']['resource_type']['name'];
            const review = user['review_date'];
            
                li += `<tr>
                <td>${name}</td>
                <td >${type}</td>
                <td >${review}</td>
                <td ><button type="button" class="btn btn-warning" tabindex="0"><i class="fa-regular fa-pen-to-square"></i></button></td>
              </tr>`
            counter++;
        });
      // Display result
      document.getElementById("upcoming-table").innerHTML = li;
      document.getElementById("upcoming-counter").innerHTML = counter;
  });
  //console.log(response);
    } catch(err) {
      console.error(`Error: ${err}`);
    }
}

loadUpcoming();

async function loadChartValues(){
    try {     
     //633ad7aca938b45d958ae772
    await loadAccounts();
    const params = new URLSearchParams(window.location.search);
    let URLaccountID = params.get("id");
    if (URLaccountID == null){
        URLaccountID = defaultAccountID;
        let newURL = `${window.location.href}?id=${URLaccountID}`;
        window.location.replace(newURL);
    }
    const response = await fetch(`https://itp.vlee.me.uk/accountOverview/${URLaccountID}`, {
        headers: {"Content-type": "application/json"},
        method: 'get',
        credentials:"include"
      })
      
      .then(response => response.json())
      .then(json => {
          // Create a variable to store HTML
          let li = ``;
          const non_compliant = json['non_compliant'];
          const compliant = json['compliant'];
          // Loop through each data and add a table row
          
      // Display result
        var xValues = ["Compliant", "Non-Compliant"];
        var yValues = [compliant, non_compliant];
        var barColors = [
          "#23C552",
          "#F84F31",
        ];
        new Chart("myChart", {
          type: "doughnut",
          data: {
            labels: xValues,
            datasets: [{
              backgroundColor: barColors,
              data: yValues
            }]
          }
        });

        Chart.defaults.global.defaultFontColor = "#fff";
  });
  //console.log(response);
    } catch(err) {
      console.error(`Error: ${err}`);
    }
}

loadChartValues();

async function logOut()
{
    const response = await fetch(`https://itp.vlee.me.uk/session/logout`, {
        headers: {"Content-type": "application/json"},
        method: 'get',
        credentials:"include"
    }).then(response => response.json())
    {
            window.localStorage.clear();
            window.location.replace("loginIndex.html");
    }
}
