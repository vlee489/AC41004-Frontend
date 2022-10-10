// var subjectObject = {
//     "Unencrypted S3 bucket":{},
//     "S3 Bucket set to public":{},
//     "S3 Enumerate":{},

// }

// window.onload = function() {
//     var subjectSel = document.getElementById("subject");
//     var topicSel = document.getElementById("topic");
//     var chapterSel = document.getElementById("chapter");
//     for (var x in subjectObject) {
//         subjectSel.options[subjectSel.options.length] = new Option(x, x);
//     }
//     subjectSel.onchange = function() {
//         //empty Chapters- and Topics- dropdowns
//         chapterSel.length = 1;
//         topicSel.length = 1;
//         //display correct values
//         for (var y in subjectObject[this.value]) {
//             topicSel.options[topicSel.options.length] = new Option(y, y);
//         }
//     }
//     topicSel.onchange = function() {
//         //empty Chapters dropdown
//         chapterSel.length = 1;
//         //display correct values
//         var z = subjectObject[subjectSel.value][this.value];
//         for (var i = 0; i < z.length; i++) {
//             chapterSel.options[chapterSel.options.length] = new Option(z[i], z[i]);
//         }
//     }
// }

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

const rule = document.getElementById('subject');
const button = document.getElementById('submit-button');
const date = document.getElementById('review-date');
const justification = document.getElementById('justification');
const params = new URLSearchParams(window.location.search);
let resourceID = params.get("resourceID");


button.addEventListener('click', async _ => {
    let loginBody = {
        "resource_id": resourceID,
        "rule_id": rule.selected,
        "exception_value": "new exception",
        "justification": justification.value,
        "review_date": date.value
    }
    try {
        // const response = await fetch('https://itp.vlee.me.uk/exceptions/add', {
        //     headers: {"Content-type": "application/json"},
        //     method: 'post',
        //     body: JSON.stringify(loginBody)
        // });
        // console.log(response.status);
        console.log(JSON.stringify(loginBody));
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
