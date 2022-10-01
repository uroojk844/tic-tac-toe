var i = 0;
var boxes = new Set();
var box = document.querySelectorAll(".box");
var msg = document.getElementById("msg");
var combinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

var user1 = new Set();
var user2 = new Set();

var val = "X";

box.forEach((b, index) => {
    b.onclick = (e) => {
        if (user1.has(index) || user2.has(index)) return;
        if (i % 2 == 0) {
            val = "X";
            user1.add(index);
            msg.innerHTML = "Player 2 Turn";
            if (user1.size >= 3) check(user1);
        } else {
            val = "O";
            user2.add(index);
            msg.innerHTML = "Player 1 Turn";
            if (user2.size >= 3) check(user2);
        }
        b.innerHTML = val;
        i++;

        if ((user1.size + user2.size) == 9) {
            msg.innerHTML = "Match Draw!";
            setTimeout(() => {
                reset();
            }, 2000);
        }
    }
})

function check(user) {
    combinations.forEach(row => {
        row = new Set(row);
        res = [...user].filter(e => row.has(e + 1));
        if (res.length == 3) {
            res.forEach(b => {
                box[b].style.backgroundColor = "seagreen";
                box[b].style.color = "white";
            });
            msg.innerHTML = "Player " + val + " is winner! ";
            document.getElementById("reset").style.display = "block";
            setTimeout(() => {
                reset();
            }, 2000);
        }
    });
}

function reset() {
    user1.clear();
    user2.clear();
    box.forEach(b => {
        b.style.backgroundColor = "#0000"
        b.style.color = "#555";
        b.innerHTML = "";
        i = 0;
        msg.innerHTML = "Player 1 Turn";
    });
    document.getElementById("reset").style.display = "none";
}