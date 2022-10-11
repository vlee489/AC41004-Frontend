const button = document.getElementById('submit-button');
const reviewDate = document.getElementById('review-date');
const justification = document.getElementById('justification');
const permsPopup = document.getElementById('badPermsModal');  // For perms checking Modal


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
        
        if(response.status == 200){
           // validate success
        }else{
            // failed to add exception
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
