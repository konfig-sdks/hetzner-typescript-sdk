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
import { FloatingIpActionsAssignToServerRequest } from '../models';
// @ts-ignore
import { FloatingIpActionsAssignToServerResponse } from '../models';
// @ts-ignore
import { FloatingIpActionsChangeDnsPtrRequest } from '../models';
// @ts-ignore
import { FloatingIpActionsChangeDnsPtrResponse } from '../models';
// @ts-ignore
import { FloatingIpActionsChangeProtectionRequest } from '../models';
// @ts-ignore
import { FloatingIpActionsChangeProtectionResponse } from '../models';
// @ts-ignore
import { FloatingIpActionsGetActionById200Response } from '../models';
// @ts-ignore
import { FloatingIpActionsGetActionByIdResponse } from '../models';
// @ts-ignore
import { FloatingIpActionsGetAllActions200Response } from '../models';
// @ts-ignore
import { FloatingIpActionsGetAllActionsResponse } from '../models';
// @ts-ignore
import { FloatingIpActionsUnassignIpResponse } from '../models';
import { paginate } from "../pagination/paginate";
import type * as buffer from "buffer"
import { requestBeforeHook } from '../requestBeforeHook';
/**
 * FloatingIpActionsApi - axios parameter creator
 * @export
 */
export const FloatingIpActionsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Assigns a Floating IP to a Server.
         * @summary Assign a Floating IP to a Server
         * @param {number} id ID of the Floating IP
         * @param {FloatingIpActionsAssignToServerRequest} [floatingIpActionsAssignToServerRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        assignToServer: async (id: number, floatingIpActionsAssignToServerRequest?: FloatingIpActionsAssignToServerRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('assignToServer', 'id', id)
            const localVarPath = `/floating_ips/{id}/actions/assign`
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
                requestBody: floatingIpActionsAssignToServerRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/floating_ips/{id}/actions/assign',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(floatingIpActionsAssignToServerRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Changes the hostname that will appear when getting the hostname belonging to this Floating IP.
         * @summary Change reverse DNS entry for a Floating IP
         * @param {number} id ID of the Floating IP
         * @param {FloatingIpActionsChangeDnsPtrRequest} [floatingIpActionsChangeDnsPtrRequest] Select the IP address for which to change the DNS entry by passing &#x60;ip&#x60;. For a Floating IP of type &#x60;ipv4&#x60; this must exactly match the IP address of the Floating IP. For a Floating IP of type &#x60;ipv6&#x60; this must be a single IP within the IPv6 /64 range that belongs to this Floating IP. You can add up to 100 IPv6 reverse DNS entries.  The target hostname is set by passing &#x60;dns_ptr&#x60;. 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeDnsPtr: async (id: number, floatingIpActionsChangeDnsPtrRequest?: FloatingIpActionsChangeDnsPtrRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('changeDnsPtr', 'id', id)
            const localVarPath = `/floating_ips/{id}/actions/change_dns_ptr`
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
                requestBody: floatingIpActionsChangeDnsPtrRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/floating_ips/{id}/actions/change_dns_ptr',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(floatingIpActionsChangeDnsPtrRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Changes the protection configuration of the Floating IP.
         * @summary Change Floating IP Protection
         * @param {number} id ID of the Floating IP
         * @param {FloatingIpActionsChangeProtectionRequest} [floatingIpActionsChangeProtectionRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeProtection: async (id: number, floatingIpActionsChangeProtectionRequest?: FloatingIpActionsChangeProtectionRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('changeProtection', 'id', id)
            const localVarPath = `/floating_ips/{id}/actions/change_protection`
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
                requestBody: floatingIpActionsChangeProtectionRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/floating_ips/{id}/actions/change_protection',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(floatingIpActionsChangeProtectionRequest, localVarRequestOptions, configuration)

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
        getActionById: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getActionById', 'id', id)
            const localVarPath = `/floating_ips/actions/{id}`
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
                pathTemplate: '/floating_ips/actions/{id}',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns a specific Action object for a Floating IP.
         * @summary Get an Action for a Floating IP
         * @param {number} id ID of the Floating IP
         * @param {number} actionId ID of the Action
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getActionById_1: async (id: number, actionId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getActionById_1', 'id', id)
            // verify required parameter 'actionId' is not null or undefined
            assertParamExists('getActionById_1', 'actionId', actionId)
            const localVarPath = `/floating_ips/{id}/actions/{action_id}`
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
                pathTemplate: '/floating_ips/{id}/actions/{action_id}',
                httpMethod: 'GET'
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
            const localVarPath = `/floating_ips/actions`;
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
                pathTemplate: '/floating_ips/actions',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns all Action objects for a Floating IP. You can sort the results by using the `sort` URI parameter, and filter them with the `status` parameter.
         * @summary Get all Actions for a Floating IP
         * @param {number} id ID of the Floating IP
         * @param {'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'} [sort] Sort actions by field and direction. Can be used multiple times. For more information, see \&quot;[Sorting](https://docs.hetzner.cloud)\&quot;. 
         * @param {'running' | 'success' | 'error'} [status] Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 
         * @param {number} [page] Page number to return. For more information, see \&quot;[Pagination](https://docs.hetzner.cloud)\&quot;.
         * @param {number} [perPage] Maximum number of entries returned per page. For more information, see \&quot;[Pagination](https://docs.hetzner.cloud)\&quot;.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllActions_2: async (id: number, sort?: 'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc', status?: 'running' | 'success' | 'error', page?: number, perPage?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getAllActions_2', 'id', id)
            const localVarPath = `/floating_ips/{id}/actions`
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
                pathTemplate: '/floating_ips/{id}/actions',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Unassigns a Floating IP, resulting in it being unreachable. You may assign it to a Server again at a later time.
         * @summary Unassign a Floating IP
         * @param {number} id ID of the Floating IP
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        unassignIp: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('unassignIp', 'id', id)
            const localVarPath = `/floating_ips/{id}/actions/unassign`
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
                pathTemplate: '/floating_ips/{id}/actions/unassign',
                httpMethod: 'POST'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * FloatingIpActionsApi - functional programming interface
 * @export
 */
export const FloatingIpActionsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = FloatingIpActionsApiAxiosParamCreator(configuration)
    return {
        /**
         * Assigns a Floating IP to a Server.
         * @summary Assign a Floating IP to a Server
         * @param {FloatingIpActionsApiAssignToServerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async assignToServer(requestParameters: FloatingIpActionsApiAssignToServerRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FloatingIpActionsAssignToServerResponse>> {
            const floatingIpActionsAssignToServerRequest: FloatingIpActionsAssignToServerRequest = {
                server: requestParameters.server
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.assignToServer(requestParameters.id, floatingIpActionsAssignToServerRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Changes the hostname that will appear when getting the hostname belonging to this Floating IP.
         * @summary Change reverse DNS entry for a Floating IP
         * @param {FloatingIpActionsApiChangeDnsPtrRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async changeDnsPtr(requestParameters: FloatingIpActionsApiChangeDnsPtrRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FloatingIpActionsChangeDnsPtrResponse>> {
            const floatingIpActionsChangeDnsPtrRequest: FloatingIpActionsChangeDnsPtrRequest = {
                dns_ptr: requestParameters.dns_ptr,
                ip: requestParameters.ip
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.changeDnsPtr(requestParameters.id, floatingIpActionsChangeDnsPtrRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Changes the protection configuration of the Floating IP.
         * @summary Change Floating IP Protection
         * @param {FloatingIpActionsApiChangeProtectionRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async changeProtection(requestParameters: FloatingIpActionsApiChangeProtectionRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FloatingIpActionsChangeProtectionResponse>> {
            const floatingIpActionsChangeProtectionRequest: FloatingIpActionsChangeProtectionRequest = {
                delete: requestParameters.delete
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.changeProtection(requestParameters.id, floatingIpActionsChangeProtectionRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns a specific Action object.
         * @summary Get an Action
         * @param {FloatingIpActionsApiGetActionByIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getActionById(requestParameters: FloatingIpActionsApiGetActionByIdRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FloatingIpActionsGetActionByIdResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getActionById(requestParameters.id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns a specific Action object for a Floating IP.
         * @summary Get an Action for a Floating IP
         * @param {FloatingIpActionsApiGetActionById0Request} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getActionById_1(requestParameters: FloatingIpActionsApiGetActionById0Request, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FloatingIpActionsGetActionById200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getActionById_1(requestParameters.id, requestParameters.actionId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns all Action objects. You can `sort` the results by using the sort URI parameter, and filter them with the `status` and `id` parameter.
         * @summary Get all Actions
         * @param {FloatingIpActionsApiGetAllActionsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllActions(requestParameters: FloatingIpActionsApiGetAllActionsRequest = {}, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FloatingIpActionsGetAllActionsResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllActions(requestParameters.id, requestParameters.sort, requestParameters.status, requestParameters.page, requestParameters.perPage, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns all Action objects for a Floating IP. You can sort the results by using the `sort` URI parameter, and filter them with the `status` parameter.
         * @summary Get all Actions for a Floating IP
         * @param {FloatingIpActionsApiGetAllActions0Request} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllActions_2(requestParameters: FloatingIpActionsApiGetAllActions0Request, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FloatingIpActionsGetAllActions200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllActions_2(requestParameters.id, requestParameters.sort, requestParameters.status, requestParameters.page, requestParameters.perPage, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Unassigns a Floating IP, resulting in it being unreachable. You may assign it to a Server again at a later time.
         * @summary Unassign a Floating IP
         * @param {FloatingIpActionsApiUnassignIpRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async unassignIp(requestParameters: FloatingIpActionsApiUnassignIpRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FloatingIpActionsUnassignIpResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.unassignIp(requestParameters.id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * FloatingIpActionsApi - factory interface
 * @export
 */
export const FloatingIpActionsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = FloatingIpActionsApiFp(configuration)
    return {
        /**
         * Assigns a Floating IP to a Server.
         * @summary Assign a Floating IP to a Server
         * @param {FloatingIpActionsApiAssignToServerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        assignToServer(requestParameters: FloatingIpActionsApiAssignToServerRequest, options?: AxiosRequestConfig): AxiosPromise<FloatingIpActionsAssignToServerResponse> {
            return localVarFp.assignToServer(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Changes the hostname that will appear when getting the hostname belonging to this Floating IP.
         * @summary Change reverse DNS entry for a Floating IP
         * @param {FloatingIpActionsApiChangeDnsPtrRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeDnsPtr(requestParameters: FloatingIpActionsApiChangeDnsPtrRequest, options?: AxiosRequestConfig): AxiosPromise<FloatingIpActionsChangeDnsPtrResponse> {
            return localVarFp.changeDnsPtr(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Changes the protection configuration of the Floating IP.
         * @summary Change Floating IP Protection
         * @param {FloatingIpActionsApiChangeProtectionRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeProtection(requestParameters: FloatingIpActionsApiChangeProtectionRequest, options?: AxiosRequestConfig): AxiosPromise<FloatingIpActionsChangeProtectionResponse> {
            return localVarFp.changeProtection(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a specific Action object.
         * @summary Get an Action
         * @param {FloatingIpActionsApiGetActionByIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getActionById(requestParameters: FloatingIpActionsApiGetActionByIdRequest, options?: AxiosRequestConfig): AxiosPromise<FloatingIpActionsGetActionByIdResponse> {
            return localVarFp.getActionById(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a specific Action object for a Floating IP.
         * @summary Get an Action for a Floating IP
         * @param {FloatingIpActionsApiGetActionById0Request} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getActionById_1(requestParameters: FloatingIpActionsApiGetActionById0Request, options?: AxiosRequestConfig): AxiosPromise<FloatingIpActionsGetActionById200Response> {
            return localVarFp.getActionById_1(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns all Action objects. You can `sort` the results by using the sort URI parameter, and filter them with the `status` and `id` parameter.
         * @summary Get all Actions
         * @param {FloatingIpActionsApiGetAllActionsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllActions(requestParameters: FloatingIpActionsApiGetAllActionsRequest = {}, options?: AxiosRequestConfig): AxiosPromise<FloatingIpActionsGetAllActionsResponse> {
            return localVarFp.getAllActions(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns all Action objects for a Floating IP. You can sort the results by using the `sort` URI parameter, and filter them with the `status` parameter.
         * @summary Get all Actions for a Floating IP
         * @param {FloatingIpActionsApiGetAllActions0Request} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllActions_2(requestParameters: FloatingIpActionsApiGetAllActions0Request, options?: AxiosRequestConfig): AxiosPromise<FloatingIpActionsGetAllActions200Response> {
            return localVarFp.getAllActions_2(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Unassigns a Floating IP, resulting in it being unreachable. You may assign it to a Server again at a later time.
         * @summary Unassign a Floating IP
         * @param {FloatingIpActionsApiUnassignIpRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        unassignIp(requestParameters: FloatingIpActionsApiUnassignIpRequest, options?: AxiosRequestConfig): AxiosPromise<FloatingIpActionsUnassignIpResponse> {
            return localVarFp.unassignIp(requestParameters, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for assignToServer operation in FloatingIpActionsApi.
 * @export
 * @interface FloatingIpActionsApiAssignToServerRequest
 */
export type FloatingIpActionsApiAssignToServerRequest = {
    
    /**
    * ID of the Floating IP
    * @type {number}
    * @memberof FloatingIpActionsApiAssignToServer
    */
    readonly id: number
    
} & FloatingIpActionsAssignToServerRequest

/**
 * Request parameters for changeDnsPtr operation in FloatingIpActionsApi.
 * @export
 * @interface FloatingIpActionsApiChangeDnsPtrRequest
 */
export type FloatingIpActionsApiChangeDnsPtrRequest = {
    
    /**
    * ID of the Floating IP
    * @type {number}
    * @memberof FloatingIpActionsApiChangeDnsPtr
    */
    readonly id: number
    
} & FloatingIpActionsChangeDnsPtrRequest

/**
 * Request parameters for changeProtection operation in FloatingIpActionsApi.
 * @export
 * @interface FloatingIpActionsApiChangeProtectionRequest
 */
export type FloatingIpActionsApiChangeProtectionRequest = {
    
    /**
    * ID of the Floating IP
    * @type {number}
    * @memberof FloatingIpActionsApiChangeProtection
    */
    readonly id: number
    
} & FloatingIpActionsChangeProtectionRequest

/**
 * Request parameters for getActionById operation in FloatingIpActionsApi.
 * @export
 * @interface FloatingIpActionsApiGetActionByIdRequest
 */
export type FloatingIpActionsApiGetActionByIdRequest = {
    
    /**
    * ID of the Action.
    * @type {number}
    * @memberof FloatingIpActionsApiGetActionById
    */
    readonly id: number
    
}

/**
 * Request parameters for getActionById_1 operation in FloatingIpActionsApi.
 * @export
 * @interface FloatingIpActionsApiGetActionById0Request
 */
export type FloatingIpActionsApiGetActionById0Request = {
    
    /**
    * ID of the Floating IP
    * @type {number}
    * @memberof FloatingIpActionsApiGetActionById0
    */
    readonly id: number
    
    /**
    * ID of the Action
    * @type {number}
    * @memberof FloatingIpActionsApiGetActionById0
    */
    readonly actionId: number
    
}

/**
 * Request parameters for getAllActions operation in FloatingIpActionsApi.
 * @export
 * @interface FloatingIpActionsApiGetAllActionsRequest
 */
export type FloatingIpActionsApiGetAllActionsRequest = {
    
    /**
    * Filter the actions by ID. Can be used multiple times. The response will only contain actions matching the specified IDs. 
    * @type {number}
    * @memberof FloatingIpActionsApiGetAllActions
    */
    readonly id?: number
    
    /**
    * Sort actions by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 
    * @type {'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'}
    * @memberof FloatingIpActionsApiGetAllActions
    */
    readonly sort?: 'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'
    
    /**
    * Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 
    * @type {'running' | 'success' | 'error'}
    * @memberof FloatingIpActionsApiGetAllActions
    */
    readonly status?: 'running' | 'success' | 'error'
    
    /**
    * Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".
    * @type {number}
    * @memberof FloatingIpActionsApiGetAllActions
    */
    readonly page?: number
    
    /**
    * Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".
    * @type {number}
    * @memberof FloatingIpActionsApiGetAllActions
    */
    readonly perPage?: number
    
}

/**
 * Request parameters for getAllActions_2 operation in FloatingIpActionsApi.
 * @export
 * @interface FloatingIpActionsApiGetAllActions0Request
 */
export type FloatingIpActionsApiGetAllActions0Request = {
    
    /**
    * ID of the Floating IP
    * @type {number}
    * @memberof FloatingIpActionsApiGetAllActions0
    */
    readonly id: number
    
    /**
    * Sort actions by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 
    * @type {'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'}
    * @memberof FloatingIpActionsApiGetAllActions0
    */
    readonly sort?: 'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'
    
    /**
    * Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 
    * @type {'running' | 'success' | 'error'}
    * @memberof FloatingIpActionsApiGetAllActions0
    */
    readonly status?: 'running' | 'success' | 'error'
    
    /**
    * Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".
    * @type {number}
    * @memberof FloatingIpActionsApiGetAllActions0
    */
    readonly page?: number
    
    /**
    * Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".
    * @type {number}
    * @memberof FloatingIpActionsApiGetAllActions0
    */
    readonly perPage?: number
    
}

/**
 * Request parameters for unassignIp operation in FloatingIpActionsApi.
 * @export
 * @interface FloatingIpActionsApiUnassignIpRequest
 */
export type FloatingIpActionsApiUnassignIpRequest = {
    
    /**
    * ID of the Floating IP
    * @type {number}
    * @memberof FloatingIpActionsApiUnassignIp
    */
    readonly id: number
    
}

/**
 * FloatingIpActionsApiGenerated - object-oriented interface
 * @export
 * @class FloatingIpActionsApiGenerated
 * @extends {BaseAPI}
 */
export class FloatingIpActionsApiGenerated extends BaseAPI {
    /**
     * Assigns a Floating IP to a Server.
     * @summary Assign a Floating IP to a Server
     * @param {FloatingIpActionsApiAssignToServerRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FloatingIpActionsApiGenerated
     */
    public assignToServer(requestParameters: FloatingIpActionsApiAssignToServerRequest, options?: AxiosRequestConfig) {
        return FloatingIpActionsApiFp(this.configuration).assignToServer(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Changes the hostname that will appear when getting the hostname belonging to this Floating IP.
     * @summary Change reverse DNS entry for a Floating IP
     * @param {FloatingIpActionsApiChangeDnsPtrRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FloatingIpActionsApiGenerated
     */
    public changeDnsPtr(requestParameters: FloatingIpActionsApiChangeDnsPtrRequest, options?: AxiosRequestConfig) {
        return FloatingIpActionsApiFp(this.configuration).changeDnsPtr(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Changes the protection configuration of the Floating IP.
     * @summary Change Floating IP Protection
     * @param {FloatingIpActionsApiChangeProtectionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FloatingIpActionsApiGenerated
     */
    public changeProtection(requestParameters: FloatingIpActionsApiChangeProtectionRequest, options?: AxiosRequestConfig) {
        return FloatingIpActionsApiFp(this.configuration).changeProtection(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a specific Action object.
     * @summary Get an Action
     * @param {FloatingIpActionsApiGetActionByIdRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FloatingIpActionsApiGenerated
     */
    public getActionById(requestParameters: FloatingIpActionsApiGetActionByIdRequest, options?: AxiosRequestConfig) {
        return FloatingIpActionsApiFp(this.configuration).getActionById(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a specific Action object for a Floating IP.
     * @summary Get an Action for a Floating IP
     * @param {FloatingIpActionsApiGetActionById0Request} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FloatingIpActionsApiGenerated
     */
    public getActionById_1(requestParameters: FloatingIpActionsApiGetActionById0Request, options?: AxiosRequestConfig) {
        return FloatingIpActionsApiFp(this.configuration).getActionById_1(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns all Action objects. You can `sort` the results by using the sort URI parameter, and filter them with the `status` and `id` parameter.
     * @summary Get all Actions
     * @param {FloatingIpActionsApiGetAllActionsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FloatingIpActionsApiGenerated
     */
    public getAllActions(requestParameters: FloatingIpActionsApiGetAllActionsRequest = {}, options?: AxiosRequestConfig) {
        return FloatingIpActionsApiFp(this.configuration).getAllActions(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns all Action objects for a Floating IP. You can sort the results by using the `sort` URI parameter, and filter them with the `status` parameter.
     * @summary Get all Actions for a Floating IP
     * @param {FloatingIpActionsApiGetAllActions0Request} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FloatingIpActionsApiGenerated
     */
    public getAllActions_2(requestParameters: FloatingIpActionsApiGetAllActions0Request, options?: AxiosRequestConfig) {
        return FloatingIpActionsApiFp(this.configuration).getAllActions_2(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Unassigns a Floating IP, resulting in it being unreachable. You may assign it to a Server again at a later time.
     * @summary Unassign a Floating IP
     * @param {FloatingIpActionsApiUnassignIpRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FloatingIpActionsApiGenerated
     */
    public unassignIp(requestParameters: FloatingIpActionsApiUnassignIpRequest, options?: AxiosRequestConfig) {
        return FloatingIpActionsApiFp(this.configuration).unassignIp(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }
}
