'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('index.html',{title:'后台模板推荐'})
  }
}

module.exports = IndexController;
