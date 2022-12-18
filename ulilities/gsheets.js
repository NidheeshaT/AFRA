const { default: fetch } = require("node-fetch")

const getURL=async()=>{
    let r=await fetch('https://script.google.com/macros/s/AKfycbxZvs3iIqOKXGxgZOXf4DloDyc37QB3RZlU6oLgBtJ6QT22GmHVZ6OhLZt7I7oCBZRe/exec',
    {
        method:'POST',
        body:JSON.stringify({
            code:"skldf",
            enrolled:[{label:"sdkf",attendTime:new Date(Date.now()).toISOString(),attendToday:true}]
        })
    })
    console.log(await r.json())
}

module.exports=getURL