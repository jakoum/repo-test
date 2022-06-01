
const express =require('express');

const puppeteer = require("puppeteer")
const app=express();
const mongoose=require('mongoose');
const cors=require('cors')

// app.use(cors);
app.use(express.json())
const Item=require('./models/item')
//db config
const db=require('./key').mongoURI;
//connect to mongodb
mongoose.connect(db).then(()=>console.log('mongodb connected....'))

app.post('/items',async(req,res)=>{
    const items=await getItems()
      res.send(items)

})
const port=5000;
 app.listen(port,()=>console.log(`server started on port ${port}`));
 async function getItems(){
    //   let array=[]
    // Item.find().sort({date:-1}).then((items)=>array.push(items))
    // return array
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://coinmarketcap.com/")
      const names = await page.evaluate(() => {
          let a=[]
          var rows =document.getElementsByTagName("tbody")[0].rows;
          for(var i=0;i<10;i++){
          var td = rows[i].getElementsByTagName("td")[2].textContent;
         var price=rows[i].getElementsByTagName("td")[3].textContent
         var variation=rows[i].getElementsByTagName("td")[4].textContent
    //      const newItem=new Item({
    //       name:td,
    //       price:price,
    //       variation:variation
    //   });
    //   newItem.save().then((item)=>res.json(item))
         a.push({
          name:td,
          price:price,
          variation:variation
      })
          }
          return a
      })
      page.close()
      console.log(names)
      return names
  }



  
 