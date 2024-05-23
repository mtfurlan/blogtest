---
title: Notes on using API Gateway Lambda Authorizers
---

TL;DR: api gateway authorizers can't support two authentictaion schemes at once, so $work can't use them

## apigateway vs apigatewayv2
No idea what the difference is

## http api vs rest api
* http api (with apigatewayv2) supports authorizerPayloadFormatVersion 2.0 which has the simple format which is much nicer
* rest api supports modifying the responses so you can put more debugging into error messages
* SpecRestApi is the easy way to create an api from an openapi, it's apigateway and rest api

## setup
### rest api apigateway
```
        const api = new apigateway.SpecRestApi( this, `api`, {
            apiDefinition: apigateway.AssetApiDefinition.fromInline(openapiConfig),
            failOnWarnings: true,
        });
```

### http api apigatewayv2
```
        const api = new apigatewayv2.CfnApi(this, 'MyApi', {
            body: openapiConfig,
            failOnWarnings: true,
        });
        const stage = new apigatewayv2.CfnStage(this, 'MyCfnStage', {
            apiId: api.ref,
            stageName: '$default',
            autoDeploy: true,
        });
        stage.addDependency(api);
```


### Authorizer permissions
```
        authLambda.addPermission("PermitAPIGInvocation", {
            principal: new cdk.aws_iam.ServicePrincipal(
                "apigateway.amazonaws.com",
            ),
            // for a normal execute lambda, set sourceArn to arnForExecuteAPI("*")
            // it's the same as below if if resourceName ended up as `*/*/*`
            // auth lambdas are speical though
            sourceArn: this.apiGateway.stack.formatArn({
                service: "execute-api",
                resource: this.apiGateway.restApiId,
                arnFormat: cdk.ArnFormat.SLASH_RESOURCE_NAME,
                resourceName: `authorizers/*`,
            }),
        });
```

### openapi config

#### setting up auth
A lambda can only have one authorizer lambda
An authorizer lambda can only AND inputs, it can't OR so if you want two types of authentication you can't really use authentication lambdas

Also, api gateway doesn't believe in basic auth, you have to lie in your openapi config and say it's an api key
```
    "components": {
        "securitySchemes": {
            "BasicAuth": {
                "type": "apiKey",
                "in": "header",
                "name": "authorization",
                "description": "http basic auth, but aws doesn't support basic so this says apiKey"
            },
```



* for http api, the docs are wrong about header capitalization
  * https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-lambda-authorizer.html
  * `$request.header.Authorization` needs to be `$request.header.authorization`
* for rest api, it's `method.request.whatever` instead of `$request.whatever`

```
            openapiConfig.components.securitySchemes
                .BasicAuth["x-amazon-apigateway-authtype"] = "basic";
            openapiConfig.components.securitySchemes
                .BasicAuth["x-amazon-apigateway-authorizer"] = {
                    "type": "request",
                    "identitySource": "method.request.header.authorization",
                    "authorizerUri":
                        `arn:aws:apigateway:${props.env.region}:lambda:path/2015-03-31/functions/${authLambda.functionArn}/invocations`,
                    "authorizerResultTtlInSeconds": 0,
                };
```

#### WWW-Authenticate header
The responseTemplates is optional, I think it will tell you an error type in a response header, but it's easier to read if it's in the response
```
        openapiConfig["x-amazon-apigateway-gateway-responses"] = {
            "ACCESS_DENIED": {
                "statusCode": 403,
                "responseParameters": {
                    "gatewayresponse.header.WWW-Authenticate":
                        `'Basic realm="${props.dnsCertStuff.domainString}"'`,
                },
                "responseTemplates": {
                    "application/json":
                        "{\"message\":$context.error.messageString, \"flavour\": \"access denied\"}",
                },
            },
            "INVALID_API_KEY": {
                "statusCode": 403,
                "responseParameters": {
                    "gatewayresponse.header.WWW-Authenticate":
                        `'Basic realm="${props.dnsCertStuff.domainString}"'`,
                },
                "responseTemplates": {
                    "application/json":
                        "{\"message\":$context.error.messageString, \"flavour\": \"invalid api key\"}",
                },
            },
            "UNAUTHORIZED": {
                "statusCode": 401,
                "responseParameters": {
                    "gatewayresponse.header.WWW-Authenticate":
                        `'Basic realm="${props.dnsCertStuff.domainString}"'`,
                },
                "responseTemplates": {
                    "application/json":
                        "{\"message\":$context.error.messageString, \"flavour\": \"unauthorized\"}",
                },
            },
        };
```

