module.exports = option =>{
    return async function log(ctx, next) {
        console.log('log中间件开始')
        const start = new Date()
        const res = ctx
        if(res.request.method=="PUT"||res.request.method=="DELETE"){
        	ctx.body = '非法的请求方式';
            ctx.status = 405;
            return
        }
        await next()
        const ms = new Date() - start
        if(res.headers&&res.headers.accept.indexOf('text/html')<0){
            console.log(`"请求域名"：${res.request.host},"请求接口路径"：${res.request.path},"请求方法"：${res.request.method},"请求主体"：${res.request.method=='GET'?JSON.stringify(res.request.query):JSON.stringify(res.request.body)}`)
            console.log(`"响应主体"：${res.body}`)
        }
        console.log('log中间件结束')
    }
}