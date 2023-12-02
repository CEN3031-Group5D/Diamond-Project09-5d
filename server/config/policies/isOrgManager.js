//
// Check if the current user is a classroom manager
//
module.exports = async (ctx, next) => {
  if (
    (ctx.state.user && ctx.state.user.role.name === 'Org Manager') ||
    ctx.state.user.role.name === 'Administrator'|| ctx.state.user && ctx.state.user.role.name === 'Organization Manager' ||
    ctx.state.user.role.name === 'Admin'
  ) {
    // Go to next policy or controller
    return await next();
  }

  ctx.unauthorized(`You're not allowed to perform this action!`);
};
