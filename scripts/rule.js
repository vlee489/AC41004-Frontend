
// Fetches compliance rules and the number of non-compliant resources into the Compliance Rules tables
async function loadRules(){
    try { 
     const params = new URLSearchParams(window.location.search);
     let non_compliant_resources = [];
     let URLaccountID = params.get("id");
     let ruleID = params.get("rule");

     // ruleIndex.html?id=633ad7aca938b45d958ae772&rule=name
    
    
    const response = await fetch(`https://itp.vlee.me.uk/ruleOverview/${URLaccountID}`, {
        headers: {"Content-type": "application/json"},
        method: 'get',
        credentials:"include"
      }).then(response => response.json())
      .then(json => {
          // Loop through each data and add a table row
          json.forEach(user => {
            
            const length = user['non_compliant'].length;
            
            if (length >0) {
                user['non_compliant'].forEach(resourceid => {
                non_compliant_resources.push(resourceid);
              });
            }
        });
      // Display result
    
    document.getElementById("rule-name").innerHTML = ruleID;
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
            const type = resource['resource_type']['name'];
            

            //let accountLink2 = `http://127.0.0.1:5500/CRDRIndex.html?ruleid=${ruleID}`;
            
            if (non_compliant_resources.includes(resourceID)){
                li += `<tr>
                <td>${name}</td>
                <td >${type}</td>
                <td><a href=# class="btn btn-warning" role="button"><i class="fa-regular fa-pen-to-square"></i></a></td>
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