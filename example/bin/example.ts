#!/usr/bin/env node
import cdk = require('@aws-cdk/cdk');
import { ExampleStack } from '../lib/example-stack';
const cdkMonkeyPatch = require('@tokkiyaa/cdk-monkey-patch-logical-id-literal-allocation');
cdkMonkeyPatch.patch(require('@aws-cdk/cdk/lib/util/uniqueid'));

const app = new cdk.App();
new ExampleStack(app, 'ExampleStack');
app.run();
