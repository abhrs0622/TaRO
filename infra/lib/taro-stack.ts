import * as cdk from "aws-cdk-lib";
import {
  Duration,
  Stack,
  StackProps,
  aws_s3_assets as assets,
  aws_dynamodb as dynamodb,
  aws_apigateway as gateway,
  aws_lambda as lambda,
  aws_sqs as sqs,
} from "aws-cdk-lib";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import { Construct } from "constructs";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config();

if (process.env.OPENAI_KEY == undefined) throw new Error("Invalid environment");

export class TaROStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const dynamoTable = new dynamodb.TableV2(this, "Table", {
      partitionKey: { name: "plansID", type: dynamodb.AttributeType.NUMBER },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const SQS = new sqs.Queue(this, "queue", {
      visibilityTimeout: Duration.minutes(6),
    });

    const producerLambdaAsset = new assets.Asset(this, "GinServerAsset", {
      path: path.join(__dirname, "../../backend/producer/bin"),
    });

    const consumerLambdaAsset = new assets.Asset(this, "ConsumerAsset", {
      path: path.join(__dirname, "../../backend/consumer/bin"),
    });

    const producerLambdaFunction = new lambda.Function(this, "GinServer", {
      code: lambda.Code.fromBucket(
        producerLambdaAsset.bucket,
        producerLambdaAsset.s3ObjectKey
      ),
      timeout: Duration.minutes(5),
      runtime: lambda.Runtime.GO_1_X,
      handler: "main",
      environment: {
        SQS_URL: SQS.queueUrl,
        DYNAMO_TABLE: dynamoTable.tableName,
        YOUR_API_KEY: String(process.env.OPENAI_KEY),
        YAHOO_API_KEY: String(process.env.YAHOO_KEY),
      },
    });

    const consumerLambdaFunction = new lambda.Function(this, "Consumer", {
      code: lambda.Code.fromBucket(
        consumerLambdaAsset.bucket,
        consumerLambdaAsset.s3ObjectKey
      ),
      timeout: Duration.minutes(5),
      runtime: lambda.Runtime.PROVIDED_AL2,
      handler: "main",
      environment: {
        SQS_URL: SQS.queueUrl,
        DYNAMO_TABLE: dynamoTable.tableName,
        YOUR_API_KEY: String(process.env.OPENAI_KEY),
      },
    });

    SQS.grantSendMessages(producerLambdaFunction);
    SQS.grantConsumeMessages(consumerLambdaFunction);

    // SQSにメッセージが送られると、consumerのlambdaが起動する
    consumerLambdaFunction.addEventSource(new SqsEventSource(SQS));

    dynamoTable.grantFullAccess(producerLambdaFunction);
    dynamoTable.grantFullAccess(consumerLambdaFunction);

    new gateway.LambdaRestApi(this, "GinServerLambdaEndpoint", {
      handler: producerLambdaFunction,
    });
  }
}
