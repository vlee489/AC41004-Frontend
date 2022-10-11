const editButton = document.getElementById('submit-button');
const suspendButton = document.getElementById('suspend-button');
const reviewDate = document.getElementById('review-date');
const justification = document.getElementById('justification');

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
            headers: {"Content-type": "application/json"},
            method: 'PATCH',
            body: JSON.stringify(exceptionBody),
            credentials:"include"
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
          // Loop through each data and add a table row
          json.forEach(exception => {
            
            const exceptionID = exception['id'];
           
            if (exceptionID == URLexceptionID){
                exceptionValue = exception['exception_value'];
                suspended = exception['suspended'];
            }  

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
            headers: {"Content-type": "application/json"},
            method: 'PATCH',
            body: JSON.stringify(exceptionBody),
            credentials:"include"
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

       //completedEdit();
        
    } catch (err) {
        console.error(`Error: ${err}`);
    }

});

function homePage(){
    const params = new URLSearchParams(window.location.search);
    let accountLink = window.location.href;
    accountLink = accountLink.replace("addException.html", "index.html");
    let URLresourceID = params.get("resourceID");
    URLresourceID = `&resourceID=${URLresourceID}`;
    accountLink = accountLink.replace(URLresourceID, "");
    window.location = accountLink;
  }

  function completedEdit(){
    const params = new URLSearchParams(window.location.search);
    let accountLink = window.location.href;
    accountLink = accountLink.replace("editException.html", "CRDRIndex.html");
    let URLexceptionID = params.get("exceptionID");
    URLexceptionID = `&exceptionID=${URLexceptionID}`;
    accountLink = accountLink.replace(URLexceptionID, "");
    window.location = accountLink;
  }

  
