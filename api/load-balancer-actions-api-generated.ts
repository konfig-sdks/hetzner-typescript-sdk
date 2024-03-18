/* tslint:disable */
/* eslint-disable */
/*
Hetzner Cloud API

This is the official documentation for the Hetzner Cloud API.

## Introduction

The Hetzner Cloud API operates over HTTPS and uses JSON as its data format. The API is a RESTful API and utilizes HTTP methods and HTTP status codes to specify requests and responses.

As an alternative to working directly with our API you may also consider to use:

- Our CLI program [hcloud](https://github.com/hetznercloud/cli)
- Our [library for Go](https://github.com/hetznercloud/hcloud-go)
- Our [library for Python](https://github.com/hetznercloud/hcloud-python)

Also you can find a [list of libraries, tools, and integrations on GitHub](https://github.com/hetznercloud/awesome-hcloud).

If you are developing integrations based on our API and your product is Open Source you may be eligible for a free one time €50 (excl. VAT) credit on your account. Please contact us via the the support page on your Cloud Console and let us know the following:

- The type of integration you would like to develop
- Link to the GitHub repo you will use for the Project
- Link to some other Open Source work you have already done (if you have done so)

## Getting Started

To get started using the API you first need an API token. Sign in into the [Hetzner Cloud Console](https://console.hetzner.cloud/) choose a Project, go to `Security` → `API Tokens`, and generate a new token. Make sure to copy the token because it won’t be shown to you again. A token is bound to a Project, to interact with the API of another Project you have to create a new token inside the Project. Let’s say your new token is `LRK9DAWQ1ZAEFSrCNEEzLCUwhYX1U3g7wMg4dTlkkDC96fyDuyJ39nVbVjCKSDfj`.

You’re now ready to do your first request against the API. To get a list of all Servers in your Project, issue the example request on the right side using [curl](https://curl.se/).

Make sure to replace the token in the example command with the token you have just created. Since your Project probably does not contain any Servers yet, the example response will look like the response on the right side. We will almost always provide a resource root like `servers` inside the example response. A response can also contain a `meta` object with information like [Pagination](https://docs.hetzner.cloud).

**Example Request**

```bash
curl -H \"Authorization: Bearer LRK9DAWQ1ZAEFSrCNEEzLCUwhYX1U3g7wMg4dTlkkDC96fyDuyJ39nVbVjCKSDfj\" \\
  https://api.hetzner.cloud/v1/servers
```

**Example Response**

```json
{
  \"servers\": [],
  \"meta\": {
    \"pagination\": {
      \"page\": 1,
      \"per_page\": 25,
      \"previous_page\": null,
      \"next_page\": null,
      \"last_page\": 1,
      \"total_entries\": 0
    }
  }
}
```

## Authentication

All requests to the Hetzner Cloud API must be authenticated via a API token. Include your secret API token in every request you send to the API with the `Authorization` HTTP header.

To create a new API token for your Project, switch into the [Hetzner Cloud Console](https://console.hetzner.cloud/) choose a Project, go to `Security` → `API Tokens`, and generate a new token.

**Example Authorization header**

```http
Authorization: Bearer LRK9DAWQ1ZAEFSrCNEEzLCUwhYX1U3g7wMg4dTlkkDC96fyDuyJ39nVbVjCKSDfj
```

## Errors

Errors are indicated by HTTP status codes. Further, the response of the request which generated the error contains an error code, an error message, and, optionally, error details. The schema of the error details object depends on the error code.

The error response contains the following keys:

| Keys      | Meaning                                                               |
| --------- | --------------------------------------------------------------------- |
| `code`    | Short string indicating the type of error (machine-parsable)          |
| `message` | Textual description on what has gone wrong                            |
| `details` | An object providing for details on the error (schema depends on code) |

**Example response**

```json
{
  \"error\": {
    \"code\": \"invalid_input\",
    \"message\": \"invalid input in field 'broken_field': is too long\",
    \"details\": {
      \"fields\": [
        {
          \"name\": \"broken_field\",
          \"messages\": [\"is too long\"]
        }
      ]
    }
  }
}
```

### Error Codes

| Code                      | Description                                                                      |
| ------------------------- | -------------------------------------------------------------------------------- |
| `forbidden`               | Insufficient permissions for this request                                        |
| `unauthorized`            | Request was made with an invalid or unknown token                                |
| `invalid_input`           | Error while parsing or processing the input                                      |
| `json_error`              | Invalid JSON input in your request                                               |
| `locked`                  | The item you are trying to access is locked (there is already an Action running) |
| `not_found`               | Entity not found                                                                 |
| `rate_limit_exceeded`     | Error when sending too many requests                                             |
| `resource_limit_exceeded` | Error when exceeding the maximum quantity of a resource for an account           |
| `resource_unavailable`    | The requested resource is currently unavailable                                  |
| `server_error`            | Error within the API backend                                                     |
| `service_error`           | Error within a service                                                           |
| `uniqueness_error`        | One or more of the objects fields must be unique                                 |
| `protected`               | The Action you are trying to start is protected for this resource                |
| `maintenance`             | Cannot perform operation due to maintenance                                      |
| `conflict`                | The resource has changed during the request, please retry                        |
| `unsupported_error`       | The corresponding resource does not support the Action                           |
| `token_readonly`          | The token is only allowed to perform GET requests                                |
| `unavailable`             | A service or product is currently not available                                  |

**invalid_input**

```json
{
  \"error\": {
    \"code\": \"invalid_input\",
    \"message\": \"invalid input in field 'broken_field': is too long\",
    \"details\": {
      \"fields\": [
        {
          \"name\": \"broken_field\",
          \"messages\": [\"is too long\"]
        }
      ]
    }
  }
}
```

**uniqueness_error**

```json
{
  \"error\": {
    \"code\": \"uniqueness_error\",
    \"message\": \"SSH key with the same fingerprint already exists\",
    \"details\": {
      \"fields\": [
        {
          \"name\": \"public_key\"
        }
      ]
    }
  }
}
```

**resource_limit_exceeded**

```json
{
  \"error\": {
    \"code\": \"resource_limit_exceeded\",
    \"message\": \"project limit exceeded\",
    \"details\": {
      \"limits\": [
        {
          \"name\": \"project_limit\"
        }
      ]
    }
  }
}
```

## Labels

Labels are `key/value` pairs that can be attached to all resources.

Valid label keys have two segments: an optional prefix and name, separated by a slash (`/`). The name segment is required and must be a string of 63 characters or less, beginning and ending with an alphanumeric character (`[a-z0-9A-Z]`) with dashes (`-`), underscores (`_`), dots (`.`), and alphanumerics between. The prefix is optional. If specified, the prefix must be a DNS subdomain: a series of DNS labels separated by dots (`.`), not longer than 253 characters in total, followed by a slash (`/`).

Valid label values must be a string of 63 characters or less and must be empty or begin and end with an alphanumeric character (`[a-z0-9A-Z]`) with dashes (`-`), underscores (`_`), dots (`.`), and alphanumerics between.

The `hetzner.cloud/` prefix is reserved and cannot be used.

**Example Labels**

```json
{
  \"labels\": {
    \"environment\": \"development\",
    \"service\": \"backend\",
    \"example.com/my\": \"label\",
    \"just-a-key\": \"\"
  }
}
```

## Label Selector

For resources with labels, you can filter resources by their labels using the label selector query language.

| Expression           | Meaning                                              |
| -------------------- | ---------------------------------------------------- |
| `k==v` / `k=v`       | Value of key `k` does equal value `v`                |
| `k!=v`               | Value of key `k` does not equal value `v`            |
| `k`                  | Key `k` is present                                   |
| `!k`                 | Key `k` is not present                               |
| `k in (v1,v2,v3)`    | Value of key `k` is `v1`, `v2`, or `v3`              |
| `k notin (v1,v2,v3)` | Value of key `k` is neither `v1`, nor `v2`, nor `v3` |
| `k1==v,!k2`          | Value of key `k1` is `v` and key `k2` is not present |

### Examples

- Returns all resources that have a `env=production` label and that don't have a `type=database` label:

  `env=production,type!=database`

- Returns all resources that have a `env=testing` or `env=staging` label:

  `env in (testing,staging)`

- Returns all resources that don't have a `type` label:

  `!type`

## Pagination

Responses which return multiple items support pagination. If they do support pagination, it can be controlled with following query string parameters:

- A `page` parameter specifies the page to fetch. The number of the first page is 1.
- A `per_page` parameter specifies the number of items returned per page. The default value is 25, the maximum value is 50 except otherwise specified in the documentation.

Responses contain a `Link` header with pagination information.

Additionally, if the response body is JSON and the root object is an object, that object has a `pagination` object inside the `meta` object with pagination information:

**Example Pagination**

```json
{
    \"servers\": [...],
    \"meta\": {
        \"pagination\": {
            \"page\": 2,
            \"per_page\": 25,
            \"previous_page\": 1,
            \"next_page\": 3,
            \"last_page\": 4,
            \"total_entries\": 100
        }
    }
}
```

The keys `previous_page`, `next_page`, `last_page`, and `total_entries` may be `null` when on the first page, last page, or when the total number of entries is unknown.

**Example Pagination Link header**

```http
Link: <https://api.hetzner.cloud/v1/actions?page=2&per_page=5>; rel=\"prev\",
      <https://api.hetzner.cloud/v1/actions?page=4&per_page=5>; rel=\"next\",
      <https://api.hetzner.cloud/v1/actions?page=6&per_page=5>; rel=\"last\"
```

Line breaks have been added for display purposes only and responses may only contain some of the above `rel` values.

## Rate Limiting

All requests, whether they are authenticated or not, are subject to rate limiting. If you have reached your limit, your requests will be handled with a `429 Too Many Requests` error. Burst requests are allowed. Responses contain serveral headers which provide information about your current rate limit status.

- The `RateLimit-Limit` header contains the total number of requests you can perform per hour.
- The `RateLimit-Remaining` header contains the number of requests remaining in the current rate limit time frame.
- The `RateLimit-Reset` header contains a UNIX timestamp of the point in time when your rate limit will have recovered and you will have the full number of requests available again.

The default limit is 3600 requests per hour and per Project. The number of remaining requests increases gradually. For example, when your limit is 3600 requests per hour, the number of remaining requests will increase by 1 every second.

## Server Metadata

Your Server can discover metadata about itself by doing a HTTP request to specific URLs. The following data is available:

| Data              | Format | Contents                                                     |
| ----------------- | ------ | ------------------------------------------------------------ |
| hostname          | text   | Name of the Server as set in the api                         |
| instance-id       | number | ID of the server                                             |
| public-ipv4       | text   | Primary public IPv4 address                                  |
| private-networks  | yaml   | Details about the private networks the Server is attached to |
| availability-zone | text   | Name of the availability zone that Server runs in            |
| region            | text   | Network zone, e.g. eu-central                                |

**Example: Summary**

```bash
$ curl http://169.254.169.254/hetzner/v1/metadata
```

```yaml
availability-zone: hel1-dc2
hostname: my-server
instance-id: 42
public-ipv4: 1.2.3.4
region: eu-central
```

**Example: Hostname**

```bash
$ curl http://169.254.169.254/hetzner/v1/metadata/hostname
my-server
```

**Example: Instance ID**

```bash
$ curl http://169.254.169.254/hetzner/v1/metadata/instance-id
42
```

**Example: Public IPv4**

```bash
$ curl http://169.254.169.254/hetzner/v1/metadata/public-ipv4
1.2.3.4
```

**Example: Private Networks**

```bash
$ curl http://169.254.169.254/hetzner/v1/metadata/private-networks
```

```yaml
- ip: 10.0.0.2
  alias_ips: [10.0.0.3, 10.0.0.4]
  interface_num: 1
  mac_address: 86:00:00:2a:7d:e0
  network_id: 1234
  network_name: nw-test1
  network: 10.0.0.0/8
  subnet: 10.0.0.0/24
  gateway: 10.0.0.1
- ip: 192.168.0.2
  alias_ips: []
  interface_num: 2
  mac_address: 86:00:00:2a:7d:e1
  network_id: 4321
  network_name: nw-test2
  network: 192.168.0.0/16
  subnet: 192.168.0.0/24
  gateway: 192.168.0.1
```

**Example: Availability Zone**

```bash
$ curl http://169.254.169.254/hetzner/v1/metadata/availability-zone
hel1-dc2
```

**Example: Region**

```bash
$ curl http://169.254.169.254/hetzner/v1/metadata/region
eu-central
```

## Sorting

Some responses which return multiple items support sorting. If they do support sorting the documentation states which fields can be used for sorting. You specify sorting with the `sort` query string parameter. You can sort by multiple fields. You can set the sort direction by appending `:asc` or `:desc` to the field name. By default, ascending sorting is used.

**Example: Sorting**

```
https://api.hetzner.cloud/v1/actions?sort=status
https://api.hetzner.cloud/v1/actions?sort=status:asc
https://api.hetzner.cloud/v1/actions?sort=status:desc
https://api.hetzner.cloud/v1/actions?sort=status:asc&sort=command:desc
```

## Deprecation Notices

You can find all announced deprecations in our [Changelog](https://docs.hetzner.cloud).


The version of the OpenAPI document: 1.0.0


NOTE: This file is auto generated by Konfig (https://konfigthis.com).
*/

