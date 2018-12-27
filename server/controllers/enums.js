module.exports = async ctx => {
  const { field } = ctx.query;

  const results = await ctx.nedb.find({ table: "enums", type: field });
  ctx.body = { results };
};
