if (!("Notification" in window)) {
    alert("This browser is outdated, please update");
} else if (Notification.permission === "granted") {

} else if (Notification.permission !== "denied") {

    Notification.requestPermission().then((permission) => {

        if (permission === "granted") {
            //narazie nic bo nwm co zrobić
        }
    });
}

function hideshowBAR() {
    $('#navleft').toggle();
    $('#navright').toggle();
}