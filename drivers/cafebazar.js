var uuid=require("uuid"); 
module.exports=class cafebazarService 
{
    constructor(config)
    {
        this.token=""
		console.log('------------------',config)
        this.refresh_token=config.refresh_token   
        this.client_id=config.client_id   
        this.client_secret=config.client_secret   
        this.packageName=config.packageName  
		this.currency=config.currency
		this.wallet=config.wallet;
		this.context=config.context;
    }
    async getToken(self)
    {
        if(!self.token || this.expire<(new Date()).getTime())
        {
           var data = await global.web.postForm('https://pardakht.cafebazaar.ir/auth/token/',{
                "grant_type":"refresh_token",
                "client_id":self.client_id,
                "client_secret":self.client_secret,
                "refresh_token":self.refresh_token,
            })
			data=JSON.parse(data)  
            this.expire=(new Date()).getTime()+data.expires_in-60000;
            this.token=data.access_token;
            return this.token;
        }
        return this.token;
    }
    async request(amount,userid)
    {
         return {_id:uuid.v4()}
    }
    async getId(data,self)
    { 
        var token= await self.getToken(self);
        var id=""
        try{
           var response= await global.web.get(
           'https://pardakht.cafebazaar.ir/devapi/v2/api/validate/'+self.packageName+'/inapp/'+data["package"]+'/purchases/'+data.id,{access_token:token});  
		    
           id=response.developerPayload;
        }catch(exp)
        { 
        }
        return id;
    } 
    async purchase(data,log,self)
    {
		var response={isDone:true};
		if(self.wallet)
		{
			var exchangeRate = await global.db.SearchOne(self.context,'payment_exchange',{where:{$and:[{"from":self.currency},{"to":self.wallet.name},{fromValue:data["package"]}]}});
			if(exchangeRate)
			{	
				response.amount=exchangeRate.toValue;
			}
		}
        return response;
    }
}