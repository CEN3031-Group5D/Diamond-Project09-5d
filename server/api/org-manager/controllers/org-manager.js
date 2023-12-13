'use strict';

const { sanitizeEntity } = require('strapi-utils/lib');

module.exports = {
  /**
   * Get the currrent org manager that is logged in
   *
   * @return {Administrator}
   */
  async me(ctx) {
    const { id } = ctx.state.user;

    // get the org manager
    const { orgManager } = await strapi.services[
      'org-manager'
    ].findById(id);

    // remove private fields and return the org manager
    return sanitizeEntity(orgManager, { model: strapi.models.Administrator });
  },
};
