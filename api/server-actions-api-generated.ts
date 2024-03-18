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
import { ServerActionsAddToPlacementGroupRequest } from '../models';
// @ts-ignore
import { ServerActionsAddToPlacementGroupResponse } from '../models';
// @ts-ignore
import { ServerActionsAttachIsoToServerRequest } from '../models';
// @ts-ignore
import { ServerActionsAttachIsoToServerResponse } from '../models';
// @ts-ignore
import { ServerActionsAttachToNetworkRequest } from '../models';
// @ts-ignore
import { ServerActionsAttachToNetworkResponse } from '../models';
// @ts-ignore
import { ServerActionsChangeAliasIpsRequest } from '../models';
// @ts-ignore
import { ServerActionsChangeAliasIpsResponse } from '../models';
// @ts-ignore
import { ServerActionsChangeDnsPtrRequest } from '../models';
// @ts-ignore
import { ServerActionsChangeDnsPtrResponse } from '../models';
// @ts-ignore
import { ServerActionsChangeProtectionRequest } from '../models';
// @ts-ignore
import { ServerActionsChangeProtectionResponse } from '../models';
// @ts-ignore
import { ServerActionsChangeServerTypeRequest } from '../models';
// @ts-ignore
import { ServerActionsChangeServerTypeResponse } from '../models';
// @ts-ignore
import { ServerActionsCreateImageRequest } from '../models';
// @ts-ignore
import { ServerActionsCreateImageRequestLabels } from '../models';
// @ts-ignore
import { ServerActionsCreateImageResponse } from '../models';
// @ts-ignore
import { ServerActionsDetachFromNetworkRequest } from '../models';
// @ts-ignore
import { ServerActionsDetachFromNetworkResponse } from '../models';
// @ts-ignore
import { ServerActionsDetachIsoFromServerResponse } from '../models';
// @ts-ignore
import { ServerActionsDisableBackupResponse } from '../models';
// @ts-ignore
import { ServerActionsDisableRescueModeResponse } from '../models';
// @ts-ignore
import { ServerActionsEnableBackupResponse } from '../models';
// @ts-ignore
import { ServerActionsEnableRescueModeRequest } from '../models';
// @ts-ignore
import { ServerActionsEnableRescueModeResponse } from '../models';
// @ts-ignore
import { ServerActionsGetActionById200Response } from '../models';
// @ts-ignore
import { ServerActionsGetActionByIdResponse } from '../models';
// @ts-ignore
import { ServerActionsGetAllActionsResponse } from '../models';
// @ts-ignore
import { ServerActionsGetAllResponse } from '../models';
// @ts-ignore
import { ServerActionsGracefulShutdownResponse } from '../models';
// @ts-ignore
import { ServerActionsPowerOffServerResponse } from '../models';
// @ts-ignore
import { ServerActionsPowerOnServerResponse } from '../models';
// @ts-ignore
import { ServerActionsRebuildServerFromImageRequest } from '../models';
// @ts-ignore
import { ServerActionsRebuildServerFromImageResponse } from '../models';
// @ts-ignore
import { ServerActionsRemoveFromPlacementGroupResponse } from '../models';
// @ts-ignore
import { ServerActionsRequestConsoleResponse } from '../models';
// @ts-ignore
import { ServerActionsResetServerPasswordResponse } from '../models';
// @ts-ignore
import { ServerActionsResetServerResponse } from '../models';
// @ts-ignore
import { ServerActionsSoftRebootServerResponse } from '../models';
import { paginate } from "../pagination/paginate";
import type * as buffer from "buffer"
import { requestBeforeHook } from '../requestBeforeHook';
/**
 * ServerActionsApi - axios parameter creator
 * @export
 */
