// functions2.js

const socket = io('wss://polite-befitting-satellite.glitch.me/');
let peerConnection;
let dataChannel;
let localUserId;
let privateKey;

function generateId() {
    document.getElementById("genBTN").style.display = "none";
    localUserId = Math.random().toString(36).substring(2, 10);
    privateKey = Math.random().toString(36).substring(2, 10);
    document.getElementById('userIdInput').value = localUserId;
    document.getElementById('privateKeyInput').value = privateKey;
    socket.emit('register', localUserId, privateKey);
    sessionStorage.setItem('localUserId', localUserId);
    sessionStorage.setItem('privateKey', privateKey);
}
if (sessionStorage.getItem('localUserId') != null) {
    localUserId = sessionStorage.getItem('localUserId');
    privateKey = sessionStorage.getItem('privateKey');
    socket.emit('register', localUserId, privateKey);
    document.getElementById('userIdInput').value = localUserId;
    document.getElementById('privateKeyInput').value = privateKey;
} else {
    generateId();
}
displayFriend(localUserId, "You");
console.log(sessionStorage.getItem('localUserId'));
console.log(sessionStorage.getItem('privateKey'));


socket.on('receiveMessage', (data) => {
    console.log("Received message data:", data); // Log incoming data for debugging

    const message = data.message;   // Extract the message
    const senderId = data.senderId; // Extract the sender ID
    const metadata = data.metadata || ''; // Extract metadata, or empty if not present

    // Check if the message is marked as "old"
    const isOldMessage = metadata === "old"; 

    if (message && senderId) {
        // Pass the message and metadata to the displayMessage function
        displayMessage(message, senderId === localUserId, isOldMessage);
    } else {
        console.error("Invalid message structure received:", data); // Log error if structure is wrong
    }
});



function loginFUN() {
    localUserId = document.getElementById('userIdInputLOG').value;
    privateKey = document.getElementById('privateKeyInputLOG').value;
    socket.emit('register', localUserId, privateKey);
    sessionStorage.setItem('localUserId', localUserId);
    sessionStorage.setItem('privateKey', privateKey);
    displayFriend(localUserId, "You");

    // Redirect to the new website with the login details
    if (typeof redirectToLoginPage === 'function') {
        redirectToLoginPage(localUserId, privateKey);
    } else {
        console.error('redirectToLoginPage function is not defined');
    }
}

function sendMessage() {
    const targetUserId = document.getElementById('targetUserIdInput').value;
    const messageText = document.getElementById('messageInput').value;

    const encryptedMessage = messageText;

    const data = {
        targetUserId: localUserId,
        message: localUserId + ": " + encryptedMessage,
        senderId: localUserId
    };
    socket.emit('sendMessage', targetUserId, data);
 //   displayMessage(messageText, true);
    document.getElementById('messageInput').value = '';
}

// Client-side: Modify displayMessage function to handle old messages

function displayMessage(message, isOwnMessage, isOldMessage = false) {
    if (!message) {
        console.error("Message is undefined"); // Handle undefined message error
        return;
    }

    const messagesContainer = document.getElementById('messages');
    const newMessage = document.createElement('div');

    // Apply different class for old messages
    newMessage.className = isOldMessage ? 'messageOLD' : (isOwnMessage ? 'messageOWN' : 'message');

    newMessage.innerHTML = message;

    // Only show notifications for new messages that are not your own
    if (!isOldMessage && !isOwnMessage) {
        const notification = new Notification(message);
    }

    // Insert the new message into the container
    messagesContainer.insertBefore(newMessage, messagesContainer.firstChild);
}



let FriendId;
let FriendIDok;
let friendName;
function getFriendID() {
    friendNameVL = document.getElementById('friendNameInput').value;
    FriendIDok = document.getElementById('friendIdInput').value;
    const friendID = FriendIDok;
    const friendName = friendNameVL;
    displayFriend(friendID, friendName);
}

function displayFriend(friendID, friendName) {
    const FriendsContainer = document.getElementById('friendLIST');
    const newFriend = document.createElement('div');
    newFriend.onclick = SETname(friendID);
    newFriend.className = 'friendPosition';
    const newFriendIMG = document.createElement('img');
    newFriendIMG.src = "https://cdn.glitch.global/1006389e-fda7-4076-92d6-7bfd6ca0e4b3/icons8-user-50.png?v=1725373492864";
    newFriend.appendChild(newFriendIMG);
    const newFriendH6 = document.createElement('h6');
    newFriendH6.innerHTML = friendID;
    newFriendH6.tagName = friendID;
    newFriendH6.id = "FRIENDIDS";
    newFriend.appendChild(newFriendH6);
    const newFriendNameH6 = document.createElement('h6');
    newFriendNameH6.innerHTML = friendName;
    newFriend.appendChild(newFriendNameH6);
    FriendsContainer.insertBefore(newFriend, FriendsContainer.firstChild);
}

const FRIENDIDS = "FRIENDIDS";

$(document).on('click', function (event) {
    if ($(event.target).is('h6')) {
        const clickedElement = $(event.target);
        const elementID = clickedElement.attr('id');
        if (elementID === FRIENDIDS) {
            SETname(clickedElement.text());
        }
    }
});

function SETname(friendIDFromH6) {
    const LOGININPUT = document.getElementById('targetUserIdInput');
    LOGININPUT.value = friendIDFromH6;
}
