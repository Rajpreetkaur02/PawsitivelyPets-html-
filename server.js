const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');
const stripe = require('stripe')('sk_test_51MUCJqSJ5OsYGHjp2fAng56vaIW9yN1aPTS2KejTC1SHrNNEjkBrfQg1ALAExattOTjANVmFOZaKYOj75sbRK9lu00PqeXqfoS');
const app = express();


let initial_path = path.join(__dirname,"public");


app.use(express.static(initial_path));
app.use(fileupload());

app.get('/',(req,res) => {
    res.sendFile(path.join(initial_path, "index.html"));
})

app.get('/editor',(req,res) => {
    res.sendFile(path.join(initial_path, "html/editor.html"))
})

//upload link
app.post('/upload', (req,res) => {
    let file = req.files.image;
    let date = new Date();
    //image name
    let imagename = date.getDate() + date.getTime() + file.name;
    //image upload path
    let path = 'public/uploads/' + imagename;

    //create upload
    file.mv(path,(err,result) => {
        if(err){
            throw err;
        }else{
            // our image upload path
            res.json(`uploads/${imagename}`)
        }
    })
})

app.get("/:blog", (req, res) => {
    res.sendFile(path.join(initial_path, "html/blog.html"));
})

app.listen("3000",() => {
    console.log('listening.....');
})

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  const finalprice = parseInt(items.price)
  return finalprice * 100;
};

app.post("/create-payment-intent", async (req, res) => {
  const items = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});