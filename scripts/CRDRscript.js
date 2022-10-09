async function loadRules(){
    
    try {     
     //633ad7aca938b45d958ae772

     // id=633ad7aca938b45d958ae772& resourceID=633afdf0996f8335ccc1b555

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
            const type = rule['resource_type']['name'];
            const compliant = rule['compliant'];
            
            if (compliant) {
                li += `<tr>
                <td>${name}</td>
                <td><i class="fa-solid fa-check"></i></td>
                
              </tr>`
            } else{
                li += `<tr>
                <td>${name}</td>
                <td><i class="fa-solid fa-xmark"></i></td>
                
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
   //633ad7aca938b45d958ae772

   // id=633ad7aca938b45d958ae772& resourceID=633afdf0996f8335ccc1b555

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
          const date = exception['review_date'];
          const firstname = exception['last_updated_by']['first_name'];
          const surname = exception['last_updated_by']['last_name'];
          const accountLink2 = '#';
          
              li += `<tr>
              <td>${name}</td>
              <td>${firstname} ${surname}</td>
              <td>${date}</td>
              <td><a href=${accountLink2} class="btn btn-warning" role="button"><i class="fa-regular fa-pen-to-square"></i></a></td>
              
            </tr>`
          

          
      });
    // Display result
    document.getElementById("crdr-exception-table").innerHTML = li;

    
});
  } catch(err) {
    console.error(`Error: ${err}`);
  }
}

loadExceptions();

function homePage(){
  const params = new URLSearchParams(window.location.search);
  let accountLink = window.location.href;
  accountLink = accountLink.replace("CRDRIndex.html", "index.html");
  let URLresourceID = params.get("resourceID");
  URLresourceID = `&resourceID=${URLresourceID}`;
  accountLink = accountLink.replace(URLresourceID, "");
  window.location = accountLink;
}