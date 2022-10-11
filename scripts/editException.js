const editButton = document.getElementById('submit-button');
const suspendButton = document.getElementById('suspend-button');
const reviewDate = document.getElementById('review-date');
const justification = document.getElementById('justification');

const permsPopup = document.getElementById('badPermsModal');  // For perms checking Modal

let exceptionValue = '';
let suspended = false;

editButton.addEventListener('click', async _ => {
    const date = new Date(reviewDate.value);
    const iso = date.toISOString();
    const params = new URLSearchParams(window.location.search);
    let URLexceptionID = params.get("exceptionID");


    // get values for suspended and exception_value
    await loadExceptions();

    let exceptionBody = {
        "exception_value": exceptionValue,
        "justification": justification.value,
        "review_date": iso,
        "suspended": suspended

    }

    console.log(JSON.stringify(exceptionBody));
    try {
        const response = await fetch(`https://itp.vlee.me.uk/exceptions/${URLexceptionID}`, {
            headers: { "Content-type": "application/json" },
            method: 'PATCH',
            body: JSON.stringify(exceptionBody),
            credentials: "include"
        });

        if (response.status == 200) {
            // validate success
            console.log('success');
        } else {
            // failed to add exception
        }

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

        //${URLresourceID}
        const response = await fetch(`https://itp.vlee.me.uk/exceptions/resource/${URLresourceID}`, {
            headers: { "Content-type": "application/json" },
            method: 'get',
            credentials: "include"
        }).then(response => response.json())
            .then(json => {
                // Loop through each data and add a table row
                json.forEach(exception => {

                    const exceptionID = exception['id'];

                    if (exceptionID == URLexceptionID) {
                        exceptionValue = exception['exception_value'];
                        suspended = exception['suspended'];
                    }
                });
            });
    } catch (err) {
        console.error(`Error: ${err}`);
    }
}

suspendButton.addEventListener('click', async _ => {
    // const date = new Date(reviewDate.value);
    // const iso = date.toISOString();
    const params = new URLSearchParams(window.location.search);
    let URLexceptionID = params.get("exceptionID");


    // get values for suspended and exception_value
    await loadExceptions();

    let exceptionBody = {

        "suspended": true

    }

    console.log(JSON.stringify(exceptionBody));
    try {
        const response = await fetch(`https://itp.vlee.me.uk/exceptions/${URLexceptionID}`, {
            headers: { "Content-type": "application/json" },
            method: 'PATCH',
            body: JSON.stringify(exceptionBody),
            credentials: "include"
        });

        document.getElementById("suspend-button").value = "Remove Suspension";

        if (response.status == 200) {
            // validate success
            console.log('success');
        } else {
            // failed to add exception
        }

    } catch (err) {
        console.error(`Error: ${err}`);
    }

});


function homePage() {
    const params = new URLSearchParams(window.location.search);
    let accountLink = window.location.href;
    accountLink = accountLink.replace("addException.html", "index.html");
    let URLresourceID = params.get("resourceID");
    URLresourceID = `&resourceID=${URLresourceID}`;
    accountLink = accountLink.replace(URLresourceID, "");
    window.location = accountLink;
};

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