import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction, isBrowser } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { LoadBalancerActionsAddServiceRequest } from '../models';
// @ts-ignore
import { LoadBalancerActionsAddServiceResponse } from '../models';
// @ts-ignore
import { LoadBalancerActionsAddTargetRequest } from '../models';
// @ts-ignore
import { LoadBalancerActionsAddTargetRequestLabelSelector } from '../models';
// @ts-ignore
import { LoadBalancerActionsAddTargetRequestServer } from '../models';
// @ts-ignore
import { LoadBalancerActionsAddTargetResponse } from '../models';
// @ts-ignore
import { LoadBalancerActionsAttachToNetworkRequest } from '../models';
// @ts-ignore
import { LoadBalancerActionsAttachToNetworkResponse } from '../models';
// @ts-ignore
import { LoadBalancerActionsChangeAlgorithmRequest } from '../models';
// @ts-ignore
import { LoadBalancerActionsChangeAlgorithmResponse } from '../models';
// @ts-ignore
import { LoadBalancerActionsChangeDnsPtrRequest } from '../models';
// @ts-ignore
import { LoadBalancerActionsChangeDnsPtrResponse } from '../models';
// @ts-ignore
import { LoadBalancerActionsChangeProtectionRequest } from '../models';
// @ts-ignore
import { LoadBalancerActionsChangeProtectionResponse } from '../models';
// @ts-ignore
import { LoadBalancerActionsChangeTypeRequest } from '../models';
// @ts-ignore
import { LoadBalancerActionsChangeTypeResponse } from '../models';
// @ts-ignore
import { LoadBalancerActionsDeleteServiceRequest } from '../models';
// @ts-ignore
import { LoadBalancerActionsDeleteServiceResponse } from '../models';
// @ts-ignore
import { LoadBalancerActionsDetachFromNetworkRequest } from '../models';
// @ts-ignore
import { LoadBalancerActionsDetachFromNetworkResponse } from '../models';
// @ts-ignore
import { LoadBalancerActionsDisablePublicInterfaceResponse } from '../models';
// @ts-ignore
import { LoadBalancerActionsEnablePublicInterfaceResponse } from '../models';
// @ts-ignore
import { LoadBalancerActionsGetAllActions200Response } from '../models';
// @ts-ignore
import { LoadBalancerActionsGetAllActionsResponse } from '../models';
// @ts-ignore
import { LoadBalancerActionsGetSpecificAction200Response } from '../models';
// @ts-ignore
import { LoadBalancerActionsGetSpecificActionResponse } from '../models';
// @ts-ignore
import { LoadBalancerActionsRemoveTargetRequest } from '../models';
// @ts-ignore
import { LoadBalancerActionsRemoveTargetRequestLabelSelector } from '../models';
// @ts-ignore
import { LoadBalancerActionsRemoveTargetRequestServer } from '../models';
// @ts-ignore
import { LoadBalancerActionsRemoveTargetResponse } from '../models';
// @ts-ignore
import { LoadBalancerActionsUpdateServiceRequest } from '../models';
// @ts-ignore
import { LoadBalancerActionsUpdateServiceResponse } from '../models';
// @ts-ignore
import { LoadBalancerServiceHTTPProperty1 } from '../models';
// @ts-ignore
import { LoadBalancerServiceHTTPProperty2 } from '../models';
// @ts-ignore
import { LoadBalancerServiceHealthCheckProperty1 } from '../models';
// @ts-ignore
import { LoadBalancerTargetIPProperty1 } from '../models';
// @ts-ignore
import { LoadBalancerTargetIPProperty2 } from '../models';
// @ts-ignore
import { UpdateLoadBalancerServiceHealthCheckProperty } from '../models';
import { paginate } from "../pagination/paginate";
import type * as buffer from "buffer"
import { requestBeforeHook } from '../requestBeforeHook';
/**
 * LoadBalancerActionsApi - axios parameter creator
 * @export
 */
