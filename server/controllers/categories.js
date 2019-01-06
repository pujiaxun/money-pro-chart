module.exports = async ctx => {
  const { category, type } = ctx.query;

  const rows = await ctx.nedb.find({ table: "categories" });
  const results = rows.filter(
    res =>
      (!category || res.category === category) && (!type || res.type === type)
  );

  ctx.body = { results };
};
