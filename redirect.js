// redirect.js

function redirectToLoginPage(userId, privateKey) {

    const newWebsiteUrl = 'http://localhost:8080/index.html'; 


    const encodedUserId = encodeURIComponent(userId);
    const encodedPrivateKey = encodeURIComponent(privateKey);


    const loginUrl = `${newWebsiteUrl}?userId=${encodedUserId}&privateKey=${encodedPrivateKey}`;


    window.location.href = loginUrl;
}
