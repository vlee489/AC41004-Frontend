async function loadRules(){
    
    try {     
     
     const params = new URLSearchParams(window.location.search);
      let URLresourceID = params.get("resourceID");

    //${URLresourceID}
    const response = await fetch(`https://itp.vlee.me.uk/rule/resource/${URLresourceID}`, {
        headers: {"Content-type": "application/json"},
        method: 'get',
        credentials:"include"
      }).then(response => response.json())
      .then(json => {
          // Create a variable to store HTML
          let li = ``;
          // Loop through each data and add a table row
          json.forEach(rule => {
            const name = rule['name'];
            const ruleID = rule['id'];
            const compliant = rule['compliant'];
            
            if (compliant) {
                li += `<tr>
                <td>${name}</td>
                <td><i class="fa-solid fa-check"></i></td>
                <td><button type="button" tabindex="0" class="btn btn-warning" disabled><i class="fa-solid fa-plus"></i></button></td>
                
              </tr>`
            } else{
                li += `<tr>
                <td>${name}</td>
                <td><i class="fa-solid fa-xmark"></i></td>
                <td><button type="button" tabindex="0" onclick="addException('${ruleID}')" class="btn btn-warning"><i class="fa-solid fa-plus"></i></button></td>
                
              </tr>`
            }

            //<td><a href=# class="btn btn-warning" role="button"><i class="fa-regular fa-pen-to-square"></i></a></td>
        });
      // Display result
      document.getElementById("crdr-rule-table").innerHTML = li;

      
  });
    } catch(err) {
      console.error(`Error: ${err}`);
    }
}

loadRules();

async function loadResourceName(){
    
  try {    
   const params = new URLSearchParams(window.location.search);
    let URLresourceID = params.get("resourceID");
    let resourceName = '';

  const response = await fetch(`https://itp.vlee.me.uk/resource/${URLresourceID}`, {
      headers: {"Content-type": "application/json"},
      method: 'get',
      credentials:"include"
    }).then(response => response.json())
    .then(json => {
        // Create a variable to store HTML
        resourceName = json['name'];
    // Display result
    document.getElementById("res-name").innerHTML = resourceName;

    
});
  } catch(err) {
    console.error(`Error: ${err}`);
  }
}

loadResourceName();

async function loadExceptions(){
    
  try {     

  const params = new URLSearchParams(window.location.search);
  let URLresourceID = params.get("resourceID");

  //${URLresourceID}
  const response = await fetch(`https://itp.vlee.me.uk/exceptions/resource/${URLresourceID}`, {
      headers: {"Content-type": "application/json"},
      method: 'get',
      credentials:"include"
    }).then(response => response.json())
    .then(json => {
        // Create a variable to store HTML
        let li = ``;
        // Loop through each data and add a table row
        json.forEach(exception => {
          const name = exception['exception_value'];
          const exceptionID = exception['id'];
          const date = exception['review_date'];
          const firstname = exception['last_updated_by']['first_name'];
          const surname = exception['last_updated_by']['last_name'];
          const suspended = exception['suspended'];
          
          if(suspended){
            li += `<tr>
            <td>${name}</td>
            <td>${firstname} ${surname}</td>
            <td>${date}</td>
            <td><i class="fa-solid fa-check"></i></td>
            <td><a class="btn btn-warning" onclick="editException('${exceptionID}')" tabindex="0" role="button"><i class="fa-regular fa-pen-to-square"></i></a></td>
            
          </tr>`
          }else{
            li += `<tr>
            <td>${name}</td>
            <td>${firstname} ${surname}</td>
            <td>${date}</td>
            <td><i class="fa-solid fa-xmark"></i></td>
            <td><a class="btn btn-warning" onclick="editException('${exceptionID}')" tabindex="0" role="button"><i class="fa-regular fa-pen-to-square"></i></a></td>
            
          </tr>`
          }
      });
    // Display result
    document.getElementById("crdr-exception-table").innerHTML = li;

    
});
  } catch(err) {
    console.error(`Error: ${err}`);
  }
}

loadExceptions();

async function loadComplianceAudit(){
    
  try {     
   
   const params = new URLSearchParams(window.location.search);
    let URLresourceID = params.get("resourceID");

  //${URLresourceID}
  const response = await fetch(`https://itp.vlee.me.uk/compliance/resource/${URLresourceID}`, {
      headers: {"Content-type": "application/json"},
      method: 'get',
      credentials:"include"
    }).then(response => response.json())
    .then(json => {
        // Create a variable to store HTML
        let li = ``;
        // Loop through each data and add a table row
        json.forEach(value => {
          const name = value['rule']['name'];
          const firstname = value['user']['first_name'];
          const surname = value['user']['last_name'];
          const action = value['action'];
          const actionDate = value['action_datetime'];
          
         
              li += `<tr>
              <td>${name}</td>
              <td>${action}</td>
              <td>${firstname} ${surname}</td>
              <td>${actionDate}</td>
              
            </tr>`
        
      });
    // Display result
    document.getElementById("compliance-audit-table").innerHTML = li;

    
});
  } catch(err) {
    console.error(`Error: ${err}`);
  }
}

loadComplianceAudit();

async function loadExceptionAudit(){
    
  try {     
   
   const params = new URLSearchParams(window.location.search);
    let URLresourceID = params.get("resourceID");

  //${URLresourceID}
  const response = await fetch(`https://itp.vlee.me.uk/compliance/resource/${URLresourceID}`, {
      headers: {"Content-type": "application/json"},
      method: 'get',
      credentials:"include"
    }).then(response => response.json())
    .then(json => {
        // Create a variable to store HTML
        let li = ``;
        // Loop through each data and add a table row
        json.forEach(value => {
          const name = value['rule']['name'];
          const firstname = value['user']['first_name'];
          const surname = value['user']['last_name'];
          const action = value['action'];
          const actionDate = value['action_datetime'];
          
         
              li += `<tr>
              <td>${name}</td>
              <td>${action}</td>
              <td>${firstname} ${surname}</td>
              <td>${actionDate}</td>
              
            </tr>`
        
      });
    // Display result
    document.getElementById("exception-audit-table").innerHTML = li;

    
});
  } catch(err) {
    console.error(`Error: ${err}`);
  }
}

loadExceptionAudit();


function homePage(){
  const params = new URLSearchParams(window.location.search);
  let accountLink = window.location.href;
  accountLink = accountLink.replace("CRDRIndex.html", "index.html");
  let URLresourceID = params.get("resourceID");
  URLresourceID = `&resourceID=${URLresourceID}`;
  accountLink = accountLink.replace(URLresourceID, "");
  window.location = accountLink;
}

function addException(ruleID){
  //const params = new URLSearchParams(window.location.search);
  let accountLink = window.location.href;
  accountLink = accountLink.replace("CRDRIndex.html", "addException.html");
  accountLink = `${accountLink}&ruleID=${ruleID}`;
  window.location = accountLink;
}

function editException(exceptionID){
  //const params = new URLSearchParams(window.location.search);
  let accountLink = window.location.href;
  accountLink = accountLink.replace("CRDRIndex.html", "editException.html");
  accountLink = `${accountLink}&exceptionID=${exceptionID}`;
  window.location = accountLink;
}