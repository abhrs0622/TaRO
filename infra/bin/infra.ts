#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { TaROStack } from '../lib/taro-stack';

const app = new cdk.App();
new TaROStack(app, 'InfraStack', {});