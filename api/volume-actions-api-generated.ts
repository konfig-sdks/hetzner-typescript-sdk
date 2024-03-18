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
import { VolumeActionsAttachVolumeToServerRequest } from '../models';
// @ts-ignore
import { VolumeActionsAttachVolumeToServerResponse } from '../models';
// @ts-ignore
import { VolumeActionsChangeProtectionVolumeRequest } from '../models';
// @ts-ignore
import { VolumeActionsChangeProtectionVolumeResponse } from '../models';
// @ts-ignore
import { VolumeActionsChangeSizeRequest } from '../models';
// @ts-ignore
import { VolumeActionsChangeSizeResponse } from '../models';
// @ts-ignore
import { VolumeActionsDetachVolumeFromServerResponse } from '../models';
// @ts-ignore
import { VolumeActionsGetActionByIdResponse } from '../models';
// @ts-ignore
import { VolumeActionsGetActionResponse } from '../models';
// @ts-ignore
import { VolumeActionsGetAllActions200Response } from '../models';
// @ts-ignore
import { VolumeActionsGetAllActionsResponse } from '../models';
import { paginate } from "../pagination/paginate";
import type * as buffer from "buffer"
import { requestBeforeHook } from '../requestBeforeHook';
/**
 * VolumeActionsApi - axios parameter creator
 * @export
 */
