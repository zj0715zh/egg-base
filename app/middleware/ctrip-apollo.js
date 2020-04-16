const apollo = require('ctrip-apollo')
// const {apolloHost} = require('../apiProxy/reqHost');
const apollonMap = {
	"prod": "http://apconfig.ppdaicorp.com",
	"uat": "http://uat-apconfig.ppdaicorp.com",
	"pre": "http://pre-apconfig.ppdaicorp.com",
	"fat": "http://fat-apconfig.ppdaicorp.com",
	"docker": "http://pre-apconfig.ppdaicorp.com"
}
const apolloHost = apollonMap[process.env.NODE_ENV] || 'http://fat-apconfig.ppdaicorp.com';

module.exports = function(){
	const apollontest = apollo({
	  host: apolloHost,
	  appId: '1000002540'
	})

	const namespace = apollontest.namespace()
	namespace.on('change', ({
	  key,
	  oldValue,
	  newValue
	}) => {
	  	process.env[key] = newValue
	})

	namespace.on('add', ({
	  key,
	  value
	}) => {
	  	process.env[key] = value
	})

	namespace.on('delete', ({
	  key,
	  value
	}) => {
		console.log('删除'+key+':'+value)
	  	process.env[key] = null;
	})

	// console.log(result)
	namespace.ready()
	.then(() => {
		Object.keys(namespace._config).forEach((key) => {
			process.env[key] = namespace.get(key)
		})
	})
}