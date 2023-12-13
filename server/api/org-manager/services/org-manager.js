'use strict';

// find a org manager by user id
module.exports.findById = async (id) => {
  const admin = await strapi.services.administrator.findOne({ user: id });
  console.log(adimin)
  return {
    orgManager: admin,
  };
};

// find all orgs for an org manager
module.exports.findOrgsById = async (id) => {
  const admin = await strapi.services.administrator.findOne({ user: id });
  const orgs = admin.organizations;

  const crList = await Promise.all(
    orgs.map(async (organization) => {
      const model = await strapi
        .query('organization')
        .model.where('id', organization.id)
        .fetch();
      return model ? model.toJSON() : undefined;
    })
  );
  console.log(crList);

  return crList;
};
