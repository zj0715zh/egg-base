//定时任务目录

module.exports = app => {
  return {
    schedule: {
      interval: app.config.cacheTick,//读取config.default.js中的配置
      type: 'all',
    },
    async task(ctx) {
      const res = await ctx.curl('https://registry.npm.taobao.org/egg/latest', {
      	method: 'get',
      	data: {},
      	dataType: 'json',
        contentType: 'json',
      });
      ctx.app.cache = res.data;
    },
  };
};