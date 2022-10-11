const button = document.getElementById('submit-button');
const reviewDate = document.getElementById('review-date');
const justification = document.getElementById('justification');


button.addEventListener('click', async _ => {
    const params = new URLSearchParams(window.location.search);
    let resourceID = params.get("resourceID");
    let ruleID = params.get("ruleID");
    const date = new Date(reviewDate.value);
    const iso = date.toISOString();

    let exceptionBody = {
        "resource_id": resourceID,
        "rule_id": ruleID,
        "justification": justification.value,
        "review_date": iso
    }
    try {
        const response = await fetch('https://itp.vlee.me.uk/exceptions/', {
            headers: {"Content-type": "application/json"},
            method: 'post',
            body: JSON.stringify(exceptionBody),
            credentials:"include"
        });
        
        if(response.status != 200){
            // resultModalLabel
            document.getElementById("resultModalLabel").innerHTML = "Failed to Create";
            success = false;
         }else{
             document.getElementById("resultModalLabel").innerHTML = "Exception Created";
         }
        
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
    accountLink = accountLink.replace("addException.html", "CRDRIndex.html");
    let URLexceptionID = params.get("exceptionID");
    URLexceptionID = `&exceptionID=${URLexceptionID}`;
    accountLink = accountLink.replace(URLexceptionID, "");
    window.location = accountLink;
  }
  