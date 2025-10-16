// input field for sign-in page
const usernameInput = document.querySelector('#username-input');
const passwordInput = document.querySelector('#password-input');
const submitBtn = document.querySelector('#submit-btn');
const backBtn = document.querySelector('#back-btn');
// when the submit button is clicked
submitBtn.onclick = function(){
    debug("submit clicked");
    const username = usernameInput.value;
    const password = passwordInput.value;
    fetch('http://localhost:5050/sign-in',
            {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(
                    {
                        username: username,
                        password: password
                    }
                )
            }
    )
    .then(response => response.json())
    .then(data => {
        if(data.success){
            window.location.href = "index.html";
        }
        else 
           debug("sign-in failed");
    })
}
// when the back button is clicked
backBtn.onclick = function(){
    window.location.href = "index.html";
}