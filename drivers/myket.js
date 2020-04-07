var uuid=require("uuid"); 
module.exports=class cafebazarService 
{
    constructor(config)
    {
        this.token=config.token;  
        this.packageName=config.packageName  ;
		this.currency=config.currency;
		this.wallet=config.wallet;
		this.context=config.context;
    } 
    async request(amount,userid)
    {
         return {_id:uuid.v4()}
    }
    async getId(data,self)
    {  
        var id=""
        try{
			var url='https://developer.myket.ir/api/applications/'+self.packageName+'/purchases/products/'+data["package"]+'/tokens/'+data.id
		    console.log('----------->',self.token)
           var response= await global.web.get(url ,null,{"X-Access-Token":self.token});  
		    console.log('----------->',response)
           id=response.developerPayload;
		   //if(!id)
			//   id='10e7eb43-d014-4e71-8741-7aff13c20669'
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