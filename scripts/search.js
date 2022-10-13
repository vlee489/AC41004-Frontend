//https://itp.vlee.me.uk/search/account/633ad7aca938b45d958ae772/Martyn


async function getPermissions() {
    /**
     * Get the permissions of the user
     */
    try {
      const response = await fetch('https://itp.vlee.me.uk/user/permissions', {
        method: 'get',
        credentials: "include"
      })
      if ([401, 404].includes(response.status)) {
        window.location.replace("/loginIndex.html");
      }
    } catch (err) {
      console.error(`Error: ${err}`)
    }
  }

  function searchResources(){
    try{
      let search = document.getElementById('search-bar').value;
      updateUrlPram('query', search);
    } catch (err) {
      console.error(`Error: ${err}`)
    }
    
  
  }
  async function loadRules(){
    try { 
     const params = new URLSearchParams(window.location.search);
     let URLaccountID = params.get("id");
     let query = params.get("query");
     let result_count=0;
     

    const response = await fetch(`https://itp.vlee.me.uk/search/account/${URLaccountID}/${query}`, {
        headers: {"Content-type": "application/json"},
        method: 'get',
        credentials:"include"
      }).then(response => response.json())
      .then(json => {
        let li = ``;
          // Loop through each data and add a table row
          json.forEach(result => {
            
            const resourceID = result['id'];
            const name = result['name'];
            const score = Math.round(result['score']);
            result_count ++;

            let accountLink = getNewUrl("CRDRIndex.html", "resourceID", resourceID);

            li += `<tr class="item">
                <td>${score}</td>
                <td>${name}</td>
                <td>${resourceID}</td>
                <td><a href=${accountLink} class="btn btn-warning" tabindex="0" role="button"><i class="fa-regular fa-pen-to-square"></i></a></td>
              </tr>`
          
        });
      // Display result
    
    document.getElementById("result-table").innerHTML = li;
    document.getElementById("result-counter").innerHTML = result_count;

  });
    } catch(err) {
      console.error(`Error: ${err}`);
    }
}

  async function logOut()
  {
    const response = await fetch(`https://itp.vlee.me.uk/session/logout`, {
      headers: {"Content-type": "application/json"},
      method: 'get',
      credentials:"include"
    }).then(response => response.json())
    {
      window.localStorage.clear();
      window.location.reload(true);
      window.location.replace("loginIndex.html");
    }
  }


function homePage(){
    window.location = getHomeURL();
  }
  
  (async () => {
    await getPermissions();
    loadRules();
  })()