export const ServerActionsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Adds a Server to a Placement Group.  Server must be powered off for this command to succeed.  #### Call specific error codes  | Code                          | Description                                                          | |-------------------------------|----------------------------------------------------------------------| | `server_not_stopped`          | The action requires a stopped server                                 | 
         * @summary Add a Server to a Placement Group
         * @param {number} id ID of the Server
         * @param {ServerActionsAddToPlacementGroupRequest} [serverActionsAddToPlacementGroupRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addToPlacementGroup: async (id: number, serverActionsAddToPlacementGroupRequest?: ServerActionsAddToPlacementGroupRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('addToPlacementGroup', 'id', id)
            const localVarPath = `/servers/{id}/actions/add_to_placement_group`
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
                requestBody: serverActionsAddToPlacementGroupRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/servers/{id}/actions/add_to_placement_group',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(serverActionsAddToPlacementGroupRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Attaches an ISO to a Server. The Server will immediately see it as a new disk. An already attached ISO will automatically be detached before the new ISO is attached.  Servers with attached ISOs have a modified boot order: They will try to boot from the ISO first before falling back to hard disk. 
         * @summary Attach an ISO to a Server
         * @param {number} id ID of the Server
         * @param {ServerActionsAttachIsoToServerRequest} [serverActionsAttachIsoToServerRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        attachIsoToServer: async (id: number, serverActionsAttachIsoToServerRequest?: ServerActionsAttachIsoToServerRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('attachIsoToServer', 'id', id)
            const localVarPath = `/servers/{id}/actions/attach_iso`
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
                requestBody: serverActionsAttachIsoToServerRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/servers/{id}/actions/attach_iso',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(serverActionsAttachIsoToServerRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Attaches a Server to a network. This will complement the fixed public Server interface by adding an additional ethernet interface to the Server which is connected to the specified network.  The Server will get an IP auto assigned from a subnet of type `server` in the same `network_zone`.  Using the `alias_ips` attribute you can also define one or more additional IPs to the Servers. Please note that you will have to configure these IPs by hand on your Server since only the primary IP will be given out by DHCP.  **Call specific error codes**  | Code                             | Description                                                           | |----------------------------------|-----------------------------------------------------------------------| | `server_already_attached`        | The server is already attached to the network                         | | `ip_not_available`               | The provided Network IP is not available                              | | `no_subnet_available`            | No Subnet or IP is available for the Server within the network        | | `networks_overlap`               | The network IP range overlaps with one of the server networks         | 
         * @summary Attach a Server to a Network
         * @param {number} id ID of the Server
         * @param {ServerActionsAttachToNetworkRequest} [serverActionsAttachToNetworkRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        attachToNetwork: async (id: number, serverActionsAttachToNetworkRequest?: ServerActionsAttachToNetworkRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('attachToNetwork', 'id', id)
            const localVarPath = `/servers/{id}/actions/attach_to_network`
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
                requestBody: serverActionsAttachToNetworkRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/servers/{id}/actions/attach_to_network',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(serverActionsAttachToNetworkRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Changes the alias IPs of an already attached Network. Note that the existing aliases for the specified Network will be replaced with these provided in the request body. So if you want to add an alias IP, you have to provide the existing ones from the Network plus the new alias IP in the request body.
         * @summary Change alias IPs of a Network
         * @param {number} id ID of the Server
         * @param {ServerActionsChangeAliasIpsRequest} [serverActionsChangeAliasIpsRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeAliasIps: async (id: number, serverActionsChangeAliasIpsRequest?: ServerActionsChangeAliasIpsRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('changeAliasIps', 'id', id)
            const localVarPath = `/servers/{id}/actions/change_alias_ips`
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
                requestBody: serverActionsChangeAliasIpsRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/servers/{id}/actions/change_alias_ips',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(serverActionsChangeAliasIpsRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Changes the hostname that will appear when getting the hostname belonging to the primary IPs (IPv4 and IPv6) of this Server.  Floating IPs assigned to the Server are not affected by this. 
         * @summary Change reverse DNS entry for this Server
         * @param {number} id ID of the Server
         * @param {ServerActionsChangeDnsPtrRequest} [serverActionsChangeDnsPtrRequest] Select the IP address for which to change the DNS entry by passing &#x60;ip&#x60;. It can be either IPv4 or IPv6. The target hostname is set by passing &#x60;dns_ptr&#x60;.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeDnsPtr: async (id: number, serverActionsChangeDnsPtrRequest?: ServerActionsChangeDnsPtrRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('changeDnsPtr', 'id', id)
            const localVarPath = `/servers/{id}/actions/change_dns_ptr`
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
                requestBody: serverActionsChangeDnsPtrRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/servers/{id}/actions/change_dns_ptr',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(serverActionsChangeDnsPtrRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Changes the protection configuration of the Server.
         * @summary Change Server Protection
         * @param {number} id ID of the Server
         * @param {ServerActionsChangeProtectionRequest} [serverActionsChangeProtectionRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeProtection: async (id: number, serverActionsChangeProtectionRequest?: ServerActionsChangeProtectionRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('changeProtection', 'id', id)
            const localVarPath = `/servers/{id}/actions/change_protection`
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
                requestBody: serverActionsChangeProtectionRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/servers/{id}/actions/change_protection',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(serverActionsChangeProtectionRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Changes the type (Cores, RAM and disk sizes) of a Server.  Server must be powered off for this command to succeed.  This copies the content of its disk, and starts it again.  You can only migrate to Server types with the same `storage_type` and equal or bigger disks. Shrinking disks is not possible as it might destroy data.  If the disk gets upgraded, the Server type can not be downgraded any more. If you plan to downgrade the Server type, set `upgrade_disk` to `false`.  #### Call specific error codes  | Code                          | Description                                                          | |-------------------------------|----------------------------------------------------------------------| | `invalid_server_type`         | The server type does not fit for the given server or is deprecated   | | `server_not_stopped`          | The action requires a stopped server                                 | 
         * @summary Change the Type of a Server
         * @param {number} id ID of the Server
         * @param {ServerActionsChangeServerTypeRequest} [serverActionsChangeServerTypeRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeServerType: async (id: number, serverActionsChangeServerTypeRequest?: ServerActionsChangeServerTypeRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('changeServerType', 'id', id)
            const localVarPath = `/servers/{id}/actions/change_type`
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
                requestBody: serverActionsChangeServerTypeRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/servers/{id}/actions/change_type',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(serverActionsChangeServerTypeRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Creates an Image (snapshot) from a Server by copying the contents of its disks. This creates a snapshot of the current state of the disk and copies it into an Image. If the Server is currently running you must make sure that its disk content is consistent. Otherwise, the created Image may not be readable.  To make sure disk content is consistent, we recommend to shut down the Server prior to creating an Image.  You can either create a `backup` Image that is bound to the Server and therefore will be deleted when the Server is deleted, or you can create a `snapshot` Image which is completely independent of the Server it was created from and will survive Server deletion. Backup Images are only available when the backup option is enabled for the Server. Snapshot Images are billed on a per GB basis. 
         * @summary Create Image from a Server
         * @param {number} id ID of the Server
         * @param {ServerActionsCreateImageRequest} [serverActionsCreateImageRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createImage: async (id: number, serverActionsCreateImageRequest?: ServerActionsCreateImageRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('createImage', 'id', id)
            const localVarPath = `/servers/{id}/actions/create_image`
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
                requestBody: serverActionsCreateImageRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/servers/{id}/actions/create_image',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(serverActionsCreateImageRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Detaches a Server from a network. The interface for this network will vanish.
         * @summary Detach a Server from a Network
         * @param {number} id ID of the Server
         * @param {ServerActionsDetachFromNetworkRequest} [serverActionsDetachFromNetworkRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        detachFromNetwork: async (id: number, serverActionsDetachFromNetworkRequest?: ServerActionsDetachFromNetworkRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('detachFromNetwork', 'id', id)
            const localVarPath = `/servers/{id}/actions/detach_from_network`
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
                requestBody: serverActionsDetachFromNetworkRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/servers/{id}/actions/detach_from_network',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(serverActionsDetachFromNetworkRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Detaches an ISO from a Server. In case no ISO Image is attached to the Server, the status of the returned Action is immediately set to `success`
         * @summary Detach an ISO from a Server
         * @param {number} id ID of the Server
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        detachIsoFromServer: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('detachIsoFromServer', 'id', id)
            const localVarPath = `/servers/{id}/actions/detach_iso`
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
                pathTemplate: '/servers/{id}/actions/detach_iso',
                httpMethod: 'POST'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Disables the automatic backup option and deletes all existing Backups for a Server. No more additional charges for backups will be made.  Caution: This immediately removes all existing backups for the Server! 
         * @summary Disable Backups for a Server
         * @param {number} id ID of the Server
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        disableBackup: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('disableBackup', 'id', id)
            const localVarPath = `/servers/{id}/actions/disable_backup`
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
                pathTemplate: '/servers/{id}/actions/disable_backup',
                httpMethod: 'POST'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Disables the Hetzner Rescue System for a Server. This makes a Server start from its disks on next reboot.  Rescue Mode is automatically disabled when you first boot into it or if you do not use it for 60 minutes.  Disabling rescue mode will not reboot your Server — you will have to do this yourself. 
         * @summary Disable Rescue Mode for a Server
         * @param {number} id ID of the Server
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        disableRescueMode: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('disableRescueMode', 'id', id)
            const localVarPath = `/servers/{id}/actions/disable_rescue`
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
                pathTemplate: '/servers/{id}/actions/disable_rescue',
                httpMethod: 'POST'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Enables and configures the automatic daily backup option for the Server. Enabling automatic backups will increase the price of the Server by 20%. In return, you will get seven slots where Images of type backup can be stored.  Backups are automatically created daily. 
         * @summary Enable and Configure Backups for a Server
         * @param {number} id ID of the Server
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        enableBackup: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('enableBackup', 'id', id)
            const localVarPath = `/servers/{id}/actions/enable_backup`
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
                pathTemplate: '/servers/{id}/actions/enable_backup',
                httpMethod: 'POST'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Enable the Hetzner Rescue System for this Server. The next time a Server with enabled rescue mode boots it will start a special minimal Linux distribution designed for repair and reinstall.  In case a Server cannot boot on its own you can use this to access a Server’s disks.  Rescue Mode is automatically disabled when you first boot into it or if you do not use it for 60 minutes.  Enabling rescue mode will not [reboot](https://docs.hetzner.cloud/#server-actions-soft-reboot-a-server) your Server — you will have to do this yourself. 
         * @summary Enable Rescue Mode for a Server
         * @param {number} id ID of the Server
         * @param {ServerActionsEnableRescueModeRequest} [serverActionsEnableRescueModeRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        enableRescueMode: async (id: number, serverActionsEnableRescueModeRequest?: ServerActionsEnableRescueModeRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('enableRescueMode', 'id', id)
            const localVarPath = `/servers/{id}/actions/enable_rescue`
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
                requestBody: serverActionsEnableRescueModeRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/servers/{id}/actions/enable_rescue',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(serverActionsEnableRescueModeRequest, localVarRequestOptions, configuration)

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
            const localVarPath = `/servers/actions/{id}`
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
                pathTemplate: '/servers/actions/{id}',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns a specific Action object for a Server.
         * @summary Get an Action for a Server
         * @param {number} id ID of the Server
         * @param {number} actionId ID of the Action
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getActionById_1: async (id: number, actionId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getActionById_1', 'id', id)
            // verify required parameter 'actionId' is not null or undefined
            assertParamExists('getActionById_1', 'actionId', actionId)
            const localVarPath = `/servers/{id}/actions/{action_id}`
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
                pathTemplate: '/servers/{id}/actions/{action_id}',
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
        getAll: async (id?: number, sort?: 'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc', status?: 'running' | 'success' | 'error', page?: number, perPage?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/servers/actions`;
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
                pathTemplate: '/servers/actions',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns all Action objects for a Server. You can `sort` the results by using the sort URI parameter, and filter them with the `status` parameter.
         * @summary Get all Actions for a Server
         * @param {number} id ID of the Resource.
         * @param {'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'} [sort] Sort actions by field and direction. Can be used multiple times. For more information, see \&quot;[Sorting](https://docs.hetzner.cloud)\&quot;. 
         * @param {'running' | 'success' | 'error'} [status] Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 
         * @param {number} [page] Page number to return. For more information, see \&quot;[Pagination](https://docs.hetzner.cloud)\&quot;.
         * @param {number} [perPage] Maximum number of entries returned per page. For more information, see \&quot;[Pagination](https://docs.hetzner.cloud)\&quot;.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllActions: async (id: number, sort?: 'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc', status?: 'running' | 'success' | 'error', page?: number, perPage?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getAllActions', 'id', id)
            const localVarPath = `/servers/{id}/actions`
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
                pathTemplate: '/servers/{id}/actions',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Shuts down a Server gracefully by sending an ACPI shutdown request. The Server operating system must support ACPI and react to the request, otherwise the Server will not shut down. Please note that the `action` status in this case only reflects whether the action was sent to the server. It does not mean that the server actually shut down successfully. If you need to ensure that the server is off, use the `poweroff` action 
         * @summary Shutdown a Server
         * @param {number} id ID of the Server
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gracefulShutdown: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('gracefulShutdown', 'id', id)
            const localVarPath = `/servers/{id}/actions/shutdown`
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
                pathTemplate: '/servers/{id}/actions/shutdown',
                httpMethod: 'POST'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Cuts power to the Server. This forcefully stops it without giving the Server operating system time to gracefully stop. May lead to data loss, equivalent to pulling the power cord. Power off should only be used when shutdown does not work.
         * @summary Power off a Server
         * @param {number} id ID of the Server
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        powerOffServer: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('powerOffServer', 'id', id)
            const localVarPath = `/servers/{id}/actions/poweroff`
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
                pathTemplate: '/servers/{id}/actions/poweroff',
                httpMethod: 'POST'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Starts a Server by turning its power on.
         * @summary Power on a Server
         * @param {number} id ID of the Server
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        powerOnServer: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('powerOnServer', 'id', id)
            const localVarPath = `/servers/{id}/actions/poweron`
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
                pathTemplate: '/servers/{id}/actions/poweron',
                httpMethod: 'POST'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Rebuilds a Server overwriting its disk with the content of an Image, thereby **destroying all data** on the target Server  The Image can either be one you have created earlier (`backup` or `snapshot` Image) or it can be a completely fresh `system` Image provided by us. You can get a list of all available Images with `GET /images`.  Your Server will automatically be powered off before the rebuild command executes. 
         * @summary Rebuild a Server from an Image
         * @param {number} id ID of the Server
         * @param {ServerActionsRebuildServerFromImageRequest} [serverActionsRebuildServerFromImageRequest] To select which Image to rebuild from you can either pass an ID or a name as the &#x60;image&#x60; argument. Passing a name only works for &#x60;system&#x60; Images since the other Image types do not have a name set.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        rebuildServerFromImage: async (id: number, serverActionsRebuildServerFromImageRequest?: ServerActionsRebuildServerFromImageRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('rebuildServerFromImage', 'id', id)
            const localVarPath = `/servers/{id}/actions/rebuild`
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
                requestBody: serverActionsRebuildServerFromImageRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/servers/{id}/actions/rebuild',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(serverActionsRebuildServerFromImageRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Removes a Server from a Placement Group. 
         * @summary Remove from Placement Group
         * @param {number} id ID of the Server
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeFromPlacementGroup: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('removeFromPlacementGroup', 'id', id)
            const localVarPath = `/servers/{id}/actions/remove_from_placement_group`
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
                pathTemplate: '/servers/{id}/actions/remove_from_placement_group',
                httpMethod: 'POST'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Requests credentials for remote access via VNC over websocket to keyboard, monitor, and mouse for a Server. The provided URL is valid for 1 minute, after this period a new url needs to be created to connect to the Server. How long the connection is open after the initial connect is not subject to this timeout.
         * @summary Request Console for a Server
         * @param {number} id ID of the Server
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        requestConsole: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('requestConsole', 'id', id)
            const localVarPath = `/servers/{id}/actions/request_console`
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
                pathTemplate: '/servers/{id}/actions/request_console',
                httpMethod: 'POST'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Cuts power to a Server and starts it again. This forcefully stops it without giving the Server operating system time to gracefully stop. This may lead to data loss, it’s equivalent to pulling the power cord and plugging it in again. Reset should only be used when reboot does not work.
         * @summary Reset a Server
         * @param {number} id ID of the Server
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        resetServer: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('resetServer', 'id', id)
            const localVarPath = `/servers/{id}/actions/reset`
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
                pathTemplate: '/servers/{id}/actions/reset',
                httpMethod: 'POST'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Resets the root password. Only works for Linux systems that are running the qemu guest agent. Server must be powered on (status `running`) in order for this operation to succeed.  This will generate a new password for this Server and return it.  If this does not succeed you can use the rescue system to netboot the Server and manually change your Server password by hand. 
         * @summary Reset root Password of a Server
         * @param {number} id ID of the Server
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        resetServerPassword: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('resetServerPassword', 'id', id)
            const localVarPath = `/servers/{id}/actions/reset_password`
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
                pathTemplate: '/servers/{id}/actions/reset_password',
                httpMethod: 'POST'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Reboots a Server gracefully by sending an ACPI request. The Server operating system must support ACPI and react to the request, otherwise the Server will not reboot.
         * @summary Soft-reboot a Server
         * @param {number} id ID of the Server
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        softRebootServer: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('softRebootServer', 'id', id)
            const localVarPath = `/servers/{id}/actions/reboot`
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
                pathTemplate: '/servers/{id}/actions/reboot',
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
 * ServerActionsApi - functional programming interface
 * @export
 */
export const ServerActionsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ServerActionsApiAxiosParamCreator(configuration)
    return {
        /**
         * Adds a Server to a Placement Group.  Server must be powered off for this command to succeed.  #### Call specific error codes  | Code                          | Description                                                          | |-------------------------------|----------------------------------------------------------------------| | `server_not_stopped`          | The action requires a stopped server                                 | 
         * @summary Add a Server to a Placement Group
         * @param {ServerActionsApiAddToPlacementGroupRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addToPlacementGroup(requestParameters: ServerActionsApiAddToPlacementGroupRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsAddToPlacementGroupResponse>> {
            const serverActionsAddToPlacementGroupRequest: ServerActionsAddToPlacementGroupRequest = {
                placement_group: requestParameters.placement_group
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.addToPlacementGroup(requestParameters.id, serverActionsAddToPlacementGroupRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Attaches an ISO to a Server. The Server will immediately see it as a new disk. An already attached ISO will automatically be detached before the new ISO is attached.  Servers with attached ISOs have a modified boot order: They will try to boot from the ISO first before falling back to hard disk. 
         * @summary Attach an ISO to a Server
         * @param {ServerActionsApiAttachIsoToServerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async attachIsoToServer(requestParameters: ServerActionsApiAttachIsoToServerRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsAttachIsoToServerResponse>> {
            const serverActionsAttachIsoToServerRequest: ServerActionsAttachIsoToServerRequest = {
                iso: requestParameters.iso
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.attachIsoToServer(requestParameters.id, serverActionsAttachIsoToServerRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Attaches a Server to a network. This will complement the fixed public Server interface by adding an additional ethernet interface to the Server which is connected to the specified network.  The Server will get an IP auto assigned from a subnet of type `server` in the same `network_zone`.  Using the `alias_ips` attribute you can also define one or more additional IPs to the Servers. Please note that you will have to configure these IPs by hand on your Server since only the primary IP will be given out by DHCP.  **Call specific error codes**  | Code                             | Description                                                           | |----------------------------------|-----------------------------------------------------------------------| | `server_already_attached`        | The server is already attached to the network                         | | `ip_not_available`               | The provided Network IP is not available                              | | `no_subnet_available`            | No Subnet or IP is available for the Server within the network        | | `networks_overlap`               | The network IP range overlaps with one of the server networks         | 
         * @summary Attach a Server to a Network
         * @param {ServerActionsApiAttachToNetworkRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async attachToNetwork(requestParameters: ServerActionsApiAttachToNetworkRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsAttachToNetworkResponse>> {
            const serverActionsAttachToNetworkRequest: ServerActionsAttachToNetworkRequest = {
                alias_ips: requestParameters.alias_ips,
                ip: requestParameters.ip,
                network: requestParameters.network
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.attachToNetwork(requestParameters.id, serverActionsAttachToNetworkRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Changes the alias IPs of an already attached Network. Note that the existing aliases for the specified Network will be replaced with these provided in the request body. So if you want to add an alias IP, you have to provide the existing ones from the Network plus the new alias IP in the request body.
         * @summary Change alias IPs of a Network
         * @param {ServerActionsApiChangeAliasIpsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async changeAliasIps(requestParameters: ServerActionsApiChangeAliasIpsRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsChangeAliasIpsResponse>> {
            const serverActionsChangeAliasIpsRequest: ServerActionsChangeAliasIpsRequest = {
                alias_ips: requestParameters.alias_ips,
                network: requestParameters.network
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.changeAliasIps(requestParameters.id, serverActionsChangeAliasIpsRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Changes the hostname that will appear when getting the hostname belonging to the primary IPs (IPv4 and IPv6) of this Server.  Floating IPs assigned to the Server are not affected by this. 
         * @summary Change reverse DNS entry for this Server
         * @param {ServerActionsApiChangeDnsPtrRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async changeDnsPtr(requestParameters: ServerActionsApiChangeDnsPtrRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsChangeDnsPtrResponse>> {
            const serverActionsChangeDnsPtrRequest: ServerActionsChangeDnsPtrRequest = {
                dns_ptr: requestParameters.dns_ptr,
                ip: requestParameters.ip
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.changeDnsPtr(requestParameters.id, serverActionsChangeDnsPtrRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Changes the protection configuration of the Server.
         * @summary Change Server Protection
         * @param {ServerActionsApiChangeProtectionRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async changeProtection(requestParameters: ServerActionsApiChangeProtectionRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsChangeProtectionResponse>> {
            const serverActionsChangeProtectionRequest: ServerActionsChangeProtectionRequest = {
                delete: requestParameters.delete,
                rebuild: requestParameters.rebuild
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.changeProtection(requestParameters.id, serverActionsChangeProtectionRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Changes the type (Cores, RAM and disk sizes) of a Server.  Server must be powered off for this command to succeed.  This copies the content of its disk, and starts it again.  You can only migrate to Server types with the same `storage_type` and equal or bigger disks. Shrinking disks is not possible as it might destroy data.  If the disk gets upgraded, the Server type can not be downgraded any more. If you plan to downgrade the Server type, set `upgrade_disk` to `false`.  #### Call specific error codes  | Code                          | Description                                                          | |-------------------------------|----------------------------------------------------------------------| | `invalid_server_type`         | The server type does not fit for the given server or is deprecated   | | `server_not_stopped`          | The action requires a stopped server                                 | 
         * @summary Change the Type of a Server
         * @param {ServerActionsApiChangeServerTypeRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async changeServerType(requestParameters: ServerActionsApiChangeServerTypeRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsChangeServerTypeResponse>> {
            const serverActionsChangeServerTypeRequest: ServerActionsChangeServerTypeRequest = {
                server_type: requestParameters.server_type,
                upgrade_disk: requestParameters.upgrade_disk
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.changeServerType(requestParameters.id, serverActionsChangeServerTypeRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Creates an Image (snapshot) from a Server by copying the contents of its disks. This creates a snapshot of the current state of the disk and copies it into an Image. If the Server is currently running you must make sure that its disk content is consistent. Otherwise, the created Image may not be readable.  To make sure disk content is consistent, we recommend to shut down the Server prior to creating an Image.  You can either create a `backup` Image that is bound to the Server and therefore will be deleted when the Server is deleted, or you can create a `snapshot` Image which is completely independent of the Server it was created from and will survive Server deletion. Backup Images are only available when the backup option is enabled for the Server. Snapshot Images are billed on a per GB basis. 
         * @summary Create Image from a Server
         * @param {ServerActionsApiCreateImageRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createImage(requestParameters: ServerActionsApiCreateImageRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsCreateImageResponse>> {
            const serverActionsCreateImageRequest: ServerActionsCreateImageRequest = {
                description: requestParameters.description,
                labels: requestParameters.labels,
                type: requestParameters.type
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.createImage(requestParameters.id, serverActionsCreateImageRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Detaches a Server from a network. The interface for this network will vanish.
         * @summary Detach a Server from a Network
         * @param {ServerActionsApiDetachFromNetworkRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async detachFromNetwork(requestParameters: ServerActionsApiDetachFromNetworkRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsDetachFromNetworkResponse>> {
            const serverActionsDetachFromNetworkRequest: ServerActionsDetachFromNetworkRequest = {
                network: requestParameters.network
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.detachFromNetwork(requestParameters.id, serverActionsDetachFromNetworkRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Detaches an ISO from a Server. In case no ISO Image is attached to the Server, the status of the returned Action is immediately set to `success`
         * @summary Detach an ISO from a Server
         * @param {ServerActionsApiDetachIsoFromServerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async detachIsoFromServer(requestParameters: ServerActionsApiDetachIsoFromServerRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsDetachIsoFromServerResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.detachIsoFromServer(requestParameters.id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Disables the automatic backup option and deletes all existing Backups for a Server. No more additional charges for backups will be made.  Caution: This immediately removes all existing backups for the Server! 
         * @summary Disable Backups for a Server
         * @param {ServerActionsApiDisableBackupRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async disableBackup(requestParameters: ServerActionsApiDisableBackupRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsDisableBackupResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.disableBackup(requestParameters.id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Disables the Hetzner Rescue System for a Server. This makes a Server start from its disks on next reboot.  Rescue Mode is automatically disabled when you first boot into it or if you do not use it for 60 minutes.  Disabling rescue mode will not reboot your Server — you will have to do this yourself. 
         * @summary Disable Rescue Mode for a Server
         * @param {ServerActionsApiDisableRescueModeRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async disableRescueMode(requestParameters: ServerActionsApiDisableRescueModeRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsDisableRescueModeResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.disableRescueMode(requestParameters.id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Enables and configures the automatic daily backup option for the Server. Enabling automatic backups will increase the price of the Server by 20%. In return, you will get seven slots where Images of type backup can be stored.  Backups are automatically created daily. 
         * @summary Enable and Configure Backups for a Server
         * @param {ServerActionsApiEnableBackupRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async enableBackup(requestParameters: ServerActionsApiEnableBackupRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsEnableBackupResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.enableBackup(requestParameters.id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Enable the Hetzner Rescue System for this Server. The next time a Server with enabled rescue mode boots it will start a special minimal Linux distribution designed for repair and reinstall.  In case a Server cannot boot on its own you can use this to access a Server’s disks.  Rescue Mode is automatically disabled when you first boot into it or if you do not use it for 60 minutes.  Enabling rescue mode will not [reboot](https://docs.hetzner.cloud/#server-actions-soft-reboot-a-server) your Server — you will have to do this yourself. 
         * @summary Enable Rescue Mode for a Server
         * @param {ServerActionsApiEnableRescueModeRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async enableRescueMode(requestParameters: ServerActionsApiEnableRescueModeRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsEnableRescueModeResponse>> {
            const serverActionsEnableRescueModeRequest: ServerActionsEnableRescueModeRequest = {
                ssh_keys: requestParameters.ssh_keys,
                type: requestParameters.type
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.enableRescueMode(requestParameters.id, serverActionsEnableRescueModeRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns a specific Action object.
         * @summary Get an Action
         * @param {ServerActionsApiGetActionByIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getActionById(requestParameters: ServerActionsApiGetActionByIdRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsGetActionByIdResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getActionById(requestParameters.id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns a specific Action object for a Server.
         * @summary Get an Action for a Server
         * @param {ServerActionsApiGetActionById0Request} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getActionById_1(requestParameters: ServerActionsApiGetActionById0Request, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsGetActionById200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getActionById_1(requestParameters.id, requestParameters.actionId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns all Action objects. You can `sort` the results by using the sort URI parameter, and filter them with the `status` and `id` parameter.
         * @summary Get all Actions
         * @param {ServerActionsApiGetAllRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAll(requestParameters: ServerActionsApiGetAllRequest = {}, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsGetAllResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAll(requestParameters.id, requestParameters.sort, requestParameters.status, requestParameters.page, requestParameters.perPage, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns all Action objects for a Server. You can `sort` the results by using the sort URI parameter, and filter them with the `status` parameter.
         * @summary Get all Actions for a Server
         * @param {ServerActionsApiGetAllActionsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllActions(requestParameters: ServerActionsApiGetAllActionsRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsGetAllActionsResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllActions(requestParameters.id, requestParameters.sort, requestParameters.status, requestParameters.page, requestParameters.perPage, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Shuts down a Server gracefully by sending an ACPI shutdown request. The Server operating system must support ACPI and react to the request, otherwise the Server will not shut down. Please note that the `action` status in this case only reflects whether the action was sent to the server. It does not mean that the server actually shut down successfully. If you need to ensure that the server is off, use the `poweroff` action 
         * @summary Shutdown a Server
         * @param {ServerActionsApiGracefulShutdownRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async gracefulShutdown(requestParameters: ServerActionsApiGracefulShutdownRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsGracefulShutdownResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.gracefulShutdown(requestParameters.id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Cuts power to the Server. This forcefully stops it without giving the Server operating system time to gracefully stop. May lead to data loss, equivalent to pulling the power cord. Power off should only be used when shutdown does not work.
         * @summary Power off a Server
         * @param {ServerActionsApiPowerOffServerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async powerOffServer(requestParameters: ServerActionsApiPowerOffServerRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsPowerOffServerResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.powerOffServer(requestParameters.id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Starts a Server by turning its power on.
         * @summary Power on a Server
         * @param {ServerActionsApiPowerOnServerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async powerOnServer(requestParameters: ServerActionsApiPowerOnServerRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsPowerOnServerResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.powerOnServer(requestParameters.id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Rebuilds a Server overwriting its disk with the content of an Image, thereby **destroying all data** on the target Server  The Image can either be one you have created earlier (`backup` or `snapshot` Image) or it can be a completely fresh `system` Image provided by us. You can get a list of all available Images with `GET /images`.  Your Server will automatically be powered off before the rebuild command executes. 
         * @summary Rebuild a Server from an Image
         * @param {ServerActionsApiRebuildServerFromImageRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async rebuildServerFromImage(requestParameters: ServerActionsApiRebuildServerFromImageRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsRebuildServerFromImageResponse>> {
            const serverActionsRebuildServerFromImageRequest: ServerActionsRebuildServerFromImageRequest = {
                image: requestParameters.image
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.rebuildServerFromImage(requestParameters.id, serverActionsRebuildServerFromImageRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Removes a Server from a Placement Group. 
         * @summary Remove from Placement Group
         * @param {ServerActionsApiRemoveFromPlacementGroupRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async removeFromPlacementGroup(requestParameters: ServerActionsApiRemoveFromPlacementGroupRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsRemoveFromPlacementGroupResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.removeFromPlacementGroup(requestParameters.id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Requests credentials for remote access via VNC over websocket to keyboard, monitor, and mouse for a Server. The provided URL is valid for 1 minute, after this period a new url needs to be created to connect to the Server. How long the connection is open after the initial connect is not subject to this timeout.
         * @summary Request Console for a Server
         * @param {ServerActionsApiRequestConsoleRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async requestConsole(requestParameters: ServerActionsApiRequestConsoleRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsRequestConsoleResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.requestConsole(requestParameters.id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Cuts power to a Server and starts it again. This forcefully stops it without giving the Server operating system time to gracefully stop. This may lead to data loss, it’s equivalent to pulling the power cord and plugging it in again. Reset should only be used when reboot does not work.
         * @summary Reset a Server
         * @param {ServerActionsApiResetServerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async resetServer(requestParameters: ServerActionsApiResetServerRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsResetServerResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.resetServer(requestParameters.id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Resets the root password. Only works for Linux systems that are running the qemu guest agent. Server must be powered on (status `running`) in order for this operation to succeed.  This will generate a new password for this Server and return it.  If this does not succeed you can use the rescue system to netboot the Server and manually change your Server password by hand. 
         * @summary Reset root Password of a Server
         * @param {ServerActionsApiResetServerPasswordRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async resetServerPassword(requestParameters: ServerActionsApiResetServerPasswordRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsResetServerPasswordResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.resetServerPassword(requestParameters.id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Reboots a Server gracefully by sending an ACPI request. The Server operating system must support ACPI and react to the request, otherwise the Server will not reboot.
         * @summary Soft-reboot a Server
         * @param {ServerActionsApiSoftRebootServerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async softRebootServer(requestParameters: ServerActionsApiSoftRebootServerRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServerActionsSoftRebootServerResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.softRebootServer(requestParameters.id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ServerActionsApi - factory interface
 * @export
 */
export const ServerActionsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ServerActionsApiFp(configuration)
    return {
        /**
         * Adds a Server to a Placement Group.  Server must be powered off for this command to succeed.  #### Call specific error codes  | Code                          | Description                                                          | |-------------------------------|----------------------------------------------------------------------| | `server_not_stopped`          | The action requires a stopped server                                 | 
         * @summary Add a Server to a Placement Group
         * @param {ServerActionsApiAddToPlacementGroupRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addToPlacementGroup(requestParameters: ServerActionsApiAddToPlacementGroupRequest, options?: AxiosRequestConfig): AxiosPromise<ServerActionsAddToPlacementGroupResponse> {
            return localVarFp.addToPlacementGroup(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Attaches an ISO to a Server. The Server will immediately see it as a new disk. An already attached ISO will automatically be detached before the new ISO is attached.  Servers with attached ISOs have a modified boot order: They will try to boot from the ISO first before falling back to hard disk. 
         * @summary Attach an ISO to a Server
         * @param {ServerActionsApiAttachIsoToServerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        attachIsoToServer(requestParameters: ServerActionsApiAttachIsoToServerRequest, options?: AxiosRequestConfig): AxiosPromise<ServerActionsAttachIsoToServerResponse> {
            return localVarFp.attachIsoToServer(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Attaches a Server to a network. This will complement the fixed public Server interface by adding an additional ethernet interface to the Server which is connected to the specified network.  The Server will get an IP auto assigned from a subnet of type `server` in the same `network_zone`.  Using the `alias_ips` attribute you can also define one or more additional IPs to the Servers. Please note that you will have to configure these IPs by hand on your Server since only the primary IP will be given out by DHCP.  **Call specific error codes**  | Code                             | Description                                                           | |----------------------------------|-----------------------------------------------------------------------| | `server_already_attached`        | The server is already attached to the network                         | | `ip_not_available`               | The provided Network IP is not available                              | | `no_subnet_available`            | No Subnet or IP is available for the Server within the network        | | `networks_overlap`               | The network IP range overlaps with one of the server networks         | 
         * @summary Attach a Server to a Network
         * @param {ServerActionsApiAttachToNetworkRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        attachToNetwork(requestParameters: ServerActionsApiAttachToNetworkRequest, options?: AxiosRequestConfig): AxiosPromise<ServerActionsAttachToNetworkResponse> {
            return localVarFp.attachToNetwork(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Changes the alias IPs of an already attached Network. Note that the existing aliases for the specified Network will be replaced with these provided in the request body. So if you want to add an alias IP, you have to provide the existing ones from the Network plus the new alias IP in the request body.
         * @summary Change alias IPs of a Network
         * @param {ServerActionsApiChangeAliasIpsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeAliasIps(requestParameters: ServerActionsApiChangeAliasIpsRequest, options?: AxiosRequestConfig): AxiosPromise<ServerActionsChangeAliasIpsResponse> {
            return localVarFp.changeAliasIps(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Changes the hostname that will appear when getting the hostname belonging to the primary IPs (IPv4 and IPv6) of this Server.  Floating IPs assigned to the Server are not affected by this. 
         * @summary Change reverse DNS entry for this Server
         * @param {ServerActionsApiChangeDnsPtrRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeDnsPtr(requestParameters: ServerActionsApiChangeDnsPtrRequest, options?: AxiosRequestConfig): AxiosPromise<ServerActionsChangeDnsPtrResponse> {
            return localVarFp.changeDnsPtr(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Changes the protection configuration of the Server.
         * @summary Change Server Protection
         * @param {ServerActionsApiChangeProtectionRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeProtection(requestParameters: ServerActionsApiChangeProtectionRequest, options?: AxiosRequestConfig): AxiosPromise<ServerActionsChangeProtectionResponse> {
            return localVarFp.changeProtection(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Changes the type (Cores, RAM and disk sizes) of a Server.  Server must be powered off for this command to succeed.  This copies the content of its disk, and starts it again.  You can only migrate to Server types with the same `storage_type` and equal or bigger disks. Shrinking disks is not possible as it might destroy data.  If the disk gets upgraded, the Server type can not be downgraded any more. If you plan to downgrade the Server type, set `upgrade_disk` to `false`.  #### Call specific error codes  | Code                          | Description                                                          | |-------------------------------|----------------------------------------------------------------------| | `invalid_server_type`         | The server type does not fit for the given server or is deprecated   | | `server_not_stopped`          | The action requires a stopped server                                 | 
         * @summary Change the Type of a Server
         * @param {ServerActionsApiChangeServerTypeRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeServerType(requestParameters: ServerActionsApiChangeServerTypeRequest, options?: AxiosRequestConfig): AxiosPromise<ServerActionsChangeServerTypeResponse> {
            return localVarFp.changeServerType(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Creates an Image (snapshot) from a Server by copying the contents of its disks. This creates a snapshot of the current state of the disk and copies it into an Image. If the Server is currently running you must make sure that its disk content is consistent. Otherwise, the created Image may not be readable.  To make sure disk content is consistent, we recommend to shut down the Server prior to creating an Image.  You can either create a `backup` Image that is bound to the Server and therefore will be deleted when the Server is deleted, or you can create a `snapshot` Image which is completely independent of the Server it was created from and will survive Server deletion. Backup Images are only available when the backup option is enabled for the Server. Snapshot Images are billed on a per GB basis. 
         * @summary Create Image from a Server
         * @param {ServerActionsApiCreateImageRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createImage(requestParameters: ServerActionsApiCreateImageRequest, options?: AxiosRequestConfig): AxiosPromise<ServerActionsCreateImageResponse> {
            return localVarFp.createImage(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Detaches a Server from a network. The interface for this network will vanish.
         * @summary Detach a Server from a Network
         * @param {ServerActionsApiDetachFromNetworkRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        detachFromNetwork(requestParameters: ServerActionsApiDetachFromNetworkRequest, options?: AxiosRequestConfig): AxiosPromise<ServerActionsDetachFromNetworkResponse> {
            return localVarFp.detachFromNetwork(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Detaches an ISO from a Server. In case no ISO Image is attached to the Server, the status of the returned Action is immediately set to `success`
         * @summary Detach an ISO from a Server
         * @param {ServerActionsApiDetachIsoFromServerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        detachIsoFromServer(requestParameters: ServerActionsApiDetachIsoFromServerRequest, options?: AxiosRequestConfig): AxiosPromise<ServerActionsDetachIsoFromServerResponse> {
            return localVarFp.detachIsoFromServer(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Disables the automatic backup option and deletes all existing Backups for a Server. No more additional charges for backups will be made.  Caution: This immediately removes all existing backups for the Server! 
         * @summary Disable Backups for a Server
         * @param {ServerActionsApiDisableBackupRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        disableBackup(requestParameters: ServerActionsApiDisableBackupRequest, options?: AxiosRequestConfig): AxiosPromise<ServerActionsDisableBackupResponse> {
            return localVarFp.disableBackup(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Disables the Hetzner Rescue System for a Server. This makes a Server start from its disks on next reboot.  Rescue Mode is automatically disabled when you first boot into it or if you do not use it for 60 minutes.  Disabling rescue mode will not reboot your Server — you will have to do this yourself. 
         * @summary Disable Rescue Mode for a Server
         * @param {ServerActionsApiDisableRescueModeRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        disableRescueMode(requestParameters: ServerActionsApiDisableRescueModeRequest, options?: AxiosRequestConfig): AxiosPromise<ServerActionsDisableRescueModeResponse> {
            return localVarFp.disableRescueMode(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Enables and configures the automatic daily backup option for the Server. Enabling automatic backups will increase the price of the Server by 20%. In return, you will get seven slots where Images of type backup can be stored.  Backups are automatically created daily. 
         * @summary Enable and Configure Backups for a Server
         * @param {ServerActionsApiEnableBackupRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        enableBackup(requestParameters: ServerActionsApiEnableBackupRequest, options?: AxiosRequestConfig): AxiosPromise<ServerActionsEnableBackupResponse> {
            return localVarFp.enableBackup(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Enable the Hetzner Rescue System for this Server. The next time a Server with enabled rescue mode boots it will start a special minimal Linux distribution designed for repair and reinstall.  In case a Server cannot boot on its own you can use this to access a Server’s disks.  Rescue Mode is automatically disabled when you first boot into it or if you do not use it for 60 minutes.  Enabling rescue mode will not [reboot](https://docs.hetzner.cloud/#server-actions-soft-reboot-a-server) your Server — you will have to do this yourself. 
         * @summary Enable Rescue Mode for a Server
         * @param {ServerActionsApiEnableRescueModeRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        enableRescueMode(requestParameters: ServerActionsApiEnableRescueModeRequest, options?: AxiosRequestConfig): AxiosPromise<ServerActionsEnableRescueModeResponse> {
            return localVarFp.enableRescueMode(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a specific Action object.
         * @summary Get an Action
         * @param {ServerActionsApiGetActionByIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getActionById(requestParameters: ServerActionsApiGetActionByIdRequest, options?: AxiosRequestConfig): AxiosPromise<ServerActionsGetActionByIdResponse> {
            return localVarFp.getActionById(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a specific Action object for a Server.
         * @summary Get an Action for a Server
         * @param {ServerActionsApiGetActionById0Request} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getActionById_1(requestParameters: ServerActionsApiGetActionById0Request, options?: AxiosRequestConfig): AxiosPromise<ServerActionsGetActionById200Response> {
            return localVarFp.getActionById_1(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns all Action objects. You can `sort` the results by using the sort URI parameter, and filter them with the `status` and `id` parameter.
         * @summary Get all Actions
         * @param {ServerActionsApiGetAllRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAll(requestParameters: ServerActionsApiGetAllRequest = {}, options?: AxiosRequestConfig): AxiosPromise<ServerActionsGetAllResponse> {
            return localVarFp.getAll(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns all Action objects for a Server. You can `sort` the results by using the sort URI parameter, and filter them with the `status` parameter.
         * @summary Get all Actions for a Server
         * @param {ServerActionsApiGetAllActionsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllActions(requestParameters: ServerActionsApiGetAllActionsRequest, options?: AxiosRequestConfig): AxiosPromise<ServerActionsGetAllActionsResponse> {
            return localVarFp.getAllActions(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Shuts down a Server gracefully by sending an ACPI shutdown request. The Server operating system must support ACPI and react to the request, otherwise the Server will not shut down. Please note that the `action` status in this case only reflects whether the action was sent to the server. It does not mean that the server actually shut down successfully. If you need to ensure that the server is off, use the `poweroff` action 
         * @summary Shutdown a Server
         * @param {ServerActionsApiGracefulShutdownRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        gracefulShutdown(requestParameters: ServerActionsApiGracefulShutdownRequest, options?: AxiosRequestConfig): AxiosPromise<ServerActionsGracefulShutdownResponse> {
            return localVarFp.gracefulShutdown(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Cuts power to the Server. This forcefully stops it without giving the Server operating system time to gracefully stop. May lead to data loss, equivalent to pulling the power cord. Power off should only be used when shutdown does not work.
         * @summary Power off a Server
         * @param {ServerActionsApiPowerOffServerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        powerOffServer(requestParameters: ServerActionsApiPowerOffServerRequest, options?: AxiosRequestConfig): AxiosPromise<ServerActionsPowerOffServerResponse> {
            return localVarFp.powerOffServer(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Starts a Server by turning its power on.
         * @summary Power on a Server
         * @param {ServerActionsApiPowerOnServerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        powerOnServer(requestParameters: ServerActionsApiPowerOnServerRequest, options?: AxiosRequestConfig): AxiosPromise<ServerActionsPowerOnServerResponse> {
            return localVarFp.powerOnServer(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Rebuilds a Server overwriting its disk with the content of an Image, thereby **destroying all data** on the target Server  The Image can either be one you have created earlier (`backup` or `snapshot` Image) or it can be a completely fresh `system` Image provided by us. You can get a list of all available Images with `GET /images`.  Your Server will automatically be powered off before the rebuild command executes. 
         * @summary Rebuild a Server from an Image
         * @param {ServerActionsApiRebuildServerFromImageRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        rebuildServerFromImage(requestParameters: ServerActionsApiRebuildServerFromImageRequest, options?: AxiosRequestConfig): AxiosPromise<ServerActionsRebuildServerFromImageResponse> {
            return localVarFp.rebuildServerFromImage(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Removes a Server from a Placement Group. 
         * @summary Remove from Placement Group
         * @param {ServerActionsApiRemoveFromPlacementGroupRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeFromPlacementGroup(requestParameters: ServerActionsApiRemoveFromPlacementGroupRequest, options?: AxiosRequestConfig): AxiosPromise<ServerActionsRemoveFromPlacementGroupResponse> {
            return localVarFp.removeFromPlacementGroup(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Requests credentials for remote access via VNC over websocket to keyboard, monitor, and mouse for a Server. The provided URL is valid for 1 minute, after this period a new url needs to be created to connect to the Server. How long the connection is open after the initial connect is not subject to this timeout.
         * @summary Request Console for a Server
         * @param {ServerActionsApiRequestConsoleRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        requestConsole(requestParameters: ServerActionsApiRequestConsoleRequest, options?: AxiosRequestConfig): AxiosPromise<ServerActionsRequestConsoleResponse> {
            return localVarFp.requestConsole(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Cuts power to a Server and starts it again. This forcefully stops it without giving the Server operating system time to gracefully stop. This may lead to data loss, it’s equivalent to pulling the power cord and plugging it in again. Reset should only be used when reboot does not work.
         * @summary Reset a Server
         * @param {ServerActionsApiResetServerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        resetServer(requestParameters: ServerActionsApiResetServerRequest, options?: AxiosRequestConfig): AxiosPromise<ServerActionsResetServerResponse> {
            return localVarFp.resetServer(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Resets the root password. Only works for Linux systems that are running the qemu guest agent. Server must be powered on (status `running`) in order for this operation to succeed.  This will generate a new password for this Server and return it.  If this does not succeed you can use the rescue system to netboot the Server and manually change your Server password by hand. 
         * @summary Reset root Password of a Server
         * @param {ServerActionsApiResetServerPasswordRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        resetServerPassword(requestParameters: ServerActionsApiResetServerPasswordRequest, options?: AxiosRequestConfig): AxiosPromise<ServerActionsResetServerPasswordResponse> {
            return localVarFp.resetServerPassword(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Reboots a Server gracefully by sending an ACPI request. The Server operating system must support ACPI and react to the request, otherwise the Server will not reboot.
         * @summary Soft-reboot a Server
         * @param {ServerActionsApiSoftRebootServerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        softRebootServer(requestParameters: ServerActionsApiSoftRebootServerRequest, options?: AxiosRequestConfig): AxiosPromise<ServerActionsSoftRebootServerResponse> {
            return localVarFp.softRebootServer(requestParameters, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for addToPlacementGroup operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiAddToPlacementGroupRequest
 */
export type ServerActionsApiAddToPlacementGroupRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServerActionsApiAddToPlacementGroup
    */
    readonly id: number
    
} & ServerActionsAddToPlacementGroupRequest

/**
 * Request parameters for attachIsoToServer operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiAttachIsoToServerRequest
 */
export type ServerActionsApiAttachIsoToServerRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServerActionsApiAttachIsoToServer
    */
    readonly id: number
    
} & ServerActionsAttachIsoToServerRequest

/**
 * Request parameters for attachToNetwork operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiAttachToNetworkRequest
 */
export type ServerActionsApiAttachToNetworkRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServerActionsApiAttachToNetwork
    */
    readonly id: number
    
} & ServerActionsAttachToNetworkRequest

/**
 * Request parameters for changeAliasIps operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiChangeAliasIpsRequest
 */
export type ServerActionsApiChangeAliasIpsRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServerActionsApiChangeAliasIps
    */
    readonly id: number
    
} & ServerActionsChangeAliasIpsRequest

/**
 * Request parameters for changeDnsPtr operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiChangeDnsPtrRequest
 */
export type ServerActionsApiChangeDnsPtrRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServerActionsApiChangeDnsPtr
    */
    readonly id: number
    
} & ServerActionsChangeDnsPtrRequest

/**
 * Request parameters for changeProtection operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiChangeProtectionRequest
 */
export type ServerActionsApiChangeProtectionRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServerActionsApiChangeProtection
    */
    readonly id: number
    
} & ServerActionsChangeProtectionRequest

/**
 * Request parameters for changeServerType operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiChangeServerTypeRequest
 */
export type ServerActionsApiChangeServerTypeRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServerActionsApiChangeServerType
    */
    readonly id: number
    
} & ServerActionsChangeServerTypeRequest

/**
 * Request parameters for createImage operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiCreateImageRequest
 */
export type ServerActionsApiCreateImageRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServerActionsApiCreateImage
    */
    readonly id: number
    
} & ServerActionsCreateImageRequest

/**
 * Request parameters for detachFromNetwork operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiDetachFromNetworkRequest
 */
export type ServerActionsApiDetachFromNetworkRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServerActionsApiDetachFromNetwork
    */
    readonly id: number
    
} & ServerActionsDetachFromNetworkRequest

/**
 * Request parameters for detachIsoFromServer operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiDetachIsoFromServerRequest
 */
export type ServerActionsApiDetachIsoFromServerRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServerActionsApiDetachIsoFromServer
    */
    readonly id: number
    
}

/**
 * Request parameters for disableBackup operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiDisableBackupRequest
 */
export type ServerActionsApiDisableBackupRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServerActionsApiDisableBackup
    */
    readonly id: number
    
}

/**
 * Request parameters for disableRescueMode operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiDisableRescueModeRequest
 */
export type ServerActionsApiDisableRescueModeRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServerActionsApiDisableRescueMode
    */
    readonly id: number
    
}

/**
 * Request parameters for enableBackup operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiEnableBackupRequest
 */
export type ServerActionsApiEnableBackupRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServerActionsApiEnableBackup
    */
    readonly id: number
    
}

/**
 * Request parameters for enableRescueMode operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiEnableRescueModeRequest
 */
export type ServerActionsApiEnableRescueModeRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServerActionsApiEnableRescueMode
    */
    readonly id: number
    
} & ServerActionsEnableRescueModeRequest

/**
 * Request parameters for getActionById operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiGetActionByIdRequest
 */
export type ServerActionsApiGetActionByIdRequest = {
    
    /**
    * ID of the Action.
    * @type {number}
    * @memberof ServerActionsApiGetActionById
    */
    readonly id: number
    
}

/**
 * Request parameters for getActionById_1 operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiGetActionById0Request
 */
export type ServerActionsApiGetActionById0Request = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServerActionsApiGetActionById0
    */
    readonly id: number
    
    /**
    * ID of the Action
    * @type {number}
    * @memberof ServerActionsApiGetActionById0
    */
    readonly actionId: number
    
}

/**
 * Request parameters for getAll operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiGetAllRequest
 */
export type ServerActionsApiGetAllRequest = {
    
    /**
    * Filter the actions by ID. Can be used multiple times. The response will only contain actions matching the specified IDs. 
    * @type {number}
    * @memberof ServerActionsApiGetAll
    */
    readonly id?: number
    
    /**
    * Sort actions by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 
    * @type {'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'}
    * @memberof ServerActionsApiGetAll
    */
    readonly sort?: 'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'
    
    /**
    * Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 
    * @type {'running' | 'success' | 'error'}
    * @memberof ServerActionsApiGetAll
    */
    readonly status?: 'running' | 'success' | 'error'
    
    /**
    * Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".
    * @type {number}
    * @memberof ServerActionsApiGetAll
    */
    readonly page?: number
    
    /**
    * Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".
    * @type {number}
    * @memberof ServerActionsApiGetAll
    */
    readonly perPage?: number
    
}

/**
 * Request parameters for getAllActions operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiGetAllActionsRequest
 */
export type ServerActionsApiGetAllActionsRequest = {
    
    /**
    * ID of the Resource.
    * @type {number}
    * @memberof ServerActionsApiGetAllActions
    */
    readonly id: number
    
    /**
    * Sort actions by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 
    * @type {'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'}
    * @memberof ServerActionsApiGetAllActions
    */
    readonly sort?: 'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'
    
    /**
    * Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 
    * @type {'running' | 'success' | 'error'}
    * @memberof ServerActionsApiGetAllActions
    */
    readonly status?: 'running' | 'success' | 'error'
    
    /**
    * Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".
    * @type {number}
    * @memberof ServerActionsApiGetAllActions
    */
    readonly page?: number
    
    /**
    * Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".
    * @type {number}
    * @memberof ServerActionsApiGetAllActions
    */
    readonly perPage?: number
    
}

/**
 * Request parameters for gracefulShutdown operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiGracefulShutdownRequest
 */
export type ServerActionsApiGracefulShutdownRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServerActionsApiGracefulShutdown
    */
    readonly id: number
    
}

/**
 * Request parameters for powerOffServer operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiPowerOffServerRequest
 */
export type ServerActionsApiPowerOffServerRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServerActionsApiPowerOffServer
    */
    readonly id: number
    
}

/**
 * Request parameters for powerOnServer operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiPowerOnServerRequest
 */
export type ServerActionsApiPowerOnServerRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServerActionsApiPowerOnServer
    */
    readonly id: number
    
}

/**
 * Request parameters for rebuildServerFromImage operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiRebuildServerFromImageRequest
 */
export type ServerActionsApiRebuildServerFromImageRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServerActionsApiRebuildServerFromImage
    */
    readonly id: number
    
} & ServerActionsRebuildServerFromImageRequest

/**
 * Request parameters for removeFromPlacementGroup operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiRemoveFromPlacementGroupRequest
 */
export type ServerActionsApiRemoveFromPlacementGroupRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServerActionsApiRemoveFromPlacementGroup
    */
    readonly id: number
    
}

/**
 * Request parameters for requestConsole operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiRequestConsoleRequest
 */
export type ServerActionsApiRequestConsoleRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServerActionsApiRequestConsole
    */
    readonly id: number
    
}

/**
 * Request parameters for resetServer operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiResetServerRequest
 */
export type ServerActionsApiResetServerRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServerActionsApiResetServer
    */
    readonly id: number
    
}

/**
 * Request parameters for resetServerPassword operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiResetServerPasswordRequest
 */
export type ServerActionsApiResetServerPasswordRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServerActionsApiResetServerPassword
    */
    readonly id: number
    
}

/**
 * Request parameters for softRebootServer operation in ServerActionsApi.
 * @export
 * @interface ServerActionsApiSoftRebootServerRequest
 */
export type ServerActionsApiSoftRebootServerRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServerActionsApiSoftRebootServer
    */
    readonly id: number
    
}

/**
 * ServerActionsApiGenerated - object-oriented interface
 * @export
 * @class ServerActionsApiGenerated
 * @extends {BaseAPI}
 */
export class ServerActionsApiGenerated extends BaseAPI {
    /**
     * Adds a Server to a Placement Group.  Server must be powered off for this command to succeed.  #### Call specific error codes  | Code                          | Description                                                          | |-------------------------------|----------------------------------------------------------------------| | `server_not_stopped`          | The action requires a stopped server                                 | 
     * @summary Add a Server to a Placement Group
     * @param {ServerActionsApiAddToPlacementGroupRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public addToPlacementGroup(requestParameters: ServerActionsApiAddToPlacementGroupRequest, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).addToPlacementGroup(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Attaches an ISO to a Server. The Server will immediately see it as a new disk. An already attached ISO will automatically be detached before the new ISO is attached.  Servers with attached ISOs have a modified boot order: They will try to boot from the ISO first before falling back to hard disk. 
     * @summary Attach an ISO to a Server
     * @param {ServerActionsApiAttachIsoToServerRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public attachIsoToServer(requestParameters: ServerActionsApiAttachIsoToServerRequest, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).attachIsoToServer(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Attaches a Server to a network. This will complement the fixed public Server interface by adding an additional ethernet interface to the Server which is connected to the specified network.  The Server will get an IP auto assigned from a subnet of type `server` in the same `network_zone`.  Using the `alias_ips` attribute you can also define one or more additional IPs to the Servers. Please note that you will have to configure these IPs by hand on your Server since only the primary IP will be given out by DHCP.  **Call specific error codes**  | Code                             | Description                                                           | |----------------------------------|-----------------------------------------------------------------------| | `server_already_attached`        | The server is already attached to the network                         | | `ip_not_available`               | The provided Network IP is not available                              | | `no_subnet_available`            | No Subnet or IP is available for the Server within the network        | | `networks_overlap`               | The network IP range overlaps with one of the server networks         | 
     * @summary Attach a Server to a Network
     * @param {ServerActionsApiAttachToNetworkRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public attachToNetwork(requestParameters: ServerActionsApiAttachToNetworkRequest, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).attachToNetwork(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Changes the alias IPs of an already attached Network. Note that the existing aliases for the specified Network will be replaced with these provided in the request body. So if you want to add an alias IP, you have to provide the existing ones from the Network plus the new alias IP in the request body.
     * @summary Change alias IPs of a Network
     * @param {ServerActionsApiChangeAliasIpsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public changeAliasIps(requestParameters: ServerActionsApiChangeAliasIpsRequest, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).changeAliasIps(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Changes the hostname that will appear when getting the hostname belonging to the primary IPs (IPv4 and IPv6) of this Server.  Floating IPs assigned to the Server are not affected by this. 
     * @summary Change reverse DNS entry for this Server
     * @param {ServerActionsApiChangeDnsPtrRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public changeDnsPtr(requestParameters: ServerActionsApiChangeDnsPtrRequest, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).changeDnsPtr(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Changes the protection configuration of the Server.
     * @summary Change Server Protection
     * @param {ServerActionsApiChangeProtectionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public changeProtection(requestParameters: ServerActionsApiChangeProtectionRequest, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).changeProtection(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Changes the type (Cores, RAM and disk sizes) of a Server.  Server must be powered off for this command to succeed.  This copies the content of its disk, and starts it again.  You can only migrate to Server types with the same `storage_type` and equal or bigger disks. Shrinking disks is not possible as it might destroy data.  If the disk gets upgraded, the Server type can not be downgraded any more. If you plan to downgrade the Server type, set `upgrade_disk` to `false`.  #### Call specific error codes  | Code                          | Description                                                          | |-------------------------------|----------------------------------------------------------------------| | `invalid_server_type`         | The server type does not fit for the given server or is deprecated   | | `server_not_stopped`          | The action requires a stopped server                                 | 
     * @summary Change the Type of a Server
     * @param {ServerActionsApiChangeServerTypeRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public changeServerType(requestParameters: ServerActionsApiChangeServerTypeRequest, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).changeServerType(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Creates an Image (snapshot) from a Server by copying the contents of its disks. This creates a snapshot of the current state of the disk and copies it into an Image. If the Server is currently running you must make sure that its disk content is consistent. Otherwise, the created Image may not be readable.  To make sure disk content is consistent, we recommend to shut down the Server prior to creating an Image.  You can either create a `backup` Image that is bound to the Server and therefore will be deleted when the Server is deleted, or you can create a `snapshot` Image which is completely independent of the Server it was created from and will survive Server deletion. Backup Images are only available when the backup option is enabled for the Server. Snapshot Images are billed on a per GB basis. 
     * @summary Create Image from a Server
     * @param {ServerActionsApiCreateImageRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public createImage(requestParameters: ServerActionsApiCreateImageRequest, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).createImage(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Detaches a Server from a network. The interface for this network will vanish.
     * @summary Detach a Server from a Network
     * @param {ServerActionsApiDetachFromNetworkRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public detachFromNetwork(requestParameters: ServerActionsApiDetachFromNetworkRequest, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).detachFromNetwork(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Detaches an ISO from a Server. In case no ISO Image is attached to the Server, the status of the returned Action is immediately set to `success`
     * @summary Detach an ISO from a Server
     * @param {ServerActionsApiDetachIsoFromServerRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public detachIsoFromServer(requestParameters: ServerActionsApiDetachIsoFromServerRequest, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).detachIsoFromServer(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Disables the automatic backup option and deletes all existing Backups for a Server. No more additional charges for backups will be made.  Caution: This immediately removes all existing backups for the Server! 
     * @summary Disable Backups for a Server
     * @param {ServerActionsApiDisableBackupRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public disableBackup(requestParameters: ServerActionsApiDisableBackupRequest, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).disableBackup(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Disables the Hetzner Rescue System for a Server. This makes a Server start from its disks on next reboot.  Rescue Mode is automatically disabled when you first boot into it or if you do not use it for 60 minutes.  Disabling rescue mode will not reboot your Server — you will have to do this yourself. 
     * @summary Disable Rescue Mode for a Server
     * @param {ServerActionsApiDisableRescueModeRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public disableRescueMode(requestParameters: ServerActionsApiDisableRescueModeRequest, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).disableRescueMode(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Enables and configures the automatic daily backup option for the Server. Enabling automatic backups will increase the price of the Server by 20%. In return, you will get seven slots where Images of type backup can be stored.  Backups are automatically created daily. 
     * @summary Enable and Configure Backups for a Server
     * @param {ServerActionsApiEnableBackupRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public enableBackup(requestParameters: ServerActionsApiEnableBackupRequest, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).enableBackup(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Enable the Hetzner Rescue System for this Server. The next time a Server with enabled rescue mode boots it will start a special minimal Linux distribution designed for repair and reinstall.  In case a Server cannot boot on its own you can use this to access a Server’s disks.  Rescue Mode is automatically disabled when you first boot into it or if you do not use it for 60 minutes.  Enabling rescue mode will not [reboot](https://docs.hetzner.cloud/#server-actions-soft-reboot-a-server) your Server — you will have to do this yourself. 
     * @summary Enable Rescue Mode for a Server
     * @param {ServerActionsApiEnableRescueModeRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public enableRescueMode(requestParameters: ServerActionsApiEnableRescueModeRequest, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).enableRescueMode(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a specific Action object.
     * @summary Get an Action
     * @param {ServerActionsApiGetActionByIdRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public getActionById(requestParameters: ServerActionsApiGetActionByIdRequest, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).getActionById(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a specific Action object for a Server.
     * @summary Get an Action for a Server
     * @param {ServerActionsApiGetActionById0Request} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public getActionById_1(requestParameters: ServerActionsApiGetActionById0Request, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).getActionById_1(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns all Action objects. You can `sort` the results by using the sort URI parameter, and filter them with the `status` and `id` parameter.
     * @summary Get all Actions
     * @param {ServerActionsApiGetAllRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public getAll(requestParameters: ServerActionsApiGetAllRequest = {}, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).getAll(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns all Action objects for a Server. You can `sort` the results by using the sort URI parameter, and filter them with the `status` parameter.
     * @summary Get all Actions for a Server
     * @param {ServerActionsApiGetAllActionsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public getAllActions(requestParameters: ServerActionsApiGetAllActionsRequest, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).getAllActions(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Shuts down a Server gracefully by sending an ACPI shutdown request. The Server operating system must support ACPI and react to the request, otherwise the Server will not shut down. Please note that the `action` status in this case only reflects whether the action was sent to the server. It does not mean that the server actually shut down successfully. If you need to ensure that the server is off, use the `poweroff` action 
     * @summary Shutdown a Server
     * @param {ServerActionsApiGracefulShutdownRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public gracefulShutdown(requestParameters: ServerActionsApiGracefulShutdownRequest, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).gracefulShutdown(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Cuts power to the Server. This forcefully stops it without giving the Server operating system time to gracefully stop. May lead to data loss, equivalent to pulling the power cord. Power off should only be used when shutdown does not work.
     * @summary Power off a Server
     * @param {ServerActionsApiPowerOffServerRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public powerOffServer(requestParameters: ServerActionsApiPowerOffServerRequest, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).powerOffServer(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Starts a Server by turning its power on.
     * @summary Power on a Server
     * @param {ServerActionsApiPowerOnServerRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public powerOnServer(requestParameters: ServerActionsApiPowerOnServerRequest, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).powerOnServer(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Rebuilds a Server overwriting its disk with the content of an Image, thereby **destroying all data** on the target Server  The Image can either be one you have created earlier (`backup` or `snapshot` Image) or it can be a completely fresh `system` Image provided by us. You can get a list of all available Images with `GET /images`.  Your Server will automatically be powered off before the rebuild command executes. 
     * @summary Rebuild a Server from an Image
     * @param {ServerActionsApiRebuildServerFromImageRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public rebuildServerFromImage(requestParameters: ServerActionsApiRebuildServerFromImageRequest, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).rebuildServerFromImage(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Removes a Server from a Placement Group. 
     * @summary Remove from Placement Group
     * @param {ServerActionsApiRemoveFromPlacementGroupRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public removeFromPlacementGroup(requestParameters: ServerActionsApiRemoveFromPlacementGroupRequest, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).removeFromPlacementGroup(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Requests credentials for remote access via VNC over websocket to keyboard, monitor, and mouse for a Server. The provided URL is valid for 1 minute, after this period a new url needs to be created to connect to the Server. How long the connection is open after the initial connect is not subject to this timeout.
     * @summary Request Console for a Server
     * @param {ServerActionsApiRequestConsoleRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public requestConsole(requestParameters: ServerActionsApiRequestConsoleRequest, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).requestConsole(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Cuts power to a Server and starts it again. This forcefully stops it without giving the Server operating system time to gracefully stop. This may lead to data loss, it’s equivalent to pulling the power cord and plugging it in again. Reset should only be used when reboot does not work.
     * @summary Reset a Server
     * @param {ServerActionsApiResetServerRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public resetServer(requestParameters: ServerActionsApiResetServerRequest, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).resetServer(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Resets the root password. Only works for Linux systems that are running the qemu guest agent. Server must be powered on (status `running`) in order for this operation to succeed.  This will generate a new password for this Server and return it.  If this does not succeed you can use the rescue system to netboot the Server and manually change your Server password by hand. 
     * @summary Reset root Password of a Server
     * @param {ServerActionsApiResetServerPasswordRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public resetServerPassword(requestParameters: ServerActionsApiResetServerPasswordRequest, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).resetServerPassword(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Reboots a Server gracefully by sending an ACPI request. The Server operating system must support ACPI and react to the request, otherwise the Server will not reboot.
     * @summary Soft-reboot a Server
     * @param {ServerActionsApiSoftRebootServerRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServerActionsApiGenerated
     */
    public softRebootServer(requestParameters: ServerActionsApiSoftRebootServerRequest, options?: AxiosRequestConfig) {
        return ServerActionsApiFp(this.configuration).softRebootServer(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }
}
