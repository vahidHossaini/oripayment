module.exports = class paymentConfig
{
    constructor(config)
    { 
         this.config=config;
    }
    getPackages()
    {
        var pk={};
        if(this.config.drivers)
        {
            for(var a of this.config.drivers)
                if(a.type=="mellat")
                    pk["mellat-payment"]=true;
        }
        var arr=[]
        for(var a in pk)
            arr.push({name:a})
       return arr
    }
    getMessage()
	{
		return{
			default001:"user not exist", 
		}
	}
    getVersionedPackages()
    { 
      return []
    }
    getDefaultConfig()
    {
      return {
		drivers:[
		{
			name:"",
            type:""
		}
        ]
		 
      }
    }
}