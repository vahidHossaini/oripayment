var uuid=require("uuid");
module.exports = class paymentIndex
{
	constructor(config,dist)
	{
		this.config=config.statics
		this.context=this.config.context 
        this.bootstrap=require('./bootstrap.js')
        this.enums=require('./struct.js') 
        this.tempConfig=require('./config.js')
        this.drivers={}
        if(this.config.drivers)
            for(var a of this.config.drivers)
            {
                this.drivers[a.name] = new (require('./drivers/'+a.type+'.js'))(a);
            }
		//global.acc=new accountManager(dist)
	}
	async getLog(msg,func,self)
    {
		var dt=msg.data;
		var session=msg.session;
        var log=await global.db.Search(self.context,'payment_log',{where:{userid:session.userid}},dt)
        return func(null,log)
        
    }
	async request(msg,func,self)
	{
		var dt=msg.data;
        var driver=self.drivers[dt.name]
		var session=msg.session;
        if(!driver)
            return func({m:'payment001'});
        var data= await driver.request(dt.amount,session.userid);
        var log={_id:data._id,submitDate:new Date(),amount:dt.amount,data:data.obj,userid:session.userid,type:dt.name}
        await global.db.Save(self.context,'payment_log',["_id"],log) 
		return func(null,data);
	}
    async purchase(msg,func,self)
    {
		var dt=msg.data;
		var session=msg.session;
        var driver=self.drivers[dt.name]
        if(!driver)
            return func({m:'payment001'});
        var id=await driver.getId(dt,driver); 
        if(!id)
            return func({m:"payment002"})
        var log=await global.db.SearchOne(self.context,'payment_log',{where:{_id:id}}) 
        if(!log)
            return func({m:"payment002"})
        var resp= await driver.purchase(dt,log,driver);
        if(!resp || !resp.isDone)
            return func({m:"payment003"})
        await global.db.Save(self.context,'payment_log',["_id"],{_id:id,resp,}); 
        if(  driver.wallet)
        { 
			var amount=log.amount;
			if(resp.amount)
				amount=resp.amount
		console.log('|||||||||------------>',id,driver.wallet.name,amount,log.userid)
		try{
			amount=parseInt(amount.toString());
            var walletResponse = await global.wallet.request(id,driver.wallet.name,null,amount,session.userid); 
			console.log('|||||||||------------>',walletResponse)
			return func(null,{active:true});
		}catch(exp)
		{
			console.log('|||||||||------------>',exp)
		}
		
        }
		return func({});
           
    }
}