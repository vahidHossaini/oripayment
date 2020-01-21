module.exports = class paymentBootstrap{
  constructor(config)
  {
    this.funcs=[
      {
          name:'getLog', 
      }, 
      {
          name:'purchase', 
      }, 
      {
          name:'request', 
          inputs:[
			{
				name:'name',
				type:'string',
				nullable:false
			},
			{
				name:'amount',
				type:'string',
				nullable:false
			},
          ]
      }, 
	  
	  
	   
    ]
    this.auth=[ 
            {
                role: 'login',
                name: 'uploadStream'
            },
            {
                role: 'login',
                name: 'uploadStream'
            },
            {
                role: 'login',
                name: 'uploadStream'
            },
        ]
  }
}