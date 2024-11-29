export const timeAgo=(time)=>{
    let newDateArry=[]
    let date=new Date()
    time?.split("T").forEach((item,index)=>{
      if(index===0){
        item.split("-").forEach((item)=>newDateArry.push(Math.floor(Number(item))))
      }
      else{
        item.split(":").slice(0,3).forEach((item,indx)=>{
          if(Number(item) && indx === 0){
            newDateArry.push(Number(item)+5)
          }
          else if(Number(item)){
            newDateArry.push(Number(item))
          }
          else{
            newDateArry.push(Math.floor(Number(item.split(".")[0])))
          }
        })
      }
    })
    for (let i = 0; i < newDateArry.length; i++) {
          let numTime=newDateArry[i]
          if(i===0 &&  date.getFullYear() - numTime !== 0){
            return `${date.getFullYear() - numTime} y ago`
          }
          else if(i===1 &&  date.getMonth()+1 - numTime !== 0){
            return `${date.getMonth()+1 - numTime} m ago`
          }
          else if(i===2 &&  date.getDate() - numTime !== 0){
            return `${date.getDate() - numTime} d ago`
          }
          else if(i===3 &&  date.getHours() - numTime !== 0){
            return `${date.getHours() - numTime} h ago`
          }
          else if(i===4 &&  date.getMinutes() - numTime !== 0){
            return `${date.getMinutes() - numTime} min ago`
          }
          else if(i===5 &&  date.getSeconds() - numTime !== 0){
            return `${date.getSeconds() - numTime} s ago`
          }
      }
  }