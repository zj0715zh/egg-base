//接口服务调用目录
const Service = require('egg').Service;

class ArticleService extends Service {
	//调用方式：ctx.service.test.findeOne
	async findeOne(id) {
		//HttpClient中contentType，HttpClient中会默认以 application/x-www-form-urlencoded 格式发送请求
	    const res = await ctx.curl('https://registry.npm.taobao.org/egg/latest', {
	      	method: 'get',
	      	data: {},
	      	dataType: 'json',
	        contentType: 'json',
      	});
      	ctx.app.cache = res.data;
	    return {}
	}

}