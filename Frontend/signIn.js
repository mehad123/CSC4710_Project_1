const usernameInput = document.querySelector('#username-input');
const passwordInput = document.querySelector('#password-input');
const submitBtn = document.querySelector('#submit-btn');
const backBtn = document.querySelector('#back-btn');
const errorMsg = document.querySelector('#error-msg'); 

submitBtn.onclick = function() {
    console.log("submit clicked");
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (!username || !password) {
        errorMsg.textContent = "Please enter both username and password.";
        errorMsg.style.color = "red";
        return;
    }

    fetch('http://localhost:5050/users/login', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.success) {
            console.log("Login successful!");
            alert("Login successful!");
            window.location.href = "dashboard.html";
        } else {
            console.error("Sign-in failed:", data.message || data);
            alert("Invalid username or password!");
            errorMsg.textContent = "Invalid username or password.";
            errorMsg.style.color = "red";
        }
    })
    .catch(err => {
        console.error("Error during login:", err);
        errorMsg.textContent = "Server error. Please try again later.";
        errorMsg.style.color = "red";
    });
};

// when the back button is clicked
backBtn.onclick = function() {
    console.log("back clicked");
    window.location.href = "index.html";
};