export const LoadBalancerActionsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Adds a service to a Load Balancer.  #### Call specific error codes  | Code                       | Description                                             | |----------------------------|---------------------------------------------------------| | `source_port_already_used` | The source port you are trying to add is already in use | 
         * @summary Add Service
         * @param {number} id ID of the Load Balancer
         * @param {LoadBalancerActionsAddServiceRequest} [loadBalancerActionsAddServiceRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addService: async (id: number, loadBalancerActionsAddServiceRequest?: LoadBalancerActionsAddServiceRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('addService', 'id', id)
            const localVarPath = `/load_balancers/{id}/actions/add_service`
                .replace(`{${"id"}}`, encodeURIComponent(String(id !== undefined ? id : `-id-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = configuration && !isBrowser() ? { "User-Agent": configuration.userAgent } : {} as any;
            const localVarQueryParameter = {} as any;

            // authentication APIToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

    
            localVarHeaderParameter['Content-Type'] = 'application/json';


            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                requestBody: loadBalancerActionsAddServiceRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/load_balancers/{id}/actions/add_service',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(loadBalancerActionsAddServiceRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Adds a target to a Load Balancer.  #### Call specific error codes  | Code                                    | Description                                                                                           | |-----------------------------------------|-------------------------------------------------------------------------------------------------------| | `cloud_resource_ip_not_allowed`         | The IP you are trying to add as a target belongs to a Hetzner Cloud resource                          | | `ip_not_owned`                          | The IP you are trying to add as a target is not owned by the Project owner                            | | `load_balancer_not_attached_to_network` | The Load Balancer is not attached to a network                                                        | | `robot_unavailable`                     | Robot was not available. The caller may retry the operation after a short delay.                      | | `server_not_attached_to_network`        | The server you are trying to add as a target is not attached to the same network as the Load Balancer | | `target_already_defined`                | The Load Balancer target you are trying to define is already defined                                  | 
         * @summary Add Target
         * @param {number} id ID of the Load Balancer
         * @param {LoadBalancerActionsAddTargetRequest} [loadBalancerActionsAddTargetRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addTarget: async (id: number, loadBalancerActionsAddTargetRequest?: LoadBalancerActionsAddTargetRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('addTarget', 'id', id)
            const localVarPath = `/load_balancers/{id}/actions/add_target`
                .replace(`{${"id"}}`, encodeURIComponent(String(id !== undefined ? id : `-id-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = configuration && !isBrowser() ? { "User-Agent": configuration.userAgent } : {} as any;
            const localVarQueryParameter = {} as any;

            // authentication APIToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

    
            localVarHeaderParameter['Content-Type'] = 'application/json';


            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                requestBody: loadBalancerActionsAddTargetRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/load_balancers/{id}/actions/add_target',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(loadBalancerActionsAddTargetRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Attach a Load Balancer to a Network.  **Call specific error codes**  | Code                             | Description                                                           | |----------------------------------|-----------------------------------------------------------------------| | `load_balancer_already_attached` | The Load Balancer is already attached to a network                    | | `ip_not_available`               | The provided Network IP is not available                              | | `no_subnet_available`            | No Subnet or IP is available for the Load Balancer within the network | 
         * @summary Attach a Load Balancer to a Network
         * @param {number} id ID of the Load Balancer
         * @param {LoadBalancerActionsAttachToNetworkRequest} [loadBalancerActionsAttachToNetworkRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        attachToNetwork: async (id: number, loadBalancerActionsAttachToNetworkRequest?: LoadBalancerActionsAttachToNetworkRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('attachToNetwork', 'id', id)
            const localVarPath = `/load_balancers/{id}/actions/attach_to_network`
                .replace(`{${"id"}}`, encodeURIComponent(String(id !== undefined ? id : `-id-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = configuration && !isBrowser() ? { "User-Agent": configuration.userAgent } : {} as any;
            const localVarQueryParameter = {} as any;

            // authentication APIToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

    
            localVarHeaderParameter['Content-Type'] = 'application/json';


            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                requestBody: loadBalancerActionsAttachToNetworkRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/load_balancers/{id}/actions/attach_to_network',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(loadBalancerActionsAttachToNetworkRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Change the algorithm that determines to which target new requests are sent.
         * @summary Change Algorithm
         * @param {number} id ID of the Load Balancer
         * @param {LoadBalancerActionsChangeAlgorithmRequest} [loadBalancerActionsChangeAlgorithmRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeAlgorithm: async (id: number, loadBalancerActionsChangeAlgorithmRequest?: LoadBalancerActionsChangeAlgorithmRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('changeAlgorithm', 'id', id)
            const localVarPath = `/load_balancers/{id}/actions/change_algorithm`
                .replace(`{${"id"}}`, encodeURIComponent(String(id !== undefined ? id : `-id-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = configuration && !isBrowser() ? { "User-Agent": configuration.userAgent } : {} as any;
            const localVarQueryParameter = {} as any;

            // authentication APIToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

    
            localVarHeaderParameter['Content-Type'] = 'application/json';


            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                requestBody: loadBalancerActionsChangeAlgorithmRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/load_balancers/{id}/actions/change_algorithm',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(loadBalancerActionsChangeAlgorithmRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Changes the hostname that will appear when getting the hostname belonging to the public IPs (IPv4 and IPv6) of this Load Balancer.  Floating IPs assigned to the Server are not affected by this. 
         * @summary Change reverse DNS entry for this Load Balancer
         * @param {number} id ID of the Load Balancer
         * @param {LoadBalancerActionsChangeDnsPtrRequest} [loadBalancerActionsChangeDnsPtrRequest] Select the IP address for which to change the DNS entry by passing &#x60;ip&#x60;. It can be either IPv4 or IPv6. The target hostname is set by passing &#x60;dns_ptr&#x60;.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeDnsPtr: async (id: number, loadBalancerActionsChangeDnsPtrRequest?: LoadBalancerActionsChangeDnsPtrRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('changeDnsPtr', 'id', id)
            const localVarPath = `/load_balancers/{id}/actions/change_dns_ptr`
                .replace(`{${"id"}}`, encodeURIComponent(String(id !== undefined ? id : `-id-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = configuration && !isBrowser() ? { "User-Agent": configuration.userAgent } : {} as any;
            const localVarQueryParameter = {} as any;

            // authentication APIToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

    
            localVarHeaderParameter['Content-Type'] = 'application/json';


            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                requestBody: loadBalancerActionsChangeDnsPtrRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/load_balancers/{id}/actions/change_dns_ptr',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(loadBalancerActionsChangeDnsPtrRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Changes the protection configuration of a Load Balancer.
         * @summary Change Load Balancer Protection
         * @param {number} id ID of the Load Balancer
         * @param {LoadBalancerActionsChangeProtectionRequest} [loadBalancerActionsChangeProtectionRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeProtection: async (id: number, loadBalancerActionsChangeProtectionRequest?: LoadBalancerActionsChangeProtectionRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('changeProtection', 'id', id)
            const localVarPath = `/load_balancers/{id}/actions/change_protection`
                .replace(`{${"id"}}`, encodeURIComponent(String(id !== undefined ? id : `-id-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = configuration && !isBrowser() ? { "User-Agent": configuration.userAgent } : {} as any;
            const localVarQueryParameter = {} as any;

            // authentication APIToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

    
            localVarHeaderParameter['Content-Type'] = 'application/json';


            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                requestBody: loadBalancerActionsChangeProtectionRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/load_balancers/{id}/actions/change_protection',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(loadBalancerActionsChangeProtectionRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Changes the type (Max Services, Max Targets and Max Connections) of a Load Balancer.  **Call specific error codes**  | Code                         | Description                                                     | |------------------------------|-----------------------------------------------------------------| | `invalid_load_balancer_type` | The Load Balancer type does not fit for the given Load Balancer | 
         * @summary Change the Type of a Load Balancer
         * @param {number} id ID of the Load Balancer
         * @param {LoadBalancerActionsChangeTypeRequest} [loadBalancerActionsChangeTypeRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeType: async (id: number, loadBalancerActionsChangeTypeRequest?: LoadBalancerActionsChangeTypeRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('changeType', 'id', id)
            const localVarPath = `/load_balancers/{id}/actions/change_type`
                .replace(`{${"id"}}`, encodeURIComponent(String(id !== undefined ? id : `-id-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = configuration && !isBrowser() ? { "User-Agent": configuration.userAgent } : {} as any;
            const localVarQueryParameter = {} as any;

            // authentication APIToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

    
            localVarHeaderParameter['Content-Type'] = 'application/json';


            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                requestBody: loadBalancerActionsChangeTypeRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/load_balancers/{id}/actions/change_type',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(loadBalancerActionsChangeTypeRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Delete a service of a Load Balancer.
         * @summary Delete Service
         * @param {number} id ID of the Load Balancer
         * @param {LoadBalancerActionsDeleteServiceRequest} [loadBalancerActionsDeleteServiceRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteService: async (id: number, loadBalancerActionsDeleteServiceRequest?: LoadBalancerActionsDeleteServiceRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('deleteService', 'id', id)
            const localVarPath = `/load_balancers/{id}/actions/delete_service`
                .replace(`{${"id"}}`, encodeURIComponent(String(id !== undefined ? id : `-id-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = configuration && !isBrowser() ? { "User-Agent": configuration.userAgent } : {} as any;
            const localVarQueryParameter = {} as any;

            // authentication APIToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

    
            localVarHeaderParameter['Content-Type'] = 'application/json';


            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                requestBody: loadBalancerActionsDeleteServiceRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/load_balancers/{id}/actions/delete_service',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(loadBalancerActionsDeleteServiceRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Detaches a Load Balancer from a network.
         * @summary Detach a Load Balancer from a Network
         * @param {number} id ID of the Load Balancer
         * @param {LoadBalancerActionsDetachFromNetworkRequest} [loadBalancerActionsDetachFromNetworkRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        detachFromNetwork: async (id: number, loadBalancerActionsDetachFromNetworkRequest?: LoadBalancerActionsDetachFromNetworkRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('detachFromNetwork', 'id', id)
            const localVarPath = `/load_balancers/{id}/actions/detach_from_network`
                .replace(`{${"id"}}`, encodeURIComponent(String(id !== undefined ? id : `-id-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = configuration && !isBrowser() ? { "User-Agent": configuration.userAgent } : {} as any;
            const localVarQueryParameter = {} as any;

            // authentication APIToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

    
            localVarHeaderParameter['Content-Type'] = 'application/json';


            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                requestBody: loadBalancerActionsDetachFromNetworkRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/load_balancers/{id}/actions/detach_from_network',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(loadBalancerActionsDetachFromNetworkRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Disable the public interface of a Load Balancer. The Load Balancer will be not accessible from the internet via its public IPs.  #### Call specific error codes  | Code                                      | Description                                                                    | |-------------------------------------------|--------------------------------------------------------------------------------| | `load_balancer_not_attached_to_network`   |  The Load Balancer is not attached to a network                                | | `targets_without_use_private_ip`          | The Load Balancer has targets that use the public IP instead of the private IP | 
         * @summary Disable the public interface of a Load Balancer
         * @param {number} id ID of the Load Balancer
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        disablePublicInterface: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('disablePublicInterface', 'id', id)
            const localVarPath = `/load_balancers/{id}/actions/disable_public_interface`
                .replace(`{${"id"}}`, encodeURIComponent(String(id !== undefined ? id : `-id-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = configuration && !isBrowser() ? { "User-Agent": configuration.userAgent } : {} as any;
            const localVarQueryParameter = {} as any;

            // authentication APIToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

    
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/load_balancers/{id}/actions/disable_public_interface',
                httpMethod: 'POST'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Enable the public interface of a Load Balancer. The Load Balancer will be accessible from the internet via its public IPs.
         * @summary Enable the public interface of a Load Balancer
         * @param {number} id ID of the Load Balancer
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        enablePublicInterface: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('enablePublicInterface', 'id', id)
            const localVarPath = `/load_balancers/{id}/actions/enable_public_interface`
                .replace(`{${"id"}}`, encodeURIComponent(String(id !== undefined ? id : `-id-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = configuration && !isBrowser() ? { "User-Agent": configuration.userAgent } : {} as any;
            const localVarQueryParameter = {} as any;

            // authentication APIToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

    
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/load_balancers/{id}/actions/enable_public_interface',
                httpMethod: 'POST'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns all Action objects. You can `sort` the results by using the sort URI parameter, and filter them with the `status` and `id` parameter.
         * @summary Get all Actions
         * @param {number} [id] Filter the actions by ID. Can be used multiple times. The response will only contain actions matching the specified IDs. 
         * @param {'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'} [sort] Sort actions by field and direction. Can be used multiple times. For more information, see \&quot;[Sorting](https://docs.hetzner.cloud)\&quot;. 
         * @param {'running' | 'success' | 'error'} [status] Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 
         * @param {number} [page] Page number to return. For more information, see \&quot;[Pagination](https://docs.hetzner.cloud)\&quot;.
         * @param {number} [perPage] Maximum number of entries returned per page. For more information, see \&quot;[Pagination](https://docs.hetzner.cloud)\&quot;.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllActions: async (id?: number, sort?: 'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc', status?: 'running' | 'success' | 'error', page?: number, perPage?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/load_balancers/actions`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = configuration && !isBrowser() ? { "User-Agent": configuration.userAgent } : {} as any;
            const localVarQueryParameter = {} as any;

            // authentication APIToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)
            if (id !== undefined) {
                localVarQueryParameter['id'] = id;
            }

            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
            }

            if (status !== undefined) {
                localVarQueryParameter['status'] = status;
            }

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }

            if (perPage !== undefined) {
                localVarQueryParameter['per_page'] = perPage;
            }


    
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/load_balancers/actions',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns all Action objects for a Load Balancer. You can sort the results by using the `sort` URI parameter, and filter them with the `status` parameter.
         * @summary Get all Actions for a Load Balancer
         * @param {number} id ID of the Load Balancer
         * @param {'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'} [sort] Sort actions by field and direction. Can be used multiple times. For more information, see \&quot;[Sorting](https://docs.hetzner.cloud)\&quot;. 
         * @param {'running' | 'success' | 'error'} [status] Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 
         * @param {number} [page] Page number to return. For more information, see \&quot;[Pagination](https://docs.hetzner.cloud)\&quot;.
         * @param {number} [perPage] Maximum number of entries returned per page. For more information, see \&quot;[Pagination](https://docs.hetzner.cloud)\&quot;.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllActions_1: async (id: number, sort?: 'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc', status?: 'running' | 'success' | 'error', page?: number, perPage?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getAllActions_1', 'id', id)
            const localVarPath = `/load_balancers/{id}/actions`
                .replace(`{${"id"}}`, encodeURIComponent(String(id !== undefined ? id : `-id-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = configuration && !isBrowser() ? { "User-Agent": configuration.userAgent } : {} as any;
            const localVarQueryParameter = {} as any;

            // authentication APIToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)
            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
            }

            if (status !== undefined) {
                localVarQueryParameter['status'] = status;
            }

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }

            if (perPage !== undefined) {
                localVarQueryParameter['per_page'] = perPage;
            }


    
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/load_balancers/{id}/actions',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns a specific Action object.
         * @summary Get an Action
         * @param {number} id ID of the Action.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSpecificAction: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getSpecificAction', 'id', id)
            const localVarPath = `/load_balancers/actions/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id !== undefined ? id : `-id-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = configuration && !isBrowser() ? { "User-Agent": configuration.userAgent } : {} as any;
            const localVarQueryParameter = {} as any;

            // authentication APIToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

    
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/load_balancers/actions/{id}',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns a specific Action for a Load Balancer.
         * @summary Get an Action for a Load Balancer
         * @param {number} id ID of the Load Balancer
         * @param {number} actionId ID of the Action
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSpecificAction_2: async (id: number, actionId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getSpecificAction_2', 'id', id)
            // verify required parameter 'actionId' is not null or undefined
            assertParamExists('getSpecificAction_2', 'actionId', actionId)
            const localVarPath = `/load_balancers/{id}/actions/{action_id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id !== undefined ? id : `-id-`)))
                .replace(`{${"action_id"}}`, encodeURIComponent(String(actionId !== undefined ? actionId : `-action_id-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = configuration && !isBrowser() ? { "User-Agent": configuration.userAgent } : {} as any;
            const localVarQueryParameter = {} as any;

            // authentication APIToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

    
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/load_balancers/{id}/actions/{action_id}',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Removes a target from a Load Balancer.
         * @summary Remove Target
         * @param {number} id ID of the Load Balancer
         * @param {LoadBalancerActionsRemoveTargetRequest} [loadBalancerActionsRemoveTargetRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeTarget: async (id: number, loadBalancerActionsRemoveTargetRequest?: LoadBalancerActionsRemoveTargetRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('removeTarget', 'id', id)
            const localVarPath = `/load_balancers/{id}/actions/remove_target`
                .replace(`{${"id"}}`, encodeURIComponent(String(id !== undefined ? id : `-id-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = configuration && !isBrowser() ? { "User-Agent": configuration.userAgent } : {} as any;
            const localVarQueryParameter = {} as any;

            // authentication APIToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

    
            localVarHeaderParameter['Content-Type'] = 'application/json';


            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                requestBody: loadBalancerActionsRemoveTargetRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/load_balancers/{id}/actions/remove_target',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(loadBalancerActionsRemoveTargetRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Updates a Load Balancer Service.  #### Call specific error codes  | Code                       | Description                                             | |----------------------------|---------------------------------------------------------| | `source_port_already_used` | The source port you are trying to add is already in use | 
         * @summary Update Service
         * @param {number} id ID of the Load Balancer
         * @param {LoadBalancerActionsUpdateServiceRequest} [loadBalancerActionsUpdateServiceRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateService: async (id: number, loadBalancerActionsUpdateServiceRequest?: LoadBalancerActionsUpdateServiceRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('updateService', 'id', id)
            const localVarPath = `/load_balancers/{id}/actions/update_service`
                .replace(`{${"id"}}`, encodeURIComponent(String(id !== undefined ? id : `-id-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = configuration && !isBrowser() ? { "User-Agent": configuration.userAgent } : {} as any;
            const localVarQueryParameter = {} as any;

            // authentication APIToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

    
            localVarHeaderParameter['Content-Type'] = 'application/json';


            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                requestBody: loadBalancerActionsUpdateServiceRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/load_balancers/{id}/actions/update_service',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(loadBalancerActionsUpdateServiceRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * LoadBalancerActionsApi - functional programming interface
 * @export
 */
export const LoadBalancerActionsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = LoadBalancerActionsApiAxiosParamCreator(configuration)
    return {
        /**
         * Adds a service to a Load Balancer.  #### Call specific error codes  | Code                       | Description                                             | |----------------------------|---------------------------------------------------------| | `source_port_already_used` | The source port you are trying to add is already in use | 
         * @summary Add Service
         * @param {LoadBalancerActionsApiAddServiceRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addService(requestParameters: LoadBalancerActionsApiAddServiceRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoadBalancerActionsAddServiceResponse>> {
            const loadBalancerActionsAddServiceRequest: LoadBalancerActionsAddServiceRequest = {
                destination_port: requestParameters.destination_port,
                health_check: requestParameters.health_check,
                http: requestParameters.http,
                listen_port: requestParameters.listen_port,
                protocol: requestParameters.protocol,
                proxyprotocol: requestParameters.proxyprotocol
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.addService(requestParameters.id, loadBalancerActionsAddServiceRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Adds a target to a Load Balancer.  #### Call specific error codes  | Code                                    | Description                                                                                           | |-----------------------------------------|-------------------------------------------------------------------------------------------------------| | `cloud_resource_ip_not_allowed`         | The IP you are trying to add as a target belongs to a Hetzner Cloud resource                          | | `ip_not_owned`                          | The IP you are trying to add as a target is not owned by the Project owner                            | | `load_balancer_not_attached_to_network` | The Load Balancer is not attached to a network                                                        | | `robot_unavailable`                     | Robot was not available. The caller may retry the operation after a short delay.                      | | `server_not_attached_to_network`        | The server you are trying to add as a target is not attached to the same network as the Load Balancer | | `target_already_defined`                | The Load Balancer target you are trying to define is already defined                                  | 
         * @summary Add Target
         * @param {LoadBalancerActionsApiAddTargetRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addTarget(requestParameters: LoadBalancerActionsApiAddTargetRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoadBalancerActionsAddTargetResponse>> {
            const loadBalancerActionsAddTargetRequest: LoadBalancerActionsAddTargetRequest = {
                ip: requestParameters.ip,
                label_selector: requestParameters.label_selector,
                server: requestParameters.server,
                type: requestParameters.type,
                use_private_ip: requestParameters.use_private_ip
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.addTarget(requestParameters.id, loadBalancerActionsAddTargetRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Attach a Load Balancer to a Network.  **Call specific error codes**  | Code                             | Description                                                           | |----------------------------------|-----------------------------------------------------------------------| | `load_balancer_already_attached` | The Load Balancer is already attached to a network                    | | `ip_not_available`               | The provided Network IP is not available                              | | `no_subnet_available`            | No Subnet or IP is available for the Load Balancer within the network | 
         * @summary Attach a Load Balancer to a Network
         * @param {LoadBalancerActionsApiAttachToNetworkRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async attachToNetwork(requestParameters: LoadBalancerActionsApiAttachToNetworkRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoadBalancerActionsAttachToNetworkResponse>> {
            const loadBalancerActionsAttachToNetworkRequest: LoadBalancerActionsAttachToNetworkRequest = {
                ip: requestParameters.ip,
                network: requestParameters.network
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.attachToNetwork(requestParameters.id, loadBalancerActionsAttachToNetworkRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Change the algorithm that determines to which target new requests are sent.
         * @summary Change Algorithm
         * @param {LoadBalancerActionsApiChangeAlgorithmRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async changeAlgorithm(requestParameters: LoadBalancerActionsApiChangeAlgorithmRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoadBalancerActionsChangeAlgorithmResponse>> {
            const loadBalancerActionsChangeAlgorithmRequest: LoadBalancerActionsChangeAlgorithmRequest = {
                type: requestParameters.type
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.changeAlgorithm(requestParameters.id, loadBalancerActionsChangeAlgorithmRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Changes the hostname that will appear when getting the hostname belonging to the public IPs (IPv4 and IPv6) of this Load Balancer.  Floating IPs assigned to the Server are not affected by this. 
         * @summary Change reverse DNS entry for this Load Balancer
         * @param {LoadBalancerActionsApiChangeDnsPtrRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async changeDnsPtr(requestParameters: LoadBalancerActionsApiChangeDnsPtrRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoadBalancerActionsChangeDnsPtrResponse>> {
            const loadBalancerActionsChangeDnsPtrRequest: LoadBalancerActionsChangeDnsPtrRequest = {
                dns_ptr: requestParameters.dns_ptr,
                ip: requestParameters.ip
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.changeDnsPtr(requestParameters.id, loadBalancerActionsChangeDnsPtrRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Changes the protection configuration of a Load Balancer.
         * @summary Change Load Balancer Protection
         * @param {LoadBalancerActionsApiChangeProtectionRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async changeProtection(requestParameters: LoadBalancerActionsApiChangeProtectionRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoadBalancerActionsChangeProtectionResponse>> {
            const loadBalancerActionsChangeProtectionRequest: LoadBalancerActionsChangeProtectionRequest = {
                delete: requestParameters.delete
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.changeProtection(requestParameters.id, loadBalancerActionsChangeProtectionRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Changes the type (Max Services, Max Targets and Max Connections) of a Load Balancer.  **Call specific error codes**  | Code                         | Description                                                     | |------------------------------|-----------------------------------------------------------------| | `invalid_load_balancer_type` | The Load Balancer type does not fit for the given Load Balancer | 
         * @summary Change the Type of a Load Balancer
         * @param {LoadBalancerActionsApiChangeTypeRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async changeType(requestParameters: LoadBalancerActionsApiChangeTypeRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoadBalancerActionsChangeTypeResponse>> {
            const loadBalancerActionsChangeTypeRequest: LoadBalancerActionsChangeTypeRequest = {
                load_balancer_type: requestParameters.load_balancer_type
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.changeType(requestParameters.id, loadBalancerActionsChangeTypeRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Delete a service of a Load Balancer.
         * @summary Delete Service
         * @param {LoadBalancerActionsApiDeleteServiceRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteService(requestParameters: LoadBalancerActionsApiDeleteServiceRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoadBalancerActionsDeleteServiceResponse>> {
            const loadBalancerActionsDeleteServiceRequest: LoadBalancerActionsDeleteServiceRequest = {
                listen_port: requestParameters.listen_port
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteService(requestParameters.id, loadBalancerActionsDeleteServiceRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Detaches a Load Balancer from a network.
         * @summary Detach a Load Balancer from a Network
         * @param {LoadBalancerActionsApiDetachFromNetworkRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async detachFromNetwork(requestParameters: LoadBalancerActionsApiDetachFromNetworkRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoadBalancerActionsDetachFromNetworkResponse>> {
            const loadBalancerActionsDetachFromNetworkRequest: LoadBalancerActionsDetachFromNetworkRequest = {
                network: requestParameters.network
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.detachFromNetwork(requestParameters.id, loadBalancerActionsDetachFromNetworkRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Disable the public interface of a Load Balancer. The Load Balancer will be not accessible from the internet via its public IPs.  #### Call specific error codes  | Code                                      | Description                                                                    | |-------------------------------------------|--------------------------------------------------------------------------------| | `load_balancer_not_attached_to_network`   |  The Load Balancer is not attached to a network                                | | `targets_without_use_private_ip`          | The Load Balancer has targets that use the public IP instead of the private IP | 
         * @summary Disable the public interface of a Load Balancer
         * @param {LoadBalancerActionsApiDisablePublicInterfaceRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async disablePublicInterface(requestParameters: LoadBalancerActionsApiDisablePublicInterfaceRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoadBalancerActionsDisablePublicInterfaceResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.disablePublicInterface(requestParameters.id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Enable the public interface of a Load Balancer. The Load Balancer will be accessible from the internet via its public IPs.
         * @summary Enable the public interface of a Load Balancer
         * @param {LoadBalancerActionsApiEnablePublicInterfaceRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async enablePublicInterface(requestParameters: LoadBalancerActionsApiEnablePublicInterfaceRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoadBalancerActionsEnablePublicInterfaceResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.enablePublicInterface(requestParameters.id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns all Action objects. You can `sort` the results by using the sort URI parameter, and filter them with the `status` and `id` parameter.
         * @summary Get all Actions
         * @param {LoadBalancerActionsApiGetAllActionsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllActions(requestParameters: LoadBalancerActionsApiGetAllActionsRequest = {}, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoadBalancerActionsGetAllActionsResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllActions(requestParameters.id, requestParameters.sort, requestParameters.status, requestParameters.page, requestParameters.perPage, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns all Action objects for a Load Balancer. You can sort the results by using the `sort` URI parameter, and filter them with the `status` parameter.
         * @summary Get all Actions for a Load Balancer
         * @param {LoadBalancerActionsApiGetAllActions0Request} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllActions_1(requestParameters: LoadBalancerActionsApiGetAllActions0Request, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoadBalancerActionsGetAllActions200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllActions_1(requestParameters.id, requestParameters.sort, requestParameters.status, requestParameters.page, requestParameters.perPage, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns a specific Action object.
         * @summary Get an Action
         * @param {LoadBalancerActionsApiGetSpecificActionRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getSpecificAction(requestParameters: LoadBalancerActionsApiGetSpecificActionRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoadBalancerActionsGetSpecificActionResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getSpecificAction(requestParameters.id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns a specific Action for a Load Balancer.
         * @summary Get an Action for a Load Balancer
         * @param {LoadBalancerActionsApiGetSpecificAction0Request} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getSpecificAction_2(requestParameters: LoadBalancerActionsApiGetSpecificAction0Request, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoadBalancerActionsGetSpecificAction200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getSpecificAction_2(requestParameters.id, requestParameters.actionId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Removes a target from a Load Balancer.
         * @summary Remove Target
         * @param {LoadBalancerActionsApiRemoveTargetRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async removeTarget(requestParameters: LoadBalancerActionsApiRemoveTargetRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoadBalancerActionsRemoveTargetResponse>> {
            const loadBalancerActionsRemoveTargetRequest: LoadBalancerActionsRemoveTargetRequest = {
                ip: requestParameters.ip,
                label_selector: requestParameters.label_selector,
                server: requestParameters.server,
                type: requestParameters.type
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.removeTarget(requestParameters.id, loadBalancerActionsRemoveTargetRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Updates a Load Balancer Service.  #### Call specific error codes  | Code                       | Description                                             | |----------------------------|---------------------------------------------------------| | `source_port_already_used` | The source port you are trying to add is already in use | 
         * @summary Update Service
         * @param {LoadBalancerActionsApiUpdateServiceRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateService(requestParameters: LoadBalancerActionsApiUpdateServiceRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoadBalancerActionsUpdateServiceResponse>> {
            const loadBalancerActionsUpdateServiceRequest: LoadBalancerActionsUpdateServiceRequest = {
                destination_port: requestParameters.destination_port,
                health_check: requestParameters.health_check,
                http: requestParameters.http,
                listen_port: requestParameters.listen_port,
                protocol: requestParameters.protocol,
                proxyprotocol: requestParameters.proxyprotocol
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateService(requestParameters.id, loadBalancerActionsUpdateServiceRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * LoadBalancerActionsApi - factory interface
 * @export
 */
export const LoadBalancerActionsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = LoadBalancerActionsApiFp(configuration)
    return {
        /**
         * Adds a service to a Load Balancer.  #### Call specific error codes  | Code                       | Description                                             | |----------------------------|---------------------------------------------------------| | `source_port_already_used` | The source port you are trying to add is already in use | 
         * @summary Add Service
         * @param {LoadBalancerActionsApiAddServiceRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addService(requestParameters: LoadBalancerActionsApiAddServiceRequest, options?: AxiosRequestConfig): AxiosPromise<LoadBalancerActionsAddServiceResponse> {
            return localVarFp.addService(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Adds a target to a Load Balancer.  #### Call specific error codes  | Code                                    | Description                                                                                           | |-----------------------------------------|-------------------------------------------------------------------------------------------------------| | `cloud_resource_ip_not_allowed`         | The IP you are trying to add as a target belongs to a Hetzner Cloud resource                          | | `ip_not_owned`                          | The IP you are trying to add as a target is not owned by the Project owner                            | | `load_balancer_not_attached_to_network` | The Load Balancer is not attached to a network                                                        | | `robot_unavailable`                     | Robot was not available. The caller may retry the operation after a short delay.                      | | `server_not_attached_to_network`        | The server you are trying to add as a target is not attached to the same network as the Load Balancer | | `target_already_defined`                | The Load Balancer target you are trying to define is already defined                                  | 
         * @summary Add Target
         * @param {LoadBalancerActionsApiAddTargetRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addTarget(requestParameters: LoadBalancerActionsApiAddTargetRequest, options?: AxiosRequestConfig): AxiosPromise<LoadBalancerActionsAddTargetResponse> {
            return localVarFp.addTarget(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Attach a Load Balancer to a Network.  **Call specific error codes**  | Code                             | Description                                                           | |----------------------------------|-----------------------------------------------------------------------| | `load_balancer_already_attached` | The Load Balancer is already attached to a network                    | | `ip_not_available`               | The provided Network IP is not available                              | | `no_subnet_available`            | No Subnet or IP is available for the Load Balancer within the network | 
         * @summary Attach a Load Balancer to a Network
         * @param {LoadBalancerActionsApiAttachToNetworkRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        attachToNetwork(requestParameters: LoadBalancerActionsApiAttachToNetworkRequest, options?: AxiosRequestConfig): AxiosPromise<LoadBalancerActionsAttachToNetworkResponse> {
            return localVarFp.attachToNetwork(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Change the algorithm that determines to which target new requests are sent.
         * @summary Change Algorithm
         * @param {LoadBalancerActionsApiChangeAlgorithmRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeAlgorithm(requestParameters: LoadBalancerActionsApiChangeAlgorithmRequest, options?: AxiosRequestConfig): AxiosPromise<LoadBalancerActionsChangeAlgorithmResponse> {
            return localVarFp.changeAlgorithm(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Changes the hostname that will appear when getting the hostname belonging to the public IPs (IPv4 and IPv6) of this Load Balancer.  Floating IPs assigned to the Server are not affected by this. 
         * @summary Change reverse DNS entry for this Load Balancer
         * @param {LoadBalancerActionsApiChangeDnsPtrRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeDnsPtr(requestParameters: LoadBalancerActionsApiChangeDnsPtrRequest, options?: AxiosRequestConfig): AxiosPromise<LoadBalancerActionsChangeDnsPtrResponse> {
            return localVarFp.changeDnsPtr(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Changes the protection configuration of a Load Balancer.
         * @summary Change Load Balancer Protection
         * @param {LoadBalancerActionsApiChangeProtectionRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeProtection(requestParameters: LoadBalancerActionsApiChangeProtectionRequest, options?: AxiosRequestConfig): AxiosPromise<LoadBalancerActionsChangeProtectionResponse> {
            return localVarFp.changeProtection(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Changes the type (Max Services, Max Targets and Max Connections) of a Load Balancer.  **Call specific error codes**  | Code                         | Description                                                     | |------------------------------|-----------------------------------------------------------------| | `invalid_load_balancer_type` | The Load Balancer type does not fit for the given Load Balancer | 
         * @summary Change the Type of a Load Balancer
         * @param {LoadBalancerActionsApiChangeTypeRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeType(requestParameters: LoadBalancerActionsApiChangeTypeRequest, options?: AxiosRequestConfig): AxiosPromise<LoadBalancerActionsChangeTypeResponse> {
            return localVarFp.changeType(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete a service of a Load Balancer.
         * @summary Delete Service
         * @param {LoadBalancerActionsApiDeleteServiceRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteService(requestParameters: LoadBalancerActionsApiDeleteServiceRequest, options?: AxiosRequestConfig): AxiosPromise<LoadBalancerActionsDeleteServiceResponse> {
            return localVarFp.deleteService(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Detaches a Load Balancer from a network.
         * @summary Detach a Load Balancer from a Network
         * @param {LoadBalancerActionsApiDetachFromNetworkRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        detachFromNetwork(requestParameters: LoadBalancerActionsApiDetachFromNetworkRequest, options?: AxiosRequestConfig): AxiosPromise<LoadBalancerActionsDetachFromNetworkResponse> {
            return localVarFp.detachFromNetwork(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Disable the public interface of a Load Balancer. The Load Balancer will be not accessible from the internet via its public IPs.  #### Call specific error codes  | Code                                      | Description                                                                    | |-------------------------------------------|--------------------------------------------------------------------------------| | `load_balancer_not_attached_to_network`   |  The Load Balancer is not attached to a network                                | | `targets_without_use_private_ip`          | The Load Balancer has targets that use the public IP instead of the private IP | 
         * @summary Disable the public interface of a Load Balancer
         * @param {LoadBalancerActionsApiDisablePublicInterfaceRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        disablePublicInterface(requestParameters: LoadBalancerActionsApiDisablePublicInterfaceRequest, options?: AxiosRequestConfig): AxiosPromise<LoadBalancerActionsDisablePublicInterfaceResponse> {
            return localVarFp.disablePublicInterface(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Enable the public interface of a Load Balancer. The Load Balancer will be accessible from the internet via its public IPs.
         * @summary Enable the public interface of a Load Balancer
         * @param {LoadBalancerActionsApiEnablePublicInterfaceRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        enablePublicInterface(requestParameters: LoadBalancerActionsApiEnablePublicInterfaceRequest, options?: AxiosRequestConfig): AxiosPromise<LoadBalancerActionsEnablePublicInterfaceResponse> {
            return localVarFp.enablePublicInterface(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns all Action objects. You can `sort` the results by using the sort URI parameter, and filter them with the `status` and `id` parameter.
         * @summary Get all Actions
         * @param {LoadBalancerActionsApiGetAllActionsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllActions(requestParameters: LoadBalancerActionsApiGetAllActionsRequest = {}, options?: AxiosRequestConfig): AxiosPromise<LoadBalancerActionsGetAllActionsResponse> {
            return localVarFp.getAllActions(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns all Action objects for a Load Balancer. You can sort the results by using the `sort` URI parameter, and filter them with the `status` parameter.
         * @summary Get all Actions for a Load Balancer
         * @param {LoadBalancerActionsApiGetAllActions0Request} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllActions_1(requestParameters: LoadBalancerActionsApiGetAllActions0Request, options?: AxiosRequestConfig): AxiosPromise<LoadBalancerActionsGetAllActions200Response> {
            return localVarFp.getAllActions_1(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a specific Action object.
         * @summary Get an Action
         * @param {LoadBalancerActionsApiGetSpecificActionRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSpecificAction(requestParameters: LoadBalancerActionsApiGetSpecificActionRequest, options?: AxiosRequestConfig): AxiosPromise<LoadBalancerActionsGetSpecificActionResponse> {
            return localVarFp.getSpecificAction(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a specific Action for a Load Balancer.
         * @summary Get an Action for a Load Balancer
         * @param {LoadBalancerActionsApiGetSpecificAction0Request} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSpecificAction_2(requestParameters: LoadBalancerActionsApiGetSpecificAction0Request, options?: AxiosRequestConfig): AxiosPromise<LoadBalancerActionsGetSpecificAction200Response> {
            return localVarFp.getSpecificAction_2(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Removes a target from a Load Balancer.
         * @summary Remove Target
         * @param {LoadBalancerActionsApiRemoveTargetRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeTarget(requestParameters: LoadBalancerActionsApiRemoveTargetRequest, options?: AxiosRequestConfig): AxiosPromise<LoadBalancerActionsRemoveTargetResponse> {
            return localVarFp.removeTarget(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Updates a Load Balancer Service.  #### Call specific error codes  | Code                       | Description                                             | |----------------------------|---------------------------------------------------------| | `source_port_already_used` | The source port you are trying to add is already in use | 
         * @summary Update Service
         * @param {LoadBalancerActionsApiUpdateServiceRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateService(requestParameters: LoadBalancerActionsApiUpdateServiceRequest, options?: AxiosRequestConfig): AxiosPromise<LoadBalancerActionsUpdateServiceResponse> {
            return localVarFp.updateService(requestParameters, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for addService operation in LoadBalancerActionsApi.
 * @export
 * @interface LoadBalancerActionsApiAddServiceRequest
 */
export type LoadBalancerActionsApiAddServiceRequest = {
    
    /**
    * ID of the Load Balancer
    * @type {number}
    * @memberof LoadBalancerActionsApiAddService
    */
    readonly id: number
    
} & LoadBalancerActionsAddServiceRequest

/**
 * Request parameters for addTarget operation in LoadBalancerActionsApi.
 * @export
 * @interface LoadBalancerActionsApiAddTargetRequest
 */
export type LoadBalancerActionsApiAddTargetRequest = {
    
    /**
    * ID of the Load Balancer
    * @type {number}
    * @memberof LoadBalancerActionsApiAddTarget
    */
    readonly id: number
    
} & LoadBalancerActionsAddTargetRequest

/**
 * Request parameters for attachToNetwork operation in LoadBalancerActionsApi.
 * @export
 * @interface LoadBalancerActionsApiAttachToNetworkRequest
 */
export type LoadBalancerActionsApiAttachToNetworkRequest = {
    
    /**
    * ID of the Load Balancer
    * @type {number}
    * @memberof LoadBalancerActionsApiAttachToNetwork
    */
    readonly id: number
    
} & LoadBalancerActionsAttachToNetworkRequest

/**
 * Request parameters for changeAlgorithm operation in LoadBalancerActionsApi.
 * @export
 * @interface LoadBalancerActionsApiChangeAlgorithmRequest
 */
export type LoadBalancerActionsApiChangeAlgorithmRequest = {
    
    /**
    * ID of the Load Balancer
    * @type {number}
    * @memberof LoadBalancerActionsApiChangeAlgorithm
    */
    readonly id: number
    
} & LoadBalancerActionsChangeAlgorithmRequest

/**
 * Request parameters for changeDnsPtr operation in LoadBalancerActionsApi.
 * @export
 * @interface LoadBalancerActionsApiChangeDnsPtrRequest
 */
export type LoadBalancerActionsApiChangeDnsPtrRequest = {
    
    /**
    * ID of the Load Balancer
    * @type {number}
    * @memberof LoadBalancerActionsApiChangeDnsPtr
    */
    readonly id: number
    
} & LoadBalancerActionsChangeDnsPtrRequest

/**
 * Request parameters for changeProtection operation in LoadBalancerActionsApi.
 * @export
 * @interface LoadBalancerActionsApiChangeProtectionRequest
 */
export type LoadBalancerActionsApiChangeProtectionRequest = {
    
    /**
    * ID of the Load Balancer
    * @type {number}
    * @memberof LoadBalancerActionsApiChangeProtection
    */
    readonly id: number
    
} & LoadBalancerActionsChangeProtectionRequest

/**
 * Request parameters for changeType operation in LoadBalancerActionsApi.
 * @export
 * @interface LoadBalancerActionsApiChangeTypeRequest
 */
export type LoadBalancerActionsApiChangeTypeRequest = {
    
    /**
    * ID of the Load Balancer
    * @type {number}
    * @memberof LoadBalancerActionsApiChangeType
    */
    readonly id: number
    
} & LoadBalancerActionsChangeTypeRequest

/**
 * Request parameters for deleteService operation in LoadBalancerActionsApi.
 * @export
 * @interface LoadBalancerActionsApiDeleteServiceRequest
 */
export type LoadBalancerActionsApiDeleteServiceRequest = {
    
    /**
    * ID of the Load Balancer
    * @type {number}
    * @memberof LoadBalancerActionsApiDeleteService
    */
    readonly id: number
    
} & LoadBalancerActionsDeleteServiceRequest

/**
 * Request parameters for detachFromNetwork operation in LoadBalancerActionsApi.
 * @export
 * @interface LoadBalancerActionsApiDetachFromNetworkRequest
 */
export type LoadBalancerActionsApiDetachFromNetworkRequest = {
    
    /**
    * ID of the Load Balancer
    * @type {number}
    * @memberof LoadBalancerActionsApiDetachFromNetwork
    */
    readonly id: number
    
} & LoadBalancerActionsDetachFromNetworkRequest

/**
 * Request parameters for disablePublicInterface operation in LoadBalancerActionsApi.
 * @export
 * @interface LoadBalancerActionsApiDisablePublicInterfaceRequest
 */
export type LoadBalancerActionsApiDisablePublicInterfaceRequest = {
    
    /**
    * ID of the Load Balancer
    * @type {number}
    * @memberof LoadBalancerActionsApiDisablePublicInterface
    */
    readonly id: number
    
}

/**
 * Request parameters for enablePublicInterface operation in LoadBalancerActionsApi.
 * @export
 * @interface LoadBalancerActionsApiEnablePublicInterfaceRequest
 */
export type LoadBalancerActionsApiEnablePublicInterfaceRequest = {
    
    /**
    * ID of the Load Balancer
    * @type {number}
    * @memberof LoadBalancerActionsApiEnablePublicInterface
    */
    readonly id: number
    
}

/**
 * Request parameters for getAllActions operation in LoadBalancerActionsApi.
 * @export
 * @interface LoadBalancerActionsApiGetAllActionsRequest
 */
export type LoadBalancerActionsApiGetAllActionsRequest = {
    
    /**
    * Filter the actions by ID. Can be used multiple times. The response will only contain actions matching the specified IDs. 
    * @type {number}
    * @memberof LoadBalancerActionsApiGetAllActions
    */
    readonly id?: number
    
    /**
    * Sort actions by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 
    * @type {'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'}
    * @memberof LoadBalancerActionsApiGetAllActions
    */
    readonly sort?: 'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'
    
    /**
    * Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 
    * @type {'running' | 'success' | 'error'}
    * @memberof LoadBalancerActionsApiGetAllActions
    */
    readonly status?: 'running' | 'success' | 'error'
    
    /**
    * Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".
    * @type {number}
    * @memberof LoadBalancerActionsApiGetAllActions
    */
    readonly page?: number
    
    /**
    * Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".
    * @type {number}
    * @memberof LoadBalancerActionsApiGetAllActions
    */
    readonly perPage?: number
    
}

/**
 * Request parameters for getAllActions_1 operation in LoadBalancerActionsApi.
 * @export
 * @interface LoadBalancerActionsApiGetAllActions0Request
 */
export type LoadBalancerActionsApiGetAllActions0Request = {
    
    /**
    * ID of the Load Balancer
    * @type {number}
    * @memberof LoadBalancerActionsApiGetAllActions0
    */
    readonly id: number
    
    /**
    * Sort actions by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 
    * @type {'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'}
    * @memberof LoadBalancerActionsApiGetAllActions0
    */
    readonly sort?: 'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'
    
    /**
    * Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 
    * @type {'running' | 'success' | 'error'}
    * @memberof LoadBalancerActionsApiGetAllActions0
    */
    readonly status?: 'running' | 'success' | 'error'
    
    /**
    * Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".
    * @type {number}
    * @memberof LoadBalancerActionsApiGetAllActions0
    */
    readonly page?: number
    
    /**
    * Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".
    * @type {number}
    * @memberof LoadBalancerActionsApiGetAllActions0
    */
    readonly perPage?: number
    
}

/**
 * Request parameters for getSpecificAction operation in LoadBalancerActionsApi.
 * @export
 * @interface LoadBalancerActionsApiGetSpecificActionRequest
 */
export type LoadBalancerActionsApiGetSpecificActionRequest = {
    
    /**
    * ID of the Action.
    * @type {number}
    * @memberof LoadBalancerActionsApiGetSpecificAction
    */
    readonly id: number
    
}

/**
 * Request parameters for getSpecificAction_2 operation in LoadBalancerActionsApi.
 * @export
 * @interface LoadBalancerActionsApiGetSpecificAction0Request
 */
export type LoadBalancerActionsApiGetSpecificAction0Request = {
    
    /**
    * ID of the Load Balancer
    * @type {number}
    * @memberof LoadBalancerActionsApiGetSpecificAction0
    */
    readonly id: number
    
    /**
    * ID of the Action
    * @type {number}
    * @memberof LoadBalancerActionsApiGetSpecificAction0
    */
    readonly actionId: number
    
}

/**
 * Request parameters for removeTarget operation in LoadBalancerActionsApi.
 * @export
 * @interface LoadBalancerActionsApiRemoveTargetRequest
 */
export type LoadBalancerActionsApiRemoveTargetRequest = {
    
    /**
    * ID of the Load Balancer
    * @type {number}
    * @memberof LoadBalancerActionsApiRemoveTarget
    */
    readonly id: number
    
} & LoadBalancerActionsRemoveTargetRequest

/**
 * Request parameters for updateService operation in LoadBalancerActionsApi.
 * @export
 * @interface LoadBalancerActionsApiUpdateServiceRequest
 */
export type LoadBalancerActionsApiUpdateServiceRequest = {
    
    /**
    * ID of the Load Balancer
    * @type {number}
    * @memberof LoadBalancerActionsApiUpdateService
    */
    readonly id: number
    
} & LoadBalancerActionsUpdateServiceRequest

/**
 * LoadBalancerActionsApiGenerated - object-oriented interface
 * @export
 * @class LoadBalancerActionsApiGenerated
 * @extends {BaseAPI}
 */
export class LoadBalancerActionsApiGenerated extends BaseAPI {
    /**
     * Adds a service to a Load Balancer.  #### Call specific error codes  | Code                       | Description                                             | |----------------------------|---------------------------------------------------------| | `source_port_already_used` | The source port you are trying to add is already in use | 
     * @summary Add Service
     * @param {LoadBalancerActionsApiAddServiceRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancerActionsApiGenerated
     */
    public addService(requestParameters: LoadBalancerActionsApiAddServiceRequest, options?: AxiosRequestConfig) {
        return LoadBalancerActionsApiFp(this.configuration).addService(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Adds a target to a Load Balancer.  #### Call specific error codes  | Code                                    | Description                                                                                           | |-----------------------------------------|-------------------------------------------------------------------------------------------------------| | `cloud_resource_ip_not_allowed`         | The IP you are trying to add as a target belongs to a Hetzner Cloud resource                          | | `ip_not_owned`                          | The IP you are trying to add as a target is not owned by the Project owner                            | | `load_balancer_not_attached_to_network` | The Load Balancer is not attached to a network                                                        | | `robot_unavailable`                     | Robot was not available. The caller may retry the operation after a short delay.                      | | `server_not_attached_to_network`        | The server you are trying to add as a target is not attached to the same network as the Load Balancer | | `target_already_defined`                | The Load Balancer target you are trying to define is already defined                                  | 
     * @summary Add Target
     * @param {LoadBalancerActionsApiAddTargetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancerActionsApiGenerated
     */
    public addTarget(requestParameters: LoadBalancerActionsApiAddTargetRequest, options?: AxiosRequestConfig) {
        return LoadBalancerActionsApiFp(this.configuration).addTarget(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Attach a Load Balancer to a Network.  **Call specific error codes**  | Code                             | Description                                                           | |----------------------------------|-----------------------------------------------------------------------| | `load_balancer_already_attached` | The Load Balancer is already attached to a network                    | | `ip_not_available`               | The provided Network IP is not available                              | | `no_subnet_available`            | No Subnet or IP is available for the Load Balancer within the network | 
     * @summary Attach a Load Balancer to a Network
     * @param {LoadBalancerActionsApiAttachToNetworkRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancerActionsApiGenerated
     */
    public attachToNetwork(requestParameters: LoadBalancerActionsApiAttachToNetworkRequest, options?: AxiosRequestConfig) {
        return LoadBalancerActionsApiFp(this.configuration).attachToNetwork(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Change the algorithm that determines to which target new requests are sent.
     * @summary Change Algorithm
     * @param {LoadBalancerActionsApiChangeAlgorithmRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancerActionsApiGenerated
     */
    public changeAlgorithm(requestParameters: LoadBalancerActionsApiChangeAlgorithmRequest, options?: AxiosRequestConfig) {
        return LoadBalancerActionsApiFp(this.configuration).changeAlgorithm(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Changes the hostname that will appear when getting the hostname belonging to the public IPs (IPv4 and IPv6) of this Load Balancer.  Floating IPs assigned to the Server are not affected by this. 
     * @summary Change reverse DNS entry for this Load Balancer
     * @param {LoadBalancerActionsApiChangeDnsPtrRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancerActionsApiGenerated
     */
    public changeDnsPtr(requestParameters: LoadBalancerActionsApiChangeDnsPtrRequest, options?: AxiosRequestConfig) {
        return LoadBalancerActionsApiFp(this.configuration).changeDnsPtr(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Changes the protection configuration of a Load Balancer.
     * @summary Change Load Balancer Protection
     * @param {LoadBalancerActionsApiChangeProtectionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancerActionsApiGenerated
     */
    public changeProtection(requestParameters: LoadBalancerActionsApiChangeProtectionRequest, options?: AxiosRequestConfig) {
        return LoadBalancerActionsApiFp(this.configuration).changeProtection(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Changes the type (Max Services, Max Targets and Max Connections) of a Load Balancer.  **Call specific error codes**  | Code                         | Description                                                     | |------------------------------|-----------------------------------------------------------------| | `invalid_load_balancer_type` | The Load Balancer type does not fit for the given Load Balancer | 
     * @summary Change the Type of a Load Balancer
     * @param {LoadBalancerActionsApiChangeTypeRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancerActionsApiGenerated
     */
    public changeType(requestParameters: LoadBalancerActionsApiChangeTypeRequest, options?: AxiosRequestConfig) {
        return LoadBalancerActionsApiFp(this.configuration).changeType(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Delete a service of a Load Balancer.
     * @summary Delete Service
     * @param {LoadBalancerActionsApiDeleteServiceRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancerActionsApiGenerated
     */
    public deleteService(requestParameters: LoadBalancerActionsApiDeleteServiceRequest, options?: AxiosRequestConfig) {
        return LoadBalancerActionsApiFp(this.configuration).deleteService(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Detaches a Load Balancer from a network.
     * @summary Detach a Load Balancer from a Network
     * @param {LoadBalancerActionsApiDetachFromNetworkRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancerActionsApiGenerated
     */
    public detachFromNetwork(requestParameters: LoadBalancerActionsApiDetachFromNetworkRequest, options?: AxiosRequestConfig) {
        return LoadBalancerActionsApiFp(this.configuration).detachFromNetwork(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Disable the public interface of a Load Balancer. The Load Balancer will be not accessible from the internet via its public IPs.  #### Call specific error codes  | Code                                      | Description                                                                    | |-------------------------------------------|--------------------------------------------------------------------------------| | `load_balancer_not_attached_to_network`   |  The Load Balancer is not attached to a network                                | | `targets_without_use_private_ip`          | The Load Balancer has targets that use the public IP instead of the private IP | 
     * @summary Disable the public interface of a Load Balancer
     * @param {LoadBalancerActionsApiDisablePublicInterfaceRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancerActionsApiGenerated
     */
    public disablePublicInterface(requestParameters: LoadBalancerActionsApiDisablePublicInterfaceRequest, options?: AxiosRequestConfig) {
        return LoadBalancerActionsApiFp(this.configuration).disablePublicInterface(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Enable the public interface of a Load Balancer. The Load Balancer will be accessible from the internet via its public IPs.
     * @summary Enable the public interface of a Load Balancer
     * @param {LoadBalancerActionsApiEnablePublicInterfaceRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancerActionsApiGenerated
     */
    public enablePublicInterface(requestParameters: LoadBalancerActionsApiEnablePublicInterfaceRequest, options?: AxiosRequestConfig) {
        return LoadBalancerActionsApiFp(this.configuration).enablePublicInterface(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns all Action objects. You can `sort` the results by using the sort URI parameter, and filter them with the `status` and `id` parameter.
     * @summary Get all Actions
     * @param {LoadBalancerActionsApiGetAllActionsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancerActionsApiGenerated
     */
    public getAllActions(requestParameters: LoadBalancerActionsApiGetAllActionsRequest = {}, options?: AxiosRequestConfig) {
        return LoadBalancerActionsApiFp(this.configuration).getAllActions(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns all Action objects for a Load Balancer. You can sort the results by using the `sort` URI parameter, and filter them with the `status` parameter.
     * @summary Get all Actions for a Load Balancer
     * @param {LoadBalancerActionsApiGetAllActions0Request} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancerActionsApiGenerated
     */
    public getAllActions_1(requestParameters: LoadBalancerActionsApiGetAllActions0Request, options?: AxiosRequestConfig) {
        return LoadBalancerActionsApiFp(this.configuration).getAllActions_1(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a specific Action object.
     * @summary Get an Action
     * @param {LoadBalancerActionsApiGetSpecificActionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancerActionsApiGenerated
     */
    public getSpecificAction(requestParameters: LoadBalancerActionsApiGetSpecificActionRequest, options?: AxiosRequestConfig) {
        return LoadBalancerActionsApiFp(this.configuration).getSpecificAction(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a specific Action for a Load Balancer.
     * @summary Get an Action for a Load Balancer
     * @param {LoadBalancerActionsApiGetSpecificAction0Request} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancerActionsApiGenerated
     */
    public getSpecificAction_2(requestParameters: LoadBalancerActionsApiGetSpecificAction0Request, options?: AxiosRequestConfig) {
        return LoadBalancerActionsApiFp(this.configuration).getSpecificAction_2(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Removes a target from a Load Balancer.
     * @summary Remove Target
     * @param {LoadBalancerActionsApiRemoveTargetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancerActionsApiGenerated
     */
    public removeTarget(requestParameters: LoadBalancerActionsApiRemoveTargetRequest, options?: AxiosRequestConfig) {
        return LoadBalancerActionsApiFp(this.configuration).removeTarget(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Updates a Load Balancer Service.  #### Call specific error codes  | Code                       | Description                                             | |----------------------------|---------------------------------------------------------| | `source_port_already_used` | The source port you are trying to add is already in use | 
     * @summary Update Service
     * @param {LoadBalancerActionsApiUpdateServiceRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancerActionsApiGenerated
     */
    public updateService(requestParameters: LoadBalancerActionsApiUpdateServiceRequest, options?: AxiosRequestConfig) {
        return LoadBalancerActionsApiFp(this.configuration).updateService(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }
}
