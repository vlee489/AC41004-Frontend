async function loadRules(){
    
    try {     
     //633ad7aca938b45d958ae772

     const params = new URLSearchParams(window.location.search);
        let URLresourceID = params.get("resourceID");
    //${URLresourceID}
    const response = await fetch(`https://itp.vlee.me.uk/rule/resource/633afdf0996f8335ccc1b55e`, {
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
                <td>${type}</td>
                <td><i class="fa-solid fa-check"></i></td>
                
              </tr>`
            } else{
                li += `<tr>
                <td>${name}</td>
                <td>${type}</td>
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