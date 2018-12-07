// This software includes the work that is distributed in the Apache License 2.0
// ref: https://github.com/awslabs/aws-cdk/blob/v0.19.0/packages/%40aws-cdk/cdk/lib/util/uniqueid.ts

/**
 * Resources with this ID are hidden from humans
 *
 * They do not appear in the human-readable part of the logical ID,
 * but they are included in the hash calculation.
 */
const HIDDEN_FROM_HUMAN_ID = 'Resource';

/**
 * Resources with this ID are complete hidden from the logical ID calculation.
 */
const HIDDEN_ID = 'Default';

const MAX_HUMAN_LEN = 240; // max ID len is 255

/**
 * Removes all non-alphanumeric characters in a string.
 */
function removeNonAlphanumeric(s) {
  return s.replace(/[^A-Za-z0-9]/g, '');
}

/**
 * Remove duplicate "terms" from the path list
 *
 * If the previous path component name ends with this component name, skip the
 * current component.
 */
function removeDupes(path) {
  const ret = [];

  for (const component of path) {
    if (ret.length === 0 || !ret[ret.length - 1].endsWith(component)) {
      ret.push(component);
    }
  }

  return ret;
}

// Apply monkey patch to uniqueId.makeUniqueId
exports.patch = (importedCdkUniqueId) => {
  importedCdkUniqueId.makeUniqueId = (components) => {
    components = components.filter(x => x !== HIDDEN_ID);
    if (components.length === 0) {
      throw new Error('Unable to calculate a unique id for an empty set of components');
    }

    // top-level resources will simply use the `name` as-is in order to support
    // transparent migration of cloudformation templates to the CDK without the
    // need to rename all resources.
    if (components.length === 1) {
      return components[0];
    }

    const human = removeDupes(components)
      .filter(x => x !== HIDDEN_FROM_HUMAN_ID)
      .map(removeNonAlphanumeric)
      .join('')
      .slice(0, MAX_HUMAN_LEN);

    return human;
  }
};
