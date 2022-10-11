async function loadExceptionAudit(){
    
    try {     
    const response = await fetch(`https://itp.vlee.me.uk/exceptionAudit/exemption/633b06f8819db8bcd409e938`, {
        headers: {"Content-type": "application/json"},
        method: 'get',
        credentials:"include"
      }).then(response => response.json())
      .then(json => {
        
          // Create a variable to store HTML
          let li = ``;
          // Loop through each data and add a table row
          json.forEach(exception => {
          li += '';
        //     //add table html here
              const name = exception['id'];
              const user = exception['user']['email'];
              const date = exception['old_review_date'];
              const excUser = exception['user']['first_name'];
              const excDate = exception['new_suspended']
              const description = exception['rule']['description'];
              const reason = exception['new_justification'];

              if (name) {
                  li += `<tr>
                <td>${name}</td>
                <td>${user}</td>
                <td>${date}</td>
                <td>${excUser}</td>
                <td>${excDate}</td>
                <td>${description}</td>
                <td>${reason}</td>
                
                <td><i class="fa-solid fa-check"></i></td>
                
              </tr>`
              } 
            
         });
      // Display result
      document.getElementById("audit-exception-table").innerHTML = li;
    
      
  });
    } catch(err) {
      console.error(`Error: ${err}`);
    }
  }
  
  loadExceptionAudit();