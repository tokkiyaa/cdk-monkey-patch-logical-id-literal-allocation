# cdk-monkey-patch-logical-id-literal-allocation

## Motivation
aws-cdk adds hash to logical id.

For creating new Resources this is maybe a good behavior.
But when we migrate old CFn template to cdk code, this behavior is undesirable.

According to [this Documentation](https://awslabs.github.io/aws-cdk/logical-ids.html) we can prevent logical id renaming by explicitly write `aws-cdk.Stack.renameLogical(logicalIdYouWrite + hash, logicalIdYouWrite)`.
This is verbose, further, to write this, we have to calculate hash.

This packcage is a workaround to avoid writing `aws-cdk.Stack.renameLogical` for every resources.

## Usage
```
const cdkMonkeyPatch = require('@tokkiyaa/cdk-monkey-patch-logical-id-literal-allocation');
cdkMonkeyPatch.patch(require('@aws-cdk/cdk/lib/util/uniqueid'));
```

- [see example](./example/bin/example.ts)