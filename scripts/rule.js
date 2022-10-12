async function getPermissions() {
  /**
   * Get the permissions of the user
   */
  try {
    const response = await fetch('https://itp.vlee.me.uk/user/permissions', {
      method: 'get',
      credentials: "include"
    })
    if ([401, 404].includes(response.status)) {
      window.location.replace("/loginIndex.html");
    }
  } catch (err) {
    console.error(`Error: ${err}`)
  }
}

async function logOut()
{
  const response = await fetch(`https://itp.vlee.me.uk/session/logout`, {
    headers: {"Content-type": "application/json"},
    method: 'get',
    credentials:"include"
  }).then(response => response.json())
  {
    window.localStorage.clear();
    window.location.reload(true);
    window.location.replace("loginIndex.html");
  }
}

// Fetches compliance rules and the number of non-compliant resources into the Compliance Rules tables
async function loadRules(){
    try { 
     const params = new URLSearchParams(window.location.search);
     let non_compliant_resources = [];
     let URLaccountID = params.get("id");
     let ruleIDURL = params.get("ruleName");
     let ruleName = '';

    const response = await fetch(`https://itp.vlee.me.uk/ruleOverview/${URLaccountID}`, {
        headers: {"Content-type": "application/json"},
        method: 'get',
        credentials:"include"
      }).then(response => response.json())
      .then(json => {
          // Loop through each data and add a table row
          json.forEach(user => {
            
            const length = user['non_compliant'].length;
            const ruleID = user['rule']['id'];
            

            
            if (length >0 && ruleID == ruleIDURL ) {
                ruleName = user['rule']['name'];
                user['non_compliant'].forEach(resourceid => {
                non_compliant_resources.push(resourceid);
              });
            }

            

        });
      // Display result
    
    document.getElementById("rule-name").innerHTML = ruleName;
    loadResources(non_compliant_resources);

  });
    } catch(err) {
      console.error(`Error: ${err}`);
    }
}



async function loadResources(non_compliant_resources){
    
    try {   
    const params = new URLSearchParams(window.location.search);
    let URLaccountID = params.get("id");
    let ruleID = params.get("ruleName");
   

    const response = await fetch(`https://itp.vlee.me.uk/resource/account/${URLaccountID}`, {
        headers: {"Content-type": "application/json"},
        method: 'get',
        credentials:"include"
      }).then(response => response.json())
      .then(json => {
          // Create a variable to store HTML
          let li = ``;
          
          // Loop through each data and add a table row
          json.forEach(resource => {
            const name = resource['name'];
            const resourceID = resource['id'];
            

            let accountLink = getNewUrl("CRDRIndex.html", "resourceID", resourceID);
           
            if (non_compliant_resources.includes(resourceID)){
                li += `<tr>
                <td>${name}</td>
                <td><a href=${accountLink} class="btn btn-warning" tabindex="0" role="button"><i class="fa-regular fa-pen-to-square"></i></a></td>
              </tr>`
            }
              
            
        });
      // Display result
      
      document.getElementById("rule-table-2").innerHTML = li;
      
  });
    } catch(err) {
      console.error(`Error: ${err}`);
    }
}


function homePage(){
  window.location = getHomeURL();
}

(async () => {
  await getPermissions();
  loadRules();
})()