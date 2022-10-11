const button = document.getElementById('post-btn');
const email = document.getElementById('email');
const password = document.getElementById('password');
button.addEventListener('click', async _ => {
    let loginBody = {
        "email": email.value,
        "password": password.value,
    }
    try {
        const response = await fetch('https://itp.vlee.me.uk/session/login', {
            headers: {"Content-type": "application/json"},
            method: 'post',
            credentials:"include",
            body: JSON.stringify(loginBody)
        });
        //check if response is ~200
        if (response.ok) {
            window.location.replace("index.html");
        } else {
            alert("Please make sure your username and password is entered correctly.");
            return;
        }
        console.log('Completed!', response.status);
    } catch (err) {
        console.error(`Error: ${err}`);
    }
});


