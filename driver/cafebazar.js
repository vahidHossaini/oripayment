var uuid=require("uuid"); 
module.exports=class cafebazarService 
{
    constructor(config)
    {
        this.token=""
        this.refresh_token=config.refresh_token   
        this.client_id=config.client_id   
        this.client_secret=config.client_secret   
        this.packageName=config.packageName   
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
            this.expire=(new Date()).getTime()+data.expires_in-60000;
            this.token=data.access_token;
            return;
        }
        return this.token;
    }
    async request(amount,userid)
    {
         return {}
    }
    async getId(data)
    { 
        var token= await getToken();
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
    purchase(msg,func,self)
    {
        return {}
    }
}