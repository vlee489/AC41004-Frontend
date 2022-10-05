const button2 = document.getElementById('navbarDropdown');

button2.addEventListener('click', async _ => {
  try {     
    const response = await fetch('https://itp.vlee.me.uk/account/access', {
      headers: {"Content-type": "application/json"},
      method: 'get',
      credentials:"include"
    }).then(response => response.json())
    .then(json => {
  
        // Create a variable to store HTML
        let li = ``;
        
       
        // Loop through each data and add a table row
        json.forEach(user => {
            li += `<li><a class="dropdown-item" href="#">${user.name} (${user.reference})</a></li>`;
        });
  
    // Display result
    document.getElementById("accountList").innerHTML = li;
});
  } catch(err) {
    console.error(`Error: ${err}`);
  }
  
});