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
    } else if ([401, 404].includes(response.status)) {
      window.location.replace("/loginIndex.html");
    }
  } catch (err) {
    console.error(`Error: ${err}`)
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

async function loadRules(level = 0) {

  try {

    const params = new URLSearchParams(window.location.search);
    let URLresourceID = params.get("resourceID");

    //${URLresourceID}
    const response = await fetch(`https://itp.vlee.me.uk/rule/resource/${URLresourceID}`, {
      headers: { "Content-type": "application/json" },
      method: 'get',
      credentials: "include"
    }).then(response => response.json())
      .then(json => {
        // Create a variable to store HTML
        let li = ``;
        // Loop through each data and add a table row
        json.forEach(rule => {
          const name = rule['name'];
          const ruleID = rule['id'];
          const compliant = rule['compliant'];

          if (level > 0) {
            if (compliant) {
              li += `<tr>
                  <td>${name}</td>
                  <td><i class="fa-solid fa-check"></i></td>
                  <td><button type="button" tabindex="0" class="btn btn-warning" disabled><i class="fa-solid fa-plus"></i></button></td>
                  
                </tr>`
            } else {
              li += `<tr>
                  <td>${name}</td>
                  <td><i class="fa-solid fa-xmark"></i></td>
                  <td><button type="button" tabindex="0" onclick="addException('${ruleID}')" class="btn btn-warning"><i class="fa-solid fa-plus"></i></button></td>
                  
                </tr>`
            }
          } else {
            if (compliant) {
              li += `<tr>
                  <td>${name}</td>
                  <td><i class="fa-solid fa-check"></i></td>
                  <td>
                    <span class="css-tooltip" data-tooltip="Insufficient Perms">
                      <button type="button" tabindex="0" class="btn btn-warning" disabled><i class="fa-solid fa-plus"></i></button>
                    </span>
                  </td>
                </tr>`
            } else {
              li += `<tr>
                  <td>${name}</td>
                  <td><i class="fa-solid fa-xmark"></i></td>
                  <td>
                    <span class="css-tooltip" data-tooltip="Insufficient Perms">
                      <button type="button" tabindex="0" class="btn btn-warning" disabled><i class="fa-solid fa-plus"></i></button>
                    </span>
                  </td>
                </tr>`
            }
          }



          //<td><a href=# class="btn btn-warning" role="button"><i class="fa-regular fa-pen-to-square"></i></a></td>
        });
        // Display result
        document.getElementById("crdr-rule-table").innerHTML = li;


      });
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

async function loadResourceName() {

  try {
    const params = new URLSearchParams(window.location.search);
    let URLresourceID = params.get("resourceID");
    let resourceName = '';

    const response = await fetch(`https://itp.vlee.me.uk/resource/${URLresourceID}`, {
      headers: { "Content-type": "application/json" },
      method: 'get',
      credentials: "include"
    }).then(response => response.json())
      .then(json => {
        // Create a variable to store HTML
        resourceName = json['name'];
        // Display result
        document.getElementById("res-name").innerHTML = resourceName;


      });
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

async function loadExceptions(level = 0) {
  try {
    const params = new URLSearchParams(window.location.search);
    let URLresourceID = params.get("resourceID");

    //${URLresourceID}
    const response = await fetch(`https://itp.vlee.me.uk/exceptions/resource/${URLresourceID}`, {
      headers: { "Content-type": "application/json" },
      method: 'get',
      credentials: "include"
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

          if (level > 0) {
            if (suspended) {
              li += `<tr>
              <td>${name}</td>
              <td>${firstname} ${surname}</td>
              <td>${date}</td>
              <td><i class="fa-solid fa-check"></i></td>
              <td><a class="btn btn-warning" onclick="editException('${exceptionID}')" tabindex="0" role="button"><i class="fa-regular fa-pen-to-square"></i></a></td>
              
            </tr>`
            } else {
              li += `<tr>
              <td>${name}</td>
              <td>${firstname} ${surname}</td>
              <td>${date}</td>
              <td><i class="fa-solid fa-xmark"></i></td>
              <td><a class="btn btn-warning" onclick="editException('${exceptionID}')" tabindex="0" role="button"><i class="fa-regular fa-pen-to-square"></i></a></td>
              
            </tr>`
            }
          } else {
            if (suspended) {
              li += `<tr>
              <td>${name}</td>
              <td>${firstname} ${surname}</td>
              <td>${date}</td>
              <td><i class="fa-solid fa-check"></i></td>
              <td>
                <span class="css-tooltip" data-tooltip="Insufficient Perms">
                  <a class="btn btn-warning disabled" tabindex="0" role="button" aria-disabled="true"><i class="fa-regular fa-pen-to-square"></i></a>
                </span>
              </td>
            </tr>`
            } else {
              li += `<tr>
              <td>${name}</td>
              <td>${firstname} ${surname}</td>
              <td>${date}</td>
              <td><i class="fa-solid fa-xmark"></i></td>
              <td>
                <span class="css-tooltip" data-tooltip="Insufficient Perms">
                  <a class="btn btn-warning disabled" tabindex="0" role="button" aria-disabled="true"><i class="fa-regular fa-pen-to-square"></i></a>
                </span>
              </td>
            </tr>`
            }
          }
        });
        // Display result
        document.getElementById("crdr-exception-table").innerHTML = li;


      });
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

async function loadComplianceAudit() {

  try {

    const params = new URLSearchParams(window.location.search);
    let URLresourceID = params.get("resourceID");

    //${URLresourceID}
    const response = await fetch(`https://itp.vlee.me.uk/compliance/resource/${URLresourceID}`, {
      headers: { "Content-type": "application/json" },
      method: 'get',
      credentials: "include"
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
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

// async function loadExceptionAudit() {

//   try {

//     const params = new URLSearchParams(window.location.search);
//     let URLresourceID = params.get("resourceID");

//     //${URLresourceID}
//     const response = await fetch(`https://itp.vlee.me.uk/compliance/resource/${URLresourceID}`, {
//       headers: { "Content-type": "application/json" },
//       method: 'get',
//       credentials: "include"
//     }).then(response => response.json())
//       .then(json => {
//         // Create a variable to store HTML
//         let li = ``;
//         // Loop through each data and add a table row
//         json.forEach(value => {
//           const name = value['rule']['name'];
//           const firstname = value['user']['first_name'];
//           const surname = value['user']['last_name'];
//           const action = value['action'];
//           const actionDate = value['action_datetime'];


//           li += `<tr>
//               <td>${name}</td>
//               <td>${action}</td>
//               <td>${firstname} ${surname}</td>
//               <td>${actionDate}</td>
              
//             </tr>`

//         });
//         // Display result
//         document.getElementById("exception-audit-table").innerHTML = li;


//       });
//   } catch (err) {
//     console.error(`Error: ${err}`);
//   }
// }


function homePage(){
  window.location = getHomeURL();
}

function addException(ruleID) {
  //const params = new URLSearchParams(window.location.search);
  let accountLink = window.location.href;
  accountLink = accountLink.replace("CRDRIndex.html", "addException.html");
  accountLink = `${accountLink}&ruleID=${ruleID}`;
  window.location = accountLink;
}

function editException(exceptionID) {
  //const params = new URLSearchParams(window.location.search);
  let accountLink = window.location.href;
  accountLink = accountLink.replace("CRDRIndex.html", "editException.html");
  accountLink = `${accountLink}&exceptionID=${exceptionID}`;
  window.location = accountLink;
}


(async () => {
  const permissionLevel = await getPermissions();
  loadResourceName();
  loadRules(permissionLevel);
  loadExceptions(permissionLevel);
  loadComplianceAudit();
})()