const editButton = document.getElementById('submit-button');
const suspendButton = document.getElementById('suspend-button');
const reviewDate = document.getElementById('review-date');
const justification = document.getElementById('justification');

const permsPopup = document.getElementById('badPermsModal');  // For perms checking Modal

let exceptionValue = '';
let suspended = false;
let success = true;

loadExceptions();

editButton.addEventListener('click', async _ => {
    const date = new Date(reviewDate.value);
    const iso = date.toISOString();
    const params = new URLSearchParams(window.location.search);
    let URLexceptionID = params.get("exceptionID");


    // get values for suspended and exception_value
    

    let exceptionBody = {
        "exception_value": exceptionValue,
        "justification": justification.value,
        "review_date": iso,
        "suspended": suspended

    }

    
    try {
        const response = await fetch(`https://itp.vlee.me.uk/exceptions/${URLexceptionID}`, {
            headers: { "Content-type": "application/json" },
            method: 'PATCH',
            body: JSON.stringify(exceptionBody),
            credentials: "include"
        });
        
        
        if(response.status != 200){
            success = false;
            document.getElementById("resultModalLabel").innerHTML = "Failed to Update";
         }else{
            document.getElementById("resultModalLabel").innerHTML = "Successfully Edited";
         }
         
         //completedEdit();
        
    } catch (err) {
        console.error(`Error: ${err}`);
    }
});

suspendButton.addEventListener('click', async _ => {

});

async function loadExceptions() {
    try {
        const params = new URLSearchParams(window.location.search);
        let URLresourceID = params.get("resourceID");
        let URLexceptionID = params.get("exceptionID");

async function loadExceptions(){
    try {     
    const params = new URLSearchParams(window.location.search);
    let URLresourceID = params.get("resourceID");
    let URLexceptionID = params.get("exceptionID");
  
    //${URLresourceID}
    const response = await fetch(`https://itp.vlee.me.uk/exceptions/resource/${URLresourceID}`, {
        headers: {"Content-type": "application/json"},
        method: 'get',
        credentials:"include"
      }).then(response => response.json())
      .then(json => {
        let li = ``;
          // Loop through each data and add a table row
          json.forEach(exception => {
            
            const exceptionID = exception['id'];
           
            if (exceptionID == URLexceptionID){
                let exceptionReview = exception['review_date'];
                let justification = exception['justification'];
                let name = exception['exception_value'];
                suspended = exception['suspended'];

                if(suspended){
                    li += `<tr>
                    <td>${name}</td>
                    <td>${exceptionID}</td>
                    <td>${exceptionReview}</td>
                    <td><i class="fa-solid fa-check"></i></td>
                    <td>${justification}</td>
                    
                  </tr>`
                }else{
                    li += `<tr>
                    <td>${name}</td>
                    <td>${exceptionID}</td>
                    <td>${exceptionReview}</td>
                    <td><i class="fa-solid fa-xmark"></i></td>
                    <td>${justification}</td>
                    
                  </tr>`
                }
                
            }  
            document.getElementById("current-exception-table").innerHTML = li;
         
            if (suspended){
                document.getElementById("suspend-button").value = "Remove Suspension";
            }else{
                document.getElementById("suspend-button").value = "Suspend Exception";
            }

            
        });   
  });
    } catch(err) {
      console.error(`Error: ${err}`);
    }
}

suspendButton.addEventListener('click', async _ => {
    // const date = new Date(reviewDate.value);
    // const iso = date.toISOString();
    const params = new URLSearchParams(window.location.search);
    let URLexceptionID = params.get("exceptionID");
    let suspendedValue = true;
    let message = '';


    // get values for suspended and exception_value
    await loadExceptions();

    let exceptionBody = {
        "suspended": !suspended
    }
    

    
    try {
        const response = await fetch(`https://itp.vlee.me.uk/exceptions/${URLexceptionID}`, {
            headers: { "Content-type": "application/json" },
            method: 'PATCH',
            body: JSON.stringify(exceptionBody),
            credentials: "include"
        });

        if(document.getElementById("suspend-button").value == "Remove Suspension"){

        }

        if (suspended){
            document.getElementById("suspend-button").value = "Remove Suspension";
            message = "Suspension Removed";

        }else{
            document.getElementById("suspend-button").value = "Suspend Exception";
            message = "Exception Suspended";
        }
        
        
        if(response.status != 200){
           // resultModalLabel
           document.getElementById("resultModalLabel").innerHTML = "Failed to Update";
           success = false;
        }else{
            document.getElementById("resultModalLabel").innerHTML = message;
        }
        
    } catch (err) {
        console.error(`Error: ${err}`);
    }

});

async function loadExceptionAudit(){
    const params = new URLSearchParams(window.location.search);
    let URLexceptionID = params.get("exceptionID");

    try {     
    const response = await fetch(`https://itp.vlee.me.uk/exceptionAudit/exemption/${URLexceptionID}`, {
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

    

              const user = exception['user']['email'];
              const action = exception['action'];
              const old_justification = exception['old_justification'];
              const new_justification = exception['new_justification'];
              const old_review = exception['old_review'];
              const new_review = exception['new_review'];
              const old_suspended = exception['old_suspended'];
              const new_suspended = exception['new_suspended'];

                  li +=`<tr>
                <td>${user}</td>
                <td>${action}</td>
                <td>${old_justification}</td>
                <td>${new_justification}</td>
                <td>${old_review}</td>
                <td>${new_review}</td>
                <td>${old_suspended}</td>
                <td>${new_suspended}</td>
                
                
                
              </tr>`
               
            
         });
      // Display result
      document.getElementById("audit-exception-table").innerHTML = li;
    
      
  });
    } catch(err) {
      console.error(`Error: ${err}`);
    }
  }
  
  loadExceptionAudit();

function homePage(){
    const params = new URLSearchParams(window.location.search);
    let accountLink = window.location.href;
    accountLink = accountLink.replace("addException.html", "index.html");
    let URLresourceID = params.get("resourceID");
    URLresourceID = `&resourceID=${URLresourceID}`;
    accountLink = accountLink.replace(URLresourceID, "");
    window.location = accountLink;
};

  function completedEdit(){
    const params = new URLSearchParams(window.location.search);
    let accountLink = window.location.href;
    accountLink = accountLink.replace("editException.html", "CRDRIndex.html");
    let URLexceptionID = params.get("exceptionID");
    URLexceptionID = `&exceptionID=${URLexceptionID}`;
    accountLink = accountLink.replace(URLexceptionID, "");
    window.location = accountLink;
  }

  

// Permission Checking code 

permsPopup.addEventListener('hide.bs.modal', function(){
    window.location.replace("/index.html");
})

async function getPermissions() {
    /**
     * Get the permissions of the user
     */
    try {
        const response = await fetch('https://itp.vlee.me.uk/user/permissions', {
            method: 'get',
            credentials: "include"
        })
        if (response.ok) {
            const data = await response.json()
            return data['role']['level']
        }else if([401, 404].includes(response.status)){
            window.location.replace("/loginIndex.html");
          }
    } catch (err) {
        console.error(`Error: ${err}`)
    }
}

async function permissionRedirect(level = 0) {
    if (level < 1) {
        const permsPopupModal = new bootstrap.Modal(document.getElementById("badPermsModal"), {});
        permsPopupModal.show();
    }
}

(async () => {
    const permissionLevel = await getPermissions();
    permissionRedirect(permissionLevel)
})()
