
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
            //const type = resource['resource_type']['name'];
            

            let accountLink = window.location.href;
            let accountLink2 = accountLink.replace("ruleIndex.html", "CRDRIndex.html");
            let idstring = `&ruleName=${ruleID}`;
            accountLink2 = accountLink2.replace(idstring , "");
            accountLink2 = `${accountLink2}&resourceID=${resourceID}`;
           
            

            
            if (non_compliant_resources.includes(resourceID)){
                li += `<tr>
                <td>${name}</td>
                <td><a href=${accountLink2} class="btn btn-warning" tabindex="0" role="button"><i class="fa-regular fa-pen-to-square"></i></a></td>
              </tr>`
            }
              //<td><a href=${accountLink2} class="btn btn-warning" role="button"><i class="fa-regular fa-pen-to-square"></i></a></td>
              
            
        });
      // Display result
      
      document.getElementById("rule-table-2").innerHTML = li;
      
  });
    } catch(err) {
      console.error(`Error: ${err}`);
    }
}

loadRules();


function homePage(){
  const params = new URLSearchParams(window.location.search);
  let accountLink = window.location.href;
  accountLink = accountLink.replace("ruleIndex.html", "index.html");
  let URLresourceID = params.get("ruleName");
  URLresourceID = `&ruleName=${URLresourceID}`;
  accountLink = accountLink.replace(URLresourceID, "");
  window.location = accountLink;
}
