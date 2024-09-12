        //dodawanie znajomych
        function addForm() {
            document.getElementById("addForm").style.display = "block";
        }
        document.getElementById("addForm").onsubmit = function () {
            return false
        }
        function closeaddForm() {
            document.getElementById("addForm").style.display = "none";
        }
        //rejestrowanie
        function openForm() {
            document.getElementById("myForm").style.display = "block";
        }
        document.getElementById("myForm").onsubmit = function () {
            return false
        }
        function closeForm() {
            document.getElementById("myForm").style.display = "none";
        }