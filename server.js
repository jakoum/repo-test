const puppeteer = require("puppeteer")
const express =require('express');
const mongoose=require('mongoose');
const cors=require('cors')
const app=express();
app.use(cors());
app.use(express.json())
const Item=require('./models/item');
const item = require("./models/item");
//db config
const db=require('./key').mongoURI;
//connect to mongodb
mongoose.connect(db).then(()=>console.log('mongodb connected....'))
app.get('/dbItems',async(req,res)=>{
    const data=await Item.find().sort({date:-1}).then((items)=>{res.send(items)})
})
app.post('/singleItem',(req,res)=>{
  Item.find({name:req.body.name}).sort({date:-1}).then((item)=>{
    res.send(item)
  })
})
app.get('/webitems',async(req,res)=>{
    
      const items=await getItems()
            res.send(items)
    // for(i=0;i<20;i++){
        // const newItem=new Item({
            
        //     name:items[i].name,
        //     price:[items[i].price],
        //     variation:items[i].variation
        // });
        // newItem.save().then((item)=>console.log(item))
      //   let item=await Item.findOne({name:items[i].name})
      //   console.log(item)
      //   let a=item.price
      //   console.log(a)
      //   a.push(items[i].price)
      //   await Item.findOneAndUpdate({name:items[i].name},{price:a},{
      //   returnOriginal: false
      // })

       
// }
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
          for(var i=0;i<20;i++){
          var td = rows[i].getElementsByTagName("td")[2].textContent;
         var price=rows[i].getElementsByTagName("td")[3].textContent
         var variation=rows[i].getElementsByTagName("td")[4].textContent
   
         a.push({
          name:td,
          price:price,
          variation:variation
      })
          }
          return a
      })
      
      return names
  }


// console.log(items)
