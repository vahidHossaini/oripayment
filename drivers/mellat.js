const Mellat = require( 'mellat-payment' );
module.exports=class mellatService 
{
    constructor(config)
    {
        this.terminal=config.terminal    
        this.username=config.username    
        this.password=config.password   
        this.verify=config.verify 
        this.context=config.context
    }
    async request(amount,userid)
    {
        try{
            var resp = await Mellat.Request( 
                    this.config.terminal , 
                    this.config.username, 
                    this.config.password, 
                    amount , 
                    this.config.verify );
            var direct='<form id="myForm" action="https://bpm.shaparak.ir/pgwchannel/startpay.mellat" method="post"><input type="hidden" name="RefId" value="'+resp.RefId+'" /> </form><script>document.getElementById("myForm").submit();</script>'
           
            var data = {_id:resp.RefId:obj:{RefId:resp.RefId},}
            return data;
        }catch(exp)
        {
            
            return {}
        }
    }
    getData(msg,func,self)
    {
        var dt=msg.data
        if(!this.amount )
            return func({message:'pay001'})
         Mellat.Request( 
          this.config.terminal , 
        this.config.username, 
        this.config.password, 
        this.amount , 
        this.config.verify ).then(function (resp,rej) { 
            if(resp.RefId)
                var direct='<form id="myForm" action="https://bpm.shaparak.ir/pgwchannel/startpay.mellat" method="post"><input type="hidden" name="RefId" value="'+resp.RefId+'" /> </form><script>document.getElementById("myForm").submit();</script>'
            func(null,{redirect:direct})
            console.log(direct)
        })
            
    }
    purchase(msg,func,self)
    {
        
    }
}