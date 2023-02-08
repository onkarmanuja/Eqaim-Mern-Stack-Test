const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/steps", (req, res) => {
  const { num1, num2 } = req.body;
  const steps = stepAddition(num1, num2);
  res.set("Access-Control-Allow-Origin", "*");
  res.send({ result: steps });
});


function stepAddition(a, b) {

  let num1 = a.split('');
  let num2 = b.split('');
  let carry = 0;
  let sum = 0;
  let result = [];
  let carryString = '_'
  let sumString = ''

  for (let i = 0; i < Math.max(num1.length, num2.length); i++) {
    let x = parseInt(num1[num1.length - 1 - i]) || 0;
    let y = parseInt(num2[num2.length - 1 - i]) || 0;

    sum = x + y + carry;
    carry = Math.floor(sum / 10);
    sumString = i != Math.max(num1.length - 1, num2.length - 1) ? (sum%10).toString() + sumString : sum.toString() + sumString ;
    carryString = (i == Math.max(num1.length - 1, num2.length - 1)) ? carryString : carry.toString() + carryString;
    result.push({sumString : sumString,carryString : carryString});

  }

  for(let i=0;i<result.length;i++){
    console.log("step " + (i + 1) + "    "+  "CarryString :" + "  "  +  result[i].carryString + "    " + "SumString :" + "  " +result[i].sumString + " "  );
  }

  return result;
}


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});