export const VolumeActionsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Attaches a Volume to a Server. Works only if the Server is in the same Location as the Volume.
         * @summary Attach Volume to a Server
         * @param {number} id ID of the Volume
         * @param {VolumeActionsAttachVolumeToServerRequest} [volumeActionsAttachVolumeToServerRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        attachVolumeToServer: async (id: number, volumeActionsAttachVolumeToServerRequest?: VolumeActionsAttachVolumeToServerRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('attachVolumeToServer', 'id', id)
            const localVarPath = `/volumes/{id}/actions/attach`
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
                requestBody: volumeActionsAttachVolumeToServerRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/volumes/{id}/actions/attach',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(volumeActionsAttachVolumeToServerRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Changes the protection configuration of a Volume.
         * @summary Change Volume Protection
         * @param {number} id ID of the Volume
         * @param {VolumeActionsChangeProtectionVolumeRequest} [volumeActionsChangeProtectionVolumeRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeProtectionVolume: async (id: number, volumeActionsChangeProtectionVolumeRequest?: VolumeActionsChangeProtectionVolumeRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('changeProtectionVolume', 'id', id)
            const localVarPath = `/volumes/{id}/actions/change_protection`
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
                requestBody: volumeActionsChangeProtectionVolumeRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/volumes/{id}/actions/change_protection',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(volumeActionsChangeProtectionVolumeRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Changes the size of a Volume. Note that downsizing a Volume is not possible.
         * @summary Resize Volume
         * @param {number} id ID of the Volume
         * @param {VolumeActionsChangeSizeRequest} [volumeActionsChangeSizeRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeSize: async (id: number, volumeActionsChangeSizeRequest?: VolumeActionsChangeSizeRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('changeSize', 'id', id)
            const localVarPath = `/volumes/{id}/actions/resize`
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
                requestBody: volumeActionsChangeSizeRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/volumes/{id}/actions/resize',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(volumeActionsChangeSizeRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Detaches a Volume from the Server it’s attached to. You may attach it to a Server again at a later time.
         * @summary Detach Volume
         * @param {number} id ID of the Volume
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        detachVolumeFromServer: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('detachVolumeFromServer', 'id', id)
            const localVarPath = `/volumes/{id}/actions/detach`
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
                pathTemplate: '/volumes/{id}/actions/detach',
                httpMethod: 'POST'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns a specific Action for a Volume.
         * @summary Get an Action for a Volume
         * @param {number} id ID of the Volume
         * @param {number} actionId ID of the Action
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAction: async (id: number, actionId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getAction', 'id', id)
            // verify required parameter 'actionId' is not null or undefined
            assertParamExists('getAction', 'actionId', actionId)
            const localVarPath = `/volumes/{id}/actions/{action_id}`
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
                pathTemplate: '/volumes/{id}/actions/{action_id}',
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
        getActionById: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getActionById', 'id', id)
            const localVarPath = `/volumes/actions/{id}`
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
                pathTemplate: '/volumes/actions/{id}',
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
            const localVarPath = `/volumes/actions`;
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
                pathTemplate: '/volumes/actions',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns all Action objects for a Volume. You can `sort` the results by using the sort URI parameter, and filter them with the `status` parameter.
         * @summary Get all Actions for a Volume
         * @param {number} id ID of the Volume
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
            const localVarPath = `/volumes/{id}/actions`
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
                pathTemplate: '/volumes/{id}/actions',
                httpMethod: 'GET'
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
 * VolumeActionsApi - functional programming interface
 * @export
 */
export const VolumeActionsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = VolumeActionsApiAxiosParamCreator(configuration)
    return {
        /**
         * Attaches a Volume to a Server. Works only if the Server is in the same Location as the Volume.
         * @summary Attach Volume to a Server
         * @param {VolumeActionsApiAttachVolumeToServerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async attachVolumeToServer(requestParameters: VolumeActionsApiAttachVolumeToServerRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<VolumeActionsAttachVolumeToServerResponse>> {
            const volumeActionsAttachVolumeToServerRequest: VolumeActionsAttachVolumeToServerRequest = {
                automount: requestParameters.automount,
                server: requestParameters.server
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.attachVolumeToServer(requestParameters.id, volumeActionsAttachVolumeToServerRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Changes the protection configuration of a Volume.
         * @summary Change Volume Protection
         * @param {VolumeActionsApiChangeProtectionVolumeRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async changeProtectionVolume(requestParameters: VolumeActionsApiChangeProtectionVolumeRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<VolumeActionsChangeProtectionVolumeResponse>> {
            const volumeActionsChangeProtectionVolumeRequest: VolumeActionsChangeProtectionVolumeRequest = {
                delete: requestParameters.delete
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.changeProtectionVolume(requestParameters.id, volumeActionsChangeProtectionVolumeRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Changes the size of a Volume. Note that downsizing a Volume is not possible.
         * @summary Resize Volume
         * @param {VolumeActionsApiChangeSizeRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async changeSize(requestParameters: VolumeActionsApiChangeSizeRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<VolumeActionsChangeSizeResponse>> {
            const volumeActionsChangeSizeRequest: VolumeActionsChangeSizeRequest = {
                size: requestParameters.size
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.changeSize(requestParameters.id, volumeActionsChangeSizeRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Detaches a Volume from the Server it’s attached to. You may attach it to a Server again at a later time.
         * @summary Detach Volume
         * @param {VolumeActionsApiDetachVolumeFromServerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async detachVolumeFromServer(requestParameters: VolumeActionsApiDetachVolumeFromServerRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<VolumeActionsDetachVolumeFromServerResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.detachVolumeFromServer(requestParameters.id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns a specific Action for a Volume.
         * @summary Get an Action for a Volume
         * @param {VolumeActionsApiGetActionRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAction(requestParameters: VolumeActionsApiGetActionRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<VolumeActionsGetActionResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAction(requestParameters.id, requestParameters.actionId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns a specific Action object.
         * @summary Get an Action
         * @param {VolumeActionsApiGetActionByIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getActionById(requestParameters: VolumeActionsApiGetActionByIdRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<VolumeActionsGetActionByIdResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getActionById(requestParameters.id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns all Action objects. You can `sort` the results by using the sort URI parameter, and filter them with the `status` and `id` parameter.
         * @summary Get all Actions
         * @param {VolumeActionsApiGetAllActionsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllActions(requestParameters: VolumeActionsApiGetAllActionsRequest = {}, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<VolumeActionsGetAllActionsResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllActions(requestParameters.id, requestParameters.sort, requestParameters.status, requestParameters.page, requestParameters.perPage, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns all Action objects for a Volume. You can `sort` the results by using the sort URI parameter, and filter them with the `status` parameter.
         * @summary Get all Actions for a Volume
         * @param {VolumeActionsApiGetAllActions0Request} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllActions_1(requestParameters: VolumeActionsApiGetAllActions0Request, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<VolumeActionsGetAllActions200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllActions_1(requestParameters.id, requestParameters.sort, requestParameters.status, requestParameters.page, requestParameters.perPage, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * VolumeActionsApi - factory interface
 * @export
 */
export const VolumeActionsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = VolumeActionsApiFp(configuration)
    return {
        /**
         * Attaches a Volume to a Server. Works only if the Server is in the same Location as the Volume.
         * @summary Attach Volume to a Server
         * @param {VolumeActionsApiAttachVolumeToServerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        attachVolumeToServer(requestParameters: VolumeActionsApiAttachVolumeToServerRequest, options?: AxiosRequestConfig): AxiosPromise<VolumeActionsAttachVolumeToServerResponse> {
            return localVarFp.attachVolumeToServer(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Changes the protection configuration of a Volume.
         * @summary Change Volume Protection
         * @param {VolumeActionsApiChangeProtectionVolumeRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeProtectionVolume(requestParameters: VolumeActionsApiChangeProtectionVolumeRequest, options?: AxiosRequestConfig): AxiosPromise<VolumeActionsChangeProtectionVolumeResponse> {
            return localVarFp.changeProtectionVolume(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Changes the size of a Volume. Note that downsizing a Volume is not possible.
         * @summary Resize Volume
         * @param {VolumeActionsApiChangeSizeRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeSize(requestParameters: VolumeActionsApiChangeSizeRequest, options?: AxiosRequestConfig): AxiosPromise<VolumeActionsChangeSizeResponse> {
            return localVarFp.changeSize(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Detaches a Volume from the Server it’s attached to. You may attach it to a Server again at a later time.
         * @summary Detach Volume
         * @param {VolumeActionsApiDetachVolumeFromServerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        detachVolumeFromServer(requestParameters: VolumeActionsApiDetachVolumeFromServerRequest, options?: AxiosRequestConfig): AxiosPromise<VolumeActionsDetachVolumeFromServerResponse> {
            return localVarFp.detachVolumeFromServer(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a specific Action for a Volume.
         * @summary Get an Action for a Volume
         * @param {VolumeActionsApiGetActionRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAction(requestParameters: VolumeActionsApiGetActionRequest, options?: AxiosRequestConfig): AxiosPromise<VolumeActionsGetActionResponse> {
            return localVarFp.getAction(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a specific Action object.
         * @summary Get an Action
         * @param {VolumeActionsApiGetActionByIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getActionById(requestParameters: VolumeActionsApiGetActionByIdRequest, options?: AxiosRequestConfig): AxiosPromise<VolumeActionsGetActionByIdResponse> {
            return localVarFp.getActionById(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns all Action objects. You can `sort` the results by using the sort URI parameter, and filter them with the `status` and `id` parameter.
         * @summary Get all Actions
         * @param {VolumeActionsApiGetAllActionsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllActions(requestParameters: VolumeActionsApiGetAllActionsRequest = {}, options?: AxiosRequestConfig): AxiosPromise<VolumeActionsGetAllActionsResponse> {
            return localVarFp.getAllActions(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns all Action objects for a Volume. You can `sort` the results by using the sort URI parameter, and filter them with the `status` parameter.
         * @summary Get all Actions for a Volume
         * @param {VolumeActionsApiGetAllActions0Request} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllActions_1(requestParameters: VolumeActionsApiGetAllActions0Request, options?: AxiosRequestConfig): AxiosPromise<VolumeActionsGetAllActions200Response> {
            return localVarFp.getAllActions_1(requestParameters, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for attachVolumeToServer operation in VolumeActionsApi.
 * @export
 * @interface VolumeActionsApiAttachVolumeToServerRequest
 */
export type VolumeActionsApiAttachVolumeToServerRequest = {
    
    /**
    * ID of the Volume
    * @type {number}
    * @memberof VolumeActionsApiAttachVolumeToServer
    */
    readonly id: number
    
} & VolumeActionsAttachVolumeToServerRequest

/**
 * Request parameters for changeProtectionVolume operation in VolumeActionsApi.
 * @export
 * @interface VolumeActionsApiChangeProtectionVolumeRequest
 */
export type VolumeActionsApiChangeProtectionVolumeRequest = {
    
    /**
    * ID of the Volume
    * @type {number}
    * @memberof VolumeActionsApiChangeProtectionVolume
    */
    readonly id: number
    
} & VolumeActionsChangeProtectionVolumeRequest

/**
 * Request parameters for changeSize operation in VolumeActionsApi.
 * @export
 * @interface VolumeActionsApiChangeSizeRequest
 */
export type VolumeActionsApiChangeSizeRequest = {
    
    /**
    * ID of the Volume
    * @type {number}
    * @memberof VolumeActionsApiChangeSize
    */
    readonly id: number
    
} & VolumeActionsChangeSizeRequest

/**
 * Request parameters for detachVolumeFromServer operation in VolumeActionsApi.
 * @export
 * @interface VolumeActionsApiDetachVolumeFromServerRequest
 */
export type VolumeActionsApiDetachVolumeFromServerRequest = {
    
    /**
    * ID of the Volume
    * @type {number}
    * @memberof VolumeActionsApiDetachVolumeFromServer
    */
    readonly id: number
    
}

/**
 * Request parameters for getAction operation in VolumeActionsApi.
 * @export
 * @interface VolumeActionsApiGetActionRequest
 */
export type VolumeActionsApiGetActionRequest = {
    
    /**
    * ID of the Volume
    * @type {number}
    * @memberof VolumeActionsApiGetAction
    */
    readonly id: number
    
    /**
    * ID of the Action
    * @type {number}
    * @memberof VolumeActionsApiGetAction
    */
    readonly actionId: number
    
}

/**
 * Request parameters for getActionById operation in VolumeActionsApi.
 * @export
 * @interface VolumeActionsApiGetActionByIdRequest
 */
export type VolumeActionsApiGetActionByIdRequest = {
    
    /**
    * ID of the Action.
    * @type {number}
    * @memberof VolumeActionsApiGetActionById
    */
    readonly id: number
    
}

/**
 * Request parameters for getAllActions operation in VolumeActionsApi.
 * @export
 * @interface VolumeActionsApiGetAllActionsRequest
 */
export type VolumeActionsApiGetAllActionsRequest = {
    
    /**
    * Filter the actions by ID. Can be used multiple times. The response will only contain actions matching the specified IDs. 
    * @type {number}
    * @memberof VolumeActionsApiGetAllActions
    */
    readonly id?: number
    
    /**
    * Sort actions by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 
    * @type {'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'}
    * @memberof VolumeActionsApiGetAllActions
    */
    readonly sort?: 'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'
    
    /**
    * Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 
    * @type {'running' | 'success' | 'error'}
    * @memberof VolumeActionsApiGetAllActions
    */
    readonly status?: 'running' | 'success' | 'error'
    
    /**
    * Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".
    * @type {number}
    * @memberof VolumeActionsApiGetAllActions
    */
    readonly page?: number
    
    /**
    * Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".
    * @type {number}
    * @memberof VolumeActionsApiGetAllActions
    */
    readonly perPage?: number
    
}

/**
 * Request parameters for getAllActions_1 operation in VolumeActionsApi.
 * @export
 * @interface VolumeActionsApiGetAllActions0Request
 */
export type VolumeActionsApiGetAllActions0Request = {
    
    /**
    * ID of the Volume
    * @type {number}
    * @memberof VolumeActionsApiGetAllActions0
    */
    readonly id: number
    
    /**
    * Sort actions by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 
    * @type {'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'}
    * @memberof VolumeActionsApiGetAllActions0
    */
    readonly sort?: 'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'
    
    /**
    * Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 
    * @type {'running' | 'success' | 'error'}
    * @memberof VolumeActionsApiGetAllActions0
    */
    readonly status?: 'running' | 'success' | 'error'
    
    /**
    * Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".
    * @type {number}
    * @memberof VolumeActionsApiGetAllActions0
    */
    readonly page?: number
    
    /**
    * Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".
    * @type {number}
    * @memberof VolumeActionsApiGetAllActions0
    */
    readonly perPage?: number
    
}

/**
 * VolumeActionsApiGenerated - object-oriented interface
 * @export
 * @class VolumeActionsApiGenerated
 * @extends {BaseAPI}
 */
export class VolumeActionsApiGenerated extends BaseAPI {
    /**
     * Attaches a Volume to a Server. Works only if the Server is in the same Location as the Volume.
     * @summary Attach Volume to a Server
     * @param {VolumeActionsApiAttachVolumeToServerRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VolumeActionsApiGenerated
     */
    public attachVolumeToServer(requestParameters: VolumeActionsApiAttachVolumeToServerRequest, options?: AxiosRequestConfig) {
        return VolumeActionsApiFp(this.configuration).attachVolumeToServer(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Changes the protection configuration of a Volume.
     * @summary Change Volume Protection
     * @param {VolumeActionsApiChangeProtectionVolumeRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VolumeActionsApiGenerated
     */
    public changeProtectionVolume(requestParameters: VolumeActionsApiChangeProtectionVolumeRequest, options?: AxiosRequestConfig) {
        return VolumeActionsApiFp(this.configuration).changeProtectionVolume(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Changes the size of a Volume. Note that downsizing a Volume is not possible.
     * @summary Resize Volume
     * @param {VolumeActionsApiChangeSizeRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VolumeActionsApiGenerated
     */
    public changeSize(requestParameters: VolumeActionsApiChangeSizeRequest, options?: AxiosRequestConfig) {
        return VolumeActionsApiFp(this.configuration).changeSize(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Detaches a Volume from the Server it’s attached to. You may attach it to a Server again at a later time.
     * @summary Detach Volume
     * @param {VolumeActionsApiDetachVolumeFromServerRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VolumeActionsApiGenerated
     */
    public detachVolumeFromServer(requestParameters: VolumeActionsApiDetachVolumeFromServerRequest, options?: AxiosRequestConfig) {
        return VolumeActionsApiFp(this.configuration).detachVolumeFromServer(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a specific Action for a Volume.
     * @summary Get an Action for a Volume
     * @param {VolumeActionsApiGetActionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VolumeActionsApiGenerated
     */
    public getAction(requestParameters: VolumeActionsApiGetActionRequest, options?: AxiosRequestConfig) {
        return VolumeActionsApiFp(this.configuration).getAction(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a specific Action object.
     * @summary Get an Action
     * @param {VolumeActionsApiGetActionByIdRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VolumeActionsApiGenerated
     */
    public getActionById(requestParameters: VolumeActionsApiGetActionByIdRequest, options?: AxiosRequestConfig) {
        return VolumeActionsApiFp(this.configuration).getActionById(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns all Action objects. You can `sort` the results by using the sort URI parameter, and filter them with the `status` and `id` parameter.
     * @summary Get all Actions
     * @param {VolumeActionsApiGetAllActionsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VolumeActionsApiGenerated
     */
    public getAllActions(requestParameters: VolumeActionsApiGetAllActionsRequest = {}, options?: AxiosRequestConfig) {
        return VolumeActionsApiFp(this.configuration).getAllActions(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns all Action objects for a Volume. You can `sort` the results by using the sort URI parameter, and filter them with the `status` parameter.
     * @summary Get all Actions for a Volume
     * @param {VolumeActionsApiGetAllActions0Request} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VolumeActionsApiGenerated
     */
    public getAllActions_1(requestParameters: VolumeActionsApiGetAllActions0Request, options?: AxiosRequestConfig) {
        return VolumeActionsApiFp(this.configuration).getAllActions_1(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }
}