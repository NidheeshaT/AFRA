const { default: fetch } = require("node-fetch")

const getURL=async(body)=>{
    let r=await fetch(process.env.GSHEET_URL||'https://www.thunderclient.com/welcome',
    {
        method:'POST',
        body:JSON.stringify(body)
    })
    return await r.json()
}

module.exports=getURL