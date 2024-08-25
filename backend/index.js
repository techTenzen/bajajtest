const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors())

app.post("/bfhl", (req, res) => {
    let { data } = req.body;
    

    if (!data) {
        return res.status(400).json({
            is_success: false,
            message: "Invalid request format."
        });
    }

    let numbers = [];
    let alphabets = [];
    let highestLowercaseAlphabet = null;

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string') {
            alphabets.push(item);
            if (item === item.toLowerCase()) {
                if (!highestLowercaseAlphabet || item > highestLowercaseAlphabet) {
                    highestLowercaseAlphabet = item;
                }
            }
        }
    });

    res.json({
        is_success: true,
        user_id: "RAJESH",
        email: "p.rajeshkumar2603@gmail.com",
        roll_number: "21BCE7128",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    });
});

app.listen("8080", () => {
    console.log(`Server is running on port 8080`);
});