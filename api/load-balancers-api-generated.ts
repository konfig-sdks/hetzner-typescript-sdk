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
import { LoadBalancerAlgorithmProperty } from '../models';
// @ts-ignore
import { LoadBalancerService } from '../models';
// @ts-ignore
import { LoadBalancerTarget } from '../models';
// @ts-ignore
import { LoadBalancersCreateLoadBalancerRequest } from '../models';
// @ts-ignore
import { LoadBalancersCreateLoadBalancerRequestLabels } from '../models';
// @ts-ignore
import { LoadBalancersCreateLoadBalancerResponse } from '../models';
// @ts-ignore
import { LoadBalancersGetAllResponse } from '../models';
// @ts-ignore
import { LoadBalancersGetByIdResponse } from '../models';
// @ts-ignore
import { LoadBalancersGetMetricsResponse } from '../models';
// @ts-ignore
import { LoadBalancersUpdateBalancerRequest } from '../models';
// @ts-ignore
import { LoadBalancersUpdateBalancerResponse } from '../models';
import { paginate } from "../pagination/paginate";
import type * as buffer from "buffer"
import { requestBeforeHook } from '../requestBeforeHook';
/**
 * LoadBalancersApi - axios parameter creator
 * @export
 */
export const LoadBalancersApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Creates a Load Balancer.  #### Call specific error codes  | Code                                    | Description                                                                                           | |-----------------------------------------|-------------------------------------------------------------------------------------------------------| | `cloud_resource_ip_not_allowed`         | The IP you are trying to add as a target belongs to a Hetzner Cloud resource                          | | `ip_not_owned`                          | The IP is not owned by the owner of the project of the Load Balancer                                  | | `load_balancer_not_attached_to_network` | The Load Balancer is not attached to a network                                                        | | `robot_unavailable`                     | Robot was not available. The caller may retry the operation after a short delay.                      | | `server_not_attached_to_network`        | The server you are trying to add as a target is not attached to the same network as the Load Balancer | | `source_port_already_used`              | The source port you are trying to add is already in use                                               | | `target_already_defined`                | The Load Balancer target you are trying to define is already defined                                  | 
         * @summary Create a Load Balancer
         * @param {LoadBalancersCreateLoadBalancerRequest} [loadBalancersCreateLoadBalancerRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createLoadBalancer: async (loadBalancersCreateLoadBalancerRequest?: LoadBalancersCreateLoadBalancerRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/load_balancers`;
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
                requestBody: loadBalancersCreateLoadBalancerRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/load_balancers',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(loadBalancersCreateLoadBalancerRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Deletes a Load Balancer.
         * @summary Delete a Load Balancer
         * @param {number} id ID of the Load Balancer
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteLoadBalancer: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('deleteLoadBalancer', 'id', id)
            const localVarPath = `/load_balancers/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id !== undefined ? id : `-id-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'DELETE', ...baseOptions, ...options};
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
                pathTemplate: '/load_balancers/{id}',
                httpMethod: 'DELETE'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Gets all existing Load Balancers that you have available.
         * @summary Get all Load Balancers
         * @param {'id' | 'id:asc' | 'id:desc' | 'name' | 'name:asc' | 'name:desc' | 'created' | 'created:asc' | 'created:desc'} [sort] Sort resources by field and direction. Can be used multiple times. For more information, see \&quot;[Sorting](https://docs.hetzner.cloud)\&quot;. 
         * @param {string} [name] Filter resources by their name. The response will only contain the resources matching the specified name. 
         * @param {string} [labelSelector] Filter resources by labels. The response will only contain resources matching the label selector. For more information, see \&quot;[Label Selector](https://docs.hetzner.cloud)\&quot;. 
         * @param {number} [page] Page number to return. For more information, see \&quot;[Pagination](https://docs.hetzner.cloud)\&quot;.
         * @param {number} [perPage] Maximum number of entries returned per page. For more information, see \&quot;[Pagination](https://docs.hetzner.cloud)\&quot;.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAll: async (sort?: 'id' | 'id:asc' | 'id:desc' | 'name' | 'name:asc' | 'name:desc' | 'created' | 'created:asc' | 'created:desc', name?: string, labelSelector?: string, page?: number, perPage?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/load_balancers`;
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

            if (name !== undefined) {
                localVarQueryParameter['name'] = name;
            }

            if (labelSelector !== undefined) {
                localVarQueryParameter['label_selector'] = labelSelector;
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
                pathTemplate: '/load_balancers',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Gets a specific Load Balancer object.
         * @summary Get a Load Balancer
         * @param {number} id ID of the Load Balancer
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getById: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getById', 'id', id)
            const localVarPath = `/load_balancers/{id}`
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
                pathTemplate: '/load_balancers/{id}',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * You must specify the type of metric to get: `open_connections`, `connections_per_second`, `requests_per_second` or `bandwidth`. You can also specify more than one type by comma separation, e.g. `requests_per_second,bandwidth`.  Depending on the type you will get different time series data:  |Type | Timeseries | Unit | Description | |---- |------------|------|-------------| | open_connections | open_connections | number | Open connections | | connections_per_second | connections_per_second | connections/s | Connections per second | | requests_per_second | requests_per_second | requests/s | Requests per second | | bandwidth | bandwidth.in | bytes/s | Ingress bandwidth | || bandwidth.out | bytes/s | Egress bandwidth |  Metrics are available for the last 30 days only.  If you do not provide the step argument we will automatically adjust it so that 200 samples are returned.  We limit the number of samples to a maximum of 500 and will adjust the step parameter accordingly. 
         * @summary Get Metrics for a LoadBalancer
         * @param {number} id ID of the Load Balancer
         * @param {'open_connections' | 'connections_per_second' | 'requests_per_second' | 'bandwidth'} type Type of metrics to get
         * @param {string} start Start of period to get Metrics for (in ISO-8601 format)
         * @param {string} end End of period to get Metrics for (in ISO-8601 format)
         * @param {string} [step] Resolution of results in seconds
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMetrics: async (id: number, type: 'open_connections' | 'connections_per_second' | 'requests_per_second' | 'bandwidth', start: string, end: string, step?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getMetrics', 'id', id)
            // verify required parameter 'type' is not null or undefined
            assertParamExists('getMetrics', 'type', type)
            // verify required parameter 'start' is not null or undefined
            assertParamExists('getMetrics', 'start', start)
            // verify required parameter 'end' is not null or undefined
            assertParamExists('getMetrics', 'end', end)
            const localVarPath = `/load_balancers/{id}/metrics`
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
            if (type !== undefined) {
                localVarQueryParameter['type'] = type;
            }

            if (start !== undefined) {
                localVarQueryParameter['start'] = start;
            }

            if (end !== undefined) {
                localVarQueryParameter['end'] = end;
            }

            if (step !== undefined) {
                localVarQueryParameter['step'] = step;
            }


    
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/load_balancers/{id}/metrics',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Updates a Load Balancer. You can update a Load Balancer’s name and a Load Balancer’s labels.  Note that when updating labels, the Load Balancer’s current set of labels will be replaced with the labels provided in the request body. So, for example, if you want to add a new label, you have to provide all existing labels plus the new label in the request body.  Note: if the Load Balancer object changes during the request, the response will be a “conflict” error. 
         * @summary Update a Load Balancer
         * @param {number} id ID of the Load Balancer
         * @param {LoadBalancersUpdateBalancerRequest} [loadBalancersUpdateBalancerRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateBalancer: async (id: number, loadBalancersUpdateBalancerRequest?: LoadBalancersUpdateBalancerRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('updateBalancer', 'id', id)
            const localVarPath = `/load_balancers/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id !== undefined ? id : `-id-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = configuration && !isBrowser() ? { "User-Agent": configuration.userAgent } : {} as any;
            const localVarQueryParameter = {} as any;

            // authentication APIToken required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

    
            localVarHeaderParameter['Content-Type'] = 'application/json';


            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                requestBody: loadBalancersUpdateBalancerRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/load_balancers/{id}',
                httpMethod: 'PUT'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(loadBalancersUpdateBalancerRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * LoadBalancersApi - functional programming interface
 * @export
 */
export const LoadBalancersApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = LoadBalancersApiAxiosParamCreator(configuration)
    return {
        /**
         * Creates a Load Balancer.  #### Call specific error codes  | Code                                    | Description                                                                                           | |-----------------------------------------|-------------------------------------------------------------------------------------------------------| | `cloud_resource_ip_not_allowed`         | The IP you are trying to add as a target belongs to a Hetzner Cloud resource                          | | `ip_not_owned`                          | The IP is not owned by the owner of the project of the Load Balancer                                  | | `load_balancer_not_attached_to_network` | The Load Balancer is not attached to a network                                                        | | `robot_unavailable`                     | Robot was not available. The caller may retry the operation after a short delay.                      | | `server_not_attached_to_network`        | The server you are trying to add as a target is not attached to the same network as the Load Balancer | | `source_port_already_used`              | The source port you are trying to add is already in use                                               | | `target_already_defined`                | The Load Balancer target you are trying to define is already defined                                  | 
         * @summary Create a Load Balancer
         * @param {LoadBalancersApiCreateLoadBalancerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createLoadBalancer(requestParameters: LoadBalancersApiCreateLoadBalancerRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoadBalancersCreateLoadBalancerResponse>> {
            const loadBalancersCreateLoadBalancerRequest: LoadBalancersCreateLoadBalancerRequest = {
                algorithm: requestParameters.algorithm,
                labels: requestParameters.labels,
                load_balancer_type: requestParameters.load_balancer_type,
                location: requestParameters.location,
                name: requestParameters.name,
                network: requestParameters.network,
                network_zone: requestParameters.network_zone,
                public_interface: requestParameters.public_interface,
                services: requestParameters.services,
                targets: requestParameters.targets
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.createLoadBalancer(loadBalancersCreateLoadBalancerRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Deletes a Load Balancer.
         * @summary Delete a Load Balancer
         * @param {LoadBalancersApiDeleteLoadBalancerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteLoadBalancer(requestParameters: LoadBalancersApiDeleteLoadBalancerRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteLoadBalancer(requestParameters.id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Gets all existing Load Balancers that you have available.
         * @summary Get all Load Balancers
         * @param {LoadBalancersApiGetAllRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAll(requestParameters: LoadBalancersApiGetAllRequest = {}, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoadBalancersGetAllResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAll(requestParameters.sort, requestParameters.name, requestParameters.labelSelector, requestParameters.page, requestParameters.perPage, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Gets a specific Load Balancer object.
         * @summary Get a Load Balancer
         * @param {LoadBalancersApiGetByIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getById(requestParameters: LoadBalancersApiGetByIdRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoadBalancersGetByIdResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getById(requestParameters.id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * You must specify the type of metric to get: `open_connections`, `connections_per_second`, `requests_per_second` or `bandwidth`. You can also specify more than one type by comma separation, e.g. `requests_per_second,bandwidth`.  Depending on the type you will get different time series data:  |Type | Timeseries | Unit | Description | |---- |------------|------|-------------| | open_connections | open_connections | number | Open connections | | connections_per_second | connections_per_second | connections/s | Connections per second | | requests_per_second | requests_per_second | requests/s | Requests per second | | bandwidth | bandwidth.in | bytes/s | Ingress bandwidth | || bandwidth.out | bytes/s | Egress bandwidth |  Metrics are available for the last 30 days only.  If you do not provide the step argument we will automatically adjust it so that 200 samples are returned.  We limit the number of samples to a maximum of 500 and will adjust the step parameter accordingly. 
         * @summary Get Metrics for a LoadBalancer
         * @param {LoadBalancersApiGetMetricsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getMetrics(requestParameters: LoadBalancersApiGetMetricsRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoadBalancersGetMetricsResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getMetrics(requestParameters.id, requestParameters.type, requestParameters.start, requestParameters.end, requestParameters.step, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Updates a Load Balancer. You can update a Load Balancer’s name and a Load Balancer’s labels.  Note that when updating labels, the Load Balancer’s current set of labels will be replaced with the labels provided in the request body. So, for example, if you want to add a new label, you have to provide all existing labels plus the new label in the request body.  Note: if the Load Balancer object changes during the request, the response will be a “conflict” error. 
         * @summary Update a Load Balancer
         * @param {LoadBalancersApiUpdateBalancerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateBalancer(requestParameters: LoadBalancersApiUpdateBalancerRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoadBalancersUpdateBalancerResponse>> {
            const loadBalancersUpdateBalancerRequest: LoadBalancersUpdateBalancerRequest = {
                labels: requestParameters.labels,
                name: requestParameters.name
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateBalancer(requestParameters.id, loadBalancersUpdateBalancerRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * LoadBalancersApi - factory interface
 * @export
 */
export const LoadBalancersApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = LoadBalancersApiFp(configuration)
    return {
        /**
         * Creates a Load Balancer.  #### Call specific error codes  | Code                                    | Description                                                                                           | |-----------------------------------------|-------------------------------------------------------------------------------------------------------| | `cloud_resource_ip_not_allowed`         | The IP you are trying to add as a target belongs to a Hetzner Cloud resource                          | | `ip_not_owned`                          | The IP is not owned by the owner of the project of the Load Balancer                                  | | `load_balancer_not_attached_to_network` | The Load Balancer is not attached to a network                                                        | | `robot_unavailable`                     | Robot was not available. The caller may retry the operation after a short delay.                      | | `server_not_attached_to_network`        | The server you are trying to add as a target is not attached to the same network as the Load Balancer | | `source_port_already_used`              | The source port you are trying to add is already in use                                               | | `target_already_defined`                | The Load Balancer target you are trying to define is already defined                                  | 
         * @summary Create a Load Balancer
         * @param {LoadBalancersApiCreateLoadBalancerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createLoadBalancer(requestParameters: LoadBalancersApiCreateLoadBalancerRequest, options?: AxiosRequestConfig): AxiosPromise<LoadBalancersCreateLoadBalancerResponse> {
            return localVarFp.createLoadBalancer(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Deletes a Load Balancer.
         * @summary Delete a Load Balancer
         * @param {LoadBalancersApiDeleteLoadBalancerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteLoadBalancer(requestParameters: LoadBalancersApiDeleteLoadBalancerRequest, options?: AxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.deleteLoadBalancer(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Gets all existing Load Balancers that you have available.
         * @summary Get all Load Balancers
         * @param {LoadBalancersApiGetAllRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAll(requestParameters: LoadBalancersApiGetAllRequest = {}, options?: AxiosRequestConfig): AxiosPromise<LoadBalancersGetAllResponse> {
            return localVarFp.getAll(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Gets a specific Load Balancer object.
         * @summary Get a Load Balancer
         * @param {LoadBalancersApiGetByIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getById(requestParameters: LoadBalancersApiGetByIdRequest, options?: AxiosRequestConfig): AxiosPromise<LoadBalancersGetByIdResponse> {
            return localVarFp.getById(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * You must specify the type of metric to get: `open_connections`, `connections_per_second`, `requests_per_second` or `bandwidth`. You can also specify more than one type by comma separation, e.g. `requests_per_second,bandwidth`.  Depending on the type you will get different time series data:  |Type | Timeseries | Unit | Description | |---- |------------|------|-------------| | open_connections | open_connections | number | Open connections | | connections_per_second | connections_per_second | connections/s | Connections per second | | requests_per_second | requests_per_second | requests/s | Requests per second | | bandwidth | bandwidth.in | bytes/s | Ingress bandwidth | || bandwidth.out | bytes/s | Egress bandwidth |  Metrics are available for the last 30 days only.  If you do not provide the step argument we will automatically adjust it so that 200 samples are returned.  We limit the number of samples to a maximum of 500 and will adjust the step parameter accordingly. 
         * @summary Get Metrics for a LoadBalancer
         * @param {LoadBalancersApiGetMetricsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMetrics(requestParameters: LoadBalancersApiGetMetricsRequest, options?: AxiosRequestConfig): AxiosPromise<LoadBalancersGetMetricsResponse> {
            return localVarFp.getMetrics(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Updates a Load Balancer. You can update a Load Balancer’s name and a Load Balancer’s labels.  Note that when updating labels, the Load Balancer’s current set of labels will be replaced with the labels provided in the request body. So, for example, if you want to add a new label, you have to provide all existing labels plus the new label in the request body.  Note: if the Load Balancer object changes during the request, the response will be a “conflict” error. 
         * @summary Update a Load Balancer
         * @param {LoadBalancersApiUpdateBalancerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateBalancer(requestParameters: LoadBalancersApiUpdateBalancerRequest, options?: AxiosRequestConfig): AxiosPromise<LoadBalancersUpdateBalancerResponse> {
            return localVarFp.updateBalancer(requestParameters, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for createLoadBalancer operation in LoadBalancersApi.
 * @export
 * @interface LoadBalancersApiCreateLoadBalancerRequest
 */
export type LoadBalancersApiCreateLoadBalancerRequest = {
    
} & LoadBalancersCreateLoadBalancerRequest

/**
 * Request parameters for deleteLoadBalancer operation in LoadBalancersApi.
 * @export
 * @interface LoadBalancersApiDeleteLoadBalancerRequest
 */
export type LoadBalancersApiDeleteLoadBalancerRequest = {
    
    /**
    * ID of the Load Balancer
    * @type {number}
    * @memberof LoadBalancersApiDeleteLoadBalancer
    */
    readonly id: number
    
}

/**
 * Request parameters for getAll operation in LoadBalancersApi.
 * @export
 * @interface LoadBalancersApiGetAllRequest
 */
export type LoadBalancersApiGetAllRequest = {
    
    /**
    * Sort resources by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 
    * @type {'id' | 'id:asc' | 'id:desc' | 'name' | 'name:asc' | 'name:desc' | 'created' | 'created:asc' | 'created:desc'}
    * @memberof LoadBalancersApiGetAll
    */
    readonly sort?: 'id' | 'id:asc' | 'id:desc' | 'name' | 'name:asc' | 'name:desc' | 'created' | 'created:asc' | 'created:desc'
    
    /**
    * Filter resources by their name. The response will only contain the resources matching the specified name. 
    * @type {string}
    * @memberof LoadBalancersApiGetAll
    */
    readonly name?: string
    
    /**
    * Filter resources by labels. The response will only contain resources matching the label selector. For more information, see \"[Label Selector](https://docs.hetzner.cloud)\". 
    * @type {string}
    * @memberof LoadBalancersApiGetAll
    */
    readonly labelSelector?: string
    
    /**
    * Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".
    * @type {number}
    * @memberof LoadBalancersApiGetAll
    */
    readonly page?: number
    
    /**
    * Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".
    * @type {number}
    * @memberof LoadBalancersApiGetAll
    */
    readonly perPage?: number
    
}

/**
 * Request parameters for getById operation in LoadBalancersApi.
 * @export
 * @interface LoadBalancersApiGetByIdRequest
 */
export type LoadBalancersApiGetByIdRequest = {
    
    /**
    * ID of the Load Balancer
    * @type {number}
    * @memberof LoadBalancersApiGetById
    */
    readonly id: number
    
}

/**
 * Request parameters for getMetrics operation in LoadBalancersApi.
 * @export
 * @interface LoadBalancersApiGetMetricsRequest
 */
export type LoadBalancersApiGetMetricsRequest = {
    
    /**
    * ID of the Load Balancer
    * @type {number}
    * @memberof LoadBalancersApiGetMetrics
    */
    readonly id: number
    
    /**
    * Type of metrics to get
    * @type {'open_connections' | 'connections_per_second' | 'requests_per_second' | 'bandwidth'}
    * @memberof LoadBalancersApiGetMetrics
    */
    readonly type: 'open_connections' | 'connections_per_second' | 'requests_per_second' | 'bandwidth'
    
    /**
    * Start of period to get Metrics for (in ISO-8601 format)
    * @type {string}
    * @memberof LoadBalancersApiGetMetrics
    */
    readonly start: string
    
    /**
    * End of period to get Metrics for (in ISO-8601 format)
    * @type {string}
    * @memberof LoadBalancersApiGetMetrics
    */
    readonly end: string
    
    /**
    * Resolution of results in seconds
    * @type {string}
    * @memberof LoadBalancersApiGetMetrics
    */
    readonly step?: string
    
}

/**
 * Request parameters for updateBalancer operation in LoadBalancersApi.
 * @export
 * @interface LoadBalancersApiUpdateBalancerRequest
 */
export type LoadBalancersApiUpdateBalancerRequest = {
    
    /**
    * ID of the Load Balancer
    * @type {number}
    * @memberof LoadBalancersApiUpdateBalancer
    */
    readonly id: number
    
} & LoadBalancersUpdateBalancerRequest

/**
 * LoadBalancersApiGenerated - object-oriented interface
 * @export
 * @class LoadBalancersApiGenerated
 * @extends {BaseAPI}
 */
export class LoadBalancersApiGenerated extends BaseAPI {
    /**
     * Creates a Load Balancer.  #### Call specific error codes  | Code                                    | Description                                                                                           | |-----------------------------------------|-------------------------------------------------------------------------------------------------------| | `cloud_resource_ip_not_allowed`         | The IP you are trying to add as a target belongs to a Hetzner Cloud resource                          | | `ip_not_owned`                          | The IP is not owned by the owner of the project of the Load Balancer                                  | | `load_balancer_not_attached_to_network` | The Load Balancer is not attached to a network                                                        | | `robot_unavailable`                     | Robot was not available. The caller may retry the operation after a short delay.                      | | `server_not_attached_to_network`        | The server you are trying to add as a target is not attached to the same network as the Load Balancer | | `source_port_already_used`              | The source port you are trying to add is already in use                                               | | `target_already_defined`                | The Load Balancer target you are trying to define is already defined                                  | 
     * @summary Create a Load Balancer
     * @param {LoadBalancersApiCreateLoadBalancerRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancersApiGenerated
     */
    public createLoadBalancer(requestParameters: LoadBalancersApiCreateLoadBalancerRequest, options?: AxiosRequestConfig) {
        return LoadBalancersApiFp(this.configuration).createLoadBalancer(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Deletes a Load Balancer.
     * @summary Delete a Load Balancer
     * @param {LoadBalancersApiDeleteLoadBalancerRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancersApiGenerated
     */
    public deleteLoadBalancer(requestParameters: LoadBalancersApiDeleteLoadBalancerRequest, options?: AxiosRequestConfig) {
        return LoadBalancersApiFp(this.configuration).deleteLoadBalancer(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Gets all existing Load Balancers that you have available.
     * @summary Get all Load Balancers
     * @param {LoadBalancersApiGetAllRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancersApiGenerated
     */
    public getAll(requestParameters: LoadBalancersApiGetAllRequest = {}, options?: AxiosRequestConfig) {
        return LoadBalancersApiFp(this.configuration).getAll(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Gets a specific Load Balancer object.
     * @summary Get a Load Balancer
     * @param {LoadBalancersApiGetByIdRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancersApiGenerated
     */
    public getById(requestParameters: LoadBalancersApiGetByIdRequest, options?: AxiosRequestConfig) {
        return LoadBalancersApiFp(this.configuration).getById(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * You must specify the type of metric to get: `open_connections`, `connections_per_second`, `requests_per_second` or `bandwidth`. You can also specify more than one type by comma separation, e.g. `requests_per_second,bandwidth`.  Depending on the type you will get different time series data:  |Type | Timeseries | Unit | Description | |---- |------------|------|-------------| | open_connections | open_connections | number | Open connections | | connections_per_second | connections_per_second | connections/s | Connections per second | | requests_per_second | requests_per_second | requests/s | Requests per second | | bandwidth | bandwidth.in | bytes/s | Ingress bandwidth | || bandwidth.out | bytes/s | Egress bandwidth |  Metrics are available for the last 30 days only.  If you do not provide the step argument we will automatically adjust it so that 200 samples are returned.  We limit the number of samples to a maximum of 500 and will adjust the step parameter accordingly. 
     * @summary Get Metrics for a LoadBalancer
     * @param {LoadBalancersApiGetMetricsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancersApiGenerated
     */
    public getMetrics(requestParameters: LoadBalancersApiGetMetricsRequest, options?: AxiosRequestConfig) {
        return LoadBalancersApiFp(this.configuration).getMetrics(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Updates a Load Balancer. You can update a Load Balancer’s name and a Load Balancer’s labels.  Note that when updating labels, the Load Balancer’s current set of labels will be replaced with the labels provided in the request body. So, for example, if you want to add a new label, you have to provide all existing labels plus the new label in the request body.  Note: if the Load Balancer object changes during the request, the response will be a “conflict” error. 
     * @summary Update a Load Balancer
     * @param {LoadBalancersApiUpdateBalancerRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoadBalancersApiGenerated
     */
    public updateBalancer(requestParameters: LoadBalancersApiUpdateBalancerRequest, options?: AxiosRequestConfig) {
        return LoadBalancersApiFp(this.configuration).updateBalancer(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }
}
