module.exports = () => {
  return async function (ctx, next) {
    console.log('report中间件开始')
    const startTime = Date.now();
    await next();
    // 上报请求时间
    console.log('report中间件结束：耗时'+(Date.now() - startTime)+'ms');
  }
};