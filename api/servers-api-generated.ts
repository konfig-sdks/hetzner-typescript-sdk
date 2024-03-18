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
import { ServersCreateServerActionRequest } from '../models';
// @ts-ignore
import { ServersCreateServerActionRequestFirewallsInner } from '../models';
// @ts-ignore
import { ServersCreateServerActionRequestPublicNet } from '../models';
// @ts-ignore
import { ServersCreateServerActionResponse } from '../models';
// @ts-ignore
import { ServersDeleteServerResponse } from '../models';
// @ts-ignore
import { ServersGetAllResponse } from '../models';
// @ts-ignore
import { ServersGetMetricsForServerResponse } from '../models';
// @ts-ignore
import { ServersGetServerResponse } from '../models';
// @ts-ignore
import { ServersUpdateServerRequest } from '../models';
// @ts-ignore
import { ServersUpdateServerResponse } from '../models';
import { paginate } from "../pagination/paginate";
import type * as buffer from "buffer"
import { requestBeforeHook } from '../requestBeforeHook';
/**
 * ServersApi - axios parameter creator
 * @export
 */
export const ServersApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Creates a new Server. Returns preliminary information about the Server as well as an Action that covers progress of creation.
         * @summary Create a Server
         * @param {ServersCreateServerActionRequest} [serversCreateServerActionRequest] Please note that Server names must be unique per Project and valid hostnames as per RFC 1123 (i.e. may only contain letters, digits, periods, and dashes).  For &#x60;server_type&#x60; you can either use the ID as listed in &#x60;/server_types&#x60; or its name.  For &#x60;image&#x60; you can either use the ID as listed in &#x60;/images&#x60; or its name.  If you want to create the Server in a Location, you must set &#x60;location&#x60; to the ID or name as listed in &#x60;/locations&#x60;. This is the recommended way. You can be even more specific by setting &#x60;datacenter&#x60; to the ID or name as listed in &#x60;/datacenters&#x60;. However we only recommend this if you want to assign a specific Primary IP to the Server which is located in the specified Datacenter.  Some properties like &#x60;start_after_create&#x60; or &#x60;automount&#x60; will trigger Actions after the Server is created. Those Actions are listed in the &#x60;next_actions&#x60; field in the response.  For accessing your Server we strongly recommend to use SSH keys by passing the respective key IDs in &#x60;ssh_keys&#x60;. If you do not specify any &#x60;ssh_keys&#x60; we will generate a root password for you and return it in the response.  Please note that provided user-data is stored in our systems. While we take measures to protect it we highly recommend that you don’t use it to store passwords or other sensitive information.  #### Call specific error codes  | Code                             | Description                                                | |----------------------------------|------------------------------------------------------------| | &#x60;placement_error&#x60;                | An error during the placement occurred                     | | &#x60;primary_ip_assigned&#x60;            | The specified Primary IP is already assigned to a server   | | &#x60;primary_ip_datacenter_mismatch&#x60; | The specified Primary IP is in a different datacenter      | | &#x60;primary_ip_version_mismatch&#x60;    | The specified Primary IP has the wrong IP Version          | 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createServerAction: async (serversCreateServerActionRequest?: ServersCreateServerActionRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/servers`;
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
                requestBody: serversCreateServerActionRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/servers',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(serversCreateServerActionRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Deletes a Server. This immediately removes the Server from your account, and it is no longer accessible. Any resources attached to the server (like Volumes, Primary IPs, Floating IPs, Firewalls, Placement Groups) are detached while the server is deleted. 
         * @summary Delete a Server
         * @param {number} id ID of the Server
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteServer: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('deleteServer', 'id', id)
            const localVarPath = `/servers/{id}`
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
                pathTemplate: '/servers/{id}',
                httpMethod: 'DELETE'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns all existing Server objects
         * @summary Get all Servers
         * @param {string} [name] Filter resources by their name. The response will only contain the resources matching the specified name. 
         * @param {string} [labelSelector] Filter resources by labels. The response will only contain resources matching the label selector. For more information, see \&quot;[Label Selector](https://docs.hetzner.cloud)\&quot;. 
         * @param {'id' | 'id:asc' | 'id:desc' | 'name' | 'name:asc' | 'name:desc' | 'created' | 'created:asc' | 'created:desc'} [sort] Sort resources by field and direction. Can be used multiple times. For more information, see \&quot;[Sorting](https://docs.hetzner.cloud)\&quot;. 
         * @param {'initializing' | 'starting' | 'running' | 'stopping' | 'false' | 'deleting' | 'rebuilding' | 'migrating' | 'unknown'} [status] Can be used multiple times. The response will only contain Server matching the status
         * @param {number} [page] Page number to return. For more information, see \&quot;[Pagination](https://docs.hetzner.cloud)\&quot;.
         * @param {number} [perPage] Maximum number of entries returned per page. For more information, see \&quot;[Pagination](https://docs.hetzner.cloud)\&quot;.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAll: async (name?: string, labelSelector?: string, sort?: 'id' | 'id:asc' | 'id:desc' | 'name' | 'name:asc' | 'name:desc' | 'created' | 'created:asc' | 'created:desc', status?: 'initializing' | 'starting' | 'running' | 'stopping' | 'false' | 'deleting' | 'rebuilding' | 'migrating' | 'unknown', page?: number, perPage?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/servers`;
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
            if (name !== undefined) {
                localVarQueryParameter['name'] = name;
            }

            if (labelSelector !== undefined) {
                localVarQueryParameter['label_selector'] = labelSelector;
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
                pathTemplate: '/servers',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Get Metrics for specified Server.  You must specify the type of metric to get: cpu, disk or network. You can also specify more than one type by comma separation, e.g. cpu,disk.  Depending on the type you will get different time series data  | Type    | Timeseries              | Unit      | Description                                          | |---------|-------------------------|-----------|------------------------------------------------------| | cpu     | cpu                     | percent   | Percent CPU usage                                    | | disk    | disk.0.iops.read        | iop/s     | Number of read IO operations per second              | |         | disk.0.iops.write       | iop/s     | Number of write IO operations per second             | |         | disk.0.bandwidth.read   | bytes/s   | Bytes read per second                                | |         | disk.0.bandwidth.write  | bytes/s   | Bytes written per second                             | | network | network.0.pps.in        | packets/s | Public Network interface packets per second received | |         | network.0.pps.out       | packets/s | Public Network interface packets per second sent     | |         | network.0.bandwidth.in  | bytes/s   | Public Network interface bytes/s received            | |         | network.0.bandwidth.out | bytes/s   | Public Network interface bytes/s sent                |  Metrics are available for the last 30 days only.  If you do not provide the step argument we will automatically adjust it so that a maximum of 200 samples are returned.  We limit the number of samples returned to a maximum of 500 and will adjust the step parameter accordingly. 
         * @summary Get Metrics for a Server
         * @param {number} id ID of the Server
         * @param {'cpu' | 'disk' | 'network'} type Type of metrics to get
         * @param {string} start Start of period to get Metrics for (in ISO-8601 format)
         * @param {string} end End of period to get Metrics for (in ISO-8601 format)
         * @param {string} [step] Resolution of results in seconds
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMetricsForServer: async (id: number, type: 'cpu' | 'disk' | 'network', start: string, end: string, step?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getMetricsForServer', 'id', id)
            // verify required parameter 'type' is not null or undefined
            assertParamExists('getMetricsForServer', 'type', type)
            // verify required parameter 'start' is not null or undefined
            assertParamExists('getMetricsForServer', 'start', start)
            // verify required parameter 'end' is not null or undefined
            assertParamExists('getMetricsForServer', 'end', end)
            const localVarPath = `/servers/{id}/metrics`
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
                pathTemplate: '/servers/{id}/metrics',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns a specific Server object. The Server must exist inside the Project
         * @summary Get a Server
         * @param {number} id ID of the Server
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getServer: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getServer', 'id', id)
            const localVarPath = `/servers/{id}`
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
                pathTemplate: '/servers/{id}',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Updates a Server. You can update a Server’s name and a Server’s labels. Please note that Server names must be unique per Project and valid hostnames as per RFC 1123 (i.e. may only contain letters, digits, periods, and dashes). Also note that when updating labels, the Server’s current set of labels will be replaced with the labels provided in the request body. So, for example, if you want to add a new label, you have to provide all existing labels plus the new label in the request body.
         * @summary Update a Server
         * @param {number} id ID of the Server
         * @param {ServersUpdateServerRequest} [serversUpdateServerRequest] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateServer: async (id: number, serversUpdateServerRequest?: ServersUpdateServerRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('updateServer', 'id', id)
            const localVarPath = `/servers/{id}`
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
                requestBody: serversUpdateServerRequest,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/servers/{id}',
                httpMethod: 'PUT'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(serversUpdateServerRequest, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ServersApi - functional programming interface
 * @export
 */
export const ServersApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ServersApiAxiosParamCreator(configuration)
    return {
        /**
         * Creates a new Server. Returns preliminary information about the Server as well as an Action that covers progress of creation.
         * @summary Create a Server
         * @param {ServersApiCreateServerActionRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createServerAction(requestParameters: ServersApiCreateServerActionRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServersCreateServerActionResponse>> {
            const serversCreateServerActionRequest: ServersCreateServerActionRequest = {
                automount: requestParameters.automount,
                datacenter: requestParameters.datacenter,
                firewalls: requestParameters.firewalls,
                image: requestParameters.image,
                labels: requestParameters.labels,
                location: requestParameters.location,
                name: requestParameters.name,
                networks: requestParameters.networks,
                placement_group: requestParameters.placement_group,
                public_net: requestParameters.public_net,
                server_type: requestParameters.server_type,
                ssh_keys: requestParameters.ssh_keys,
                start_after_create: requestParameters.start_after_create,
                user_data: requestParameters.user_data,
                volumes: requestParameters.volumes
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.createServerAction(serversCreateServerActionRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Deletes a Server. This immediately removes the Server from your account, and it is no longer accessible. Any resources attached to the server (like Volumes, Primary IPs, Floating IPs, Firewalls, Placement Groups) are detached while the server is deleted. 
         * @summary Delete a Server
         * @param {ServersApiDeleteServerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteServer(requestParameters: ServersApiDeleteServerRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServersDeleteServerResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteServer(requestParameters.id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns all existing Server objects
         * @summary Get all Servers
         * @param {ServersApiGetAllRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAll(requestParameters: ServersApiGetAllRequest = {}, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServersGetAllResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAll(requestParameters.name, requestParameters.labelSelector, requestParameters.sort, requestParameters.status, requestParameters.page, requestParameters.perPage, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Get Metrics for specified Server.  You must specify the type of metric to get: cpu, disk or network. You can also specify more than one type by comma separation, e.g. cpu,disk.  Depending on the type you will get different time series data  | Type    | Timeseries              | Unit      | Description                                          | |---------|-------------------------|-----------|------------------------------------------------------| | cpu     | cpu                     | percent   | Percent CPU usage                                    | | disk    | disk.0.iops.read        | iop/s     | Number of read IO operations per second              | |         | disk.0.iops.write       | iop/s     | Number of write IO operations per second             | |         | disk.0.bandwidth.read   | bytes/s   | Bytes read per second                                | |         | disk.0.bandwidth.write  | bytes/s   | Bytes written per second                             | | network | network.0.pps.in        | packets/s | Public Network interface packets per second received | |         | network.0.pps.out       | packets/s | Public Network interface packets per second sent     | |         | network.0.bandwidth.in  | bytes/s   | Public Network interface bytes/s received            | |         | network.0.bandwidth.out | bytes/s   | Public Network interface bytes/s sent                |  Metrics are available for the last 30 days only.  If you do not provide the step argument we will automatically adjust it so that a maximum of 200 samples are returned.  We limit the number of samples returned to a maximum of 500 and will adjust the step parameter accordingly. 
         * @summary Get Metrics for a Server
         * @param {ServersApiGetMetricsForServerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getMetricsForServer(requestParameters: ServersApiGetMetricsForServerRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServersGetMetricsForServerResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getMetricsForServer(requestParameters.id, requestParameters.type, requestParameters.start, requestParameters.end, requestParameters.step, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns a specific Server object. The Server must exist inside the Project
         * @summary Get a Server
         * @param {ServersApiGetServerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getServer(requestParameters: ServersApiGetServerRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServersGetServerResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getServer(requestParameters.id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Updates a Server. You can update a Server’s name and a Server’s labels. Please note that Server names must be unique per Project and valid hostnames as per RFC 1123 (i.e. may only contain letters, digits, periods, and dashes). Also note that when updating labels, the Server’s current set of labels will be replaced with the labels provided in the request body. So, for example, if you want to add a new label, you have to provide all existing labels plus the new label in the request body.
         * @summary Update a Server
         * @param {ServersApiUpdateServerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateServer(requestParameters: ServersApiUpdateServerRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ServersUpdateServerResponse>> {
            const serversUpdateServerRequest: ServersUpdateServerRequest = {
                labels: requestParameters.labels,
                name: requestParameters.name
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateServer(requestParameters.id, serversUpdateServerRequest, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ServersApi - factory interface
 * @export
 */
export const ServersApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ServersApiFp(configuration)
    return {
        /**
         * Creates a new Server. Returns preliminary information about the Server as well as an Action that covers progress of creation.
         * @summary Create a Server
         * @param {ServersApiCreateServerActionRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createServerAction(requestParameters: ServersApiCreateServerActionRequest, options?: AxiosRequestConfig): AxiosPromise<ServersCreateServerActionResponse> {
            return localVarFp.createServerAction(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Deletes a Server. This immediately removes the Server from your account, and it is no longer accessible. Any resources attached to the server (like Volumes, Primary IPs, Floating IPs, Firewalls, Placement Groups) are detached while the server is deleted. 
         * @summary Delete a Server
         * @param {ServersApiDeleteServerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteServer(requestParameters: ServersApiDeleteServerRequest, options?: AxiosRequestConfig): AxiosPromise<ServersDeleteServerResponse> {
            return localVarFp.deleteServer(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns all existing Server objects
         * @summary Get all Servers
         * @param {ServersApiGetAllRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAll(requestParameters: ServersApiGetAllRequest = {}, options?: AxiosRequestConfig): AxiosPromise<ServersGetAllResponse> {
            return localVarFp.getAll(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Get Metrics for specified Server.  You must specify the type of metric to get: cpu, disk or network. You can also specify more than one type by comma separation, e.g. cpu,disk.  Depending on the type you will get different time series data  | Type    | Timeseries              | Unit      | Description                                          | |---------|-------------------------|-----------|------------------------------------------------------| | cpu     | cpu                     | percent   | Percent CPU usage                                    | | disk    | disk.0.iops.read        | iop/s     | Number of read IO operations per second              | |         | disk.0.iops.write       | iop/s     | Number of write IO operations per second             | |         | disk.0.bandwidth.read   | bytes/s   | Bytes read per second                                | |         | disk.0.bandwidth.write  | bytes/s   | Bytes written per second                             | | network | network.0.pps.in        | packets/s | Public Network interface packets per second received | |         | network.0.pps.out       | packets/s | Public Network interface packets per second sent     | |         | network.0.bandwidth.in  | bytes/s   | Public Network interface bytes/s received            | |         | network.0.bandwidth.out | bytes/s   | Public Network interface bytes/s sent                |  Metrics are available for the last 30 days only.  If you do not provide the step argument we will automatically adjust it so that a maximum of 200 samples are returned.  We limit the number of samples returned to a maximum of 500 and will adjust the step parameter accordingly. 
         * @summary Get Metrics for a Server
         * @param {ServersApiGetMetricsForServerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMetricsForServer(requestParameters: ServersApiGetMetricsForServerRequest, options?: AxiosRequestConfig): AxiosPromise<ServersGetMetricsForServerResponse> {
            return localVarFp.getMetricsForServer(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a specific Server object. The Server must exist inside the Project
         * @summary Get a Server
         * @param {ServersApiGetServerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getServer(requestParameters: ServersApiGetServerRequest, options?: AxiosRequestConfig): AxiosPromise<ServersGetServerResponse> {
            return localVarFp.getServer(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Updates a Server. You can update a Server’s name and a Server’s labels. Please note that Server names must be unique per Project and valid hostnames as per RFC 1123 (i.e. may only contain letters, digits, periods, and dashes). Also note that when updating labels, the Server’s current set of labels will be replaced with the labels provided in the request body. So, for example, if you want to add a new label, you have to provide all existing labels plus the new label in the request body.
         * @summary Update a Server
         * @param {ServersApiUpdateServerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateServer(requestParameters: ServersApiUpdateServerRequest, options?: AxiosRequestConfig): AxiosPromise<ServersUpdateServerResponse> {
            return localVarFp.updateServer(requestParameters, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for createServerAction operation in ServersApi.
 * @export
 * @interface ServersApiCreateServerActionRequest
 */
export type ServersApiCreateServerActionRequest = {
    
} & ServersCreateServerActionRequest

/**
 * Request parameters for deleteServer operation in ServersApi.
 * @export
 * @interface ServersApiDeleteServerRequest
 */
export type ServersApiDeleteServerRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServersApiDeleteServer
    */
    readonly id: number
    
}

/**
 * Request parameters for getAll operation in ServersApi.
 * @export
 * @interface ServersApiGetAllRequest
 */
export type ServersApiGetAllRequest = {
    
    /**
    * Filter resources by their name. The response will only contain the resources matching the specified name. 
    * @type {string}
    * @memberof ServersApiGetAll
    */
    readonly name?: string
    
    /**
    * Filter resources by labels. The response will only contain resources matching the label selector. For more information, see \"[Label Selector](https://docs.hetzner.cloud)\". 
    * @type {string}
    * @memberof ServersApiGetAll
    */
    readonly labelSelector?: string
    
    /**
    * Sort resources by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 
    * @type {'id' | 'id:asc' | 'id:desc' | 'name' | 'name:asc' | 'name:desc' | 'created' | 'created:asc' | 'created:desc'}
    * @memberof ServersApiGetAll
    */
    readonly sort?: 'id' | 'id:asc' | 'id:desc' | 'name' | 'name:asc' | 'name:desc' | 'created' | 'created:asc' | 'created:desc'
    
    /**
    * Can be used multiple times. The response will only contain Server matching the status
    * @type {'initializing' | 'starting' | 'running' | 'stopping' | 'false' | 'deleting' | 'rebuilding' | 'migrating' | 'unknown'}
    * @memberof ServersApiGetAll
    */
    readonly status?: 'initializing' | 'starting' | 'running' | 'stopping' | 'false' | 'deleting' | 'rebuilding' | 'migrating' | 'unknown'
    
    /**
    * Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".
    * @type {number}
    * @memberof ServersApiGetAll
    */
    readonly page?: number
    
    /**
    * Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".
    * @type {number}
    * @memberof ServersApiGetAll
    */
    readonly perPage?: number
    
}

/**
 * Request parameters for getMetricsForServer operation in ServersApi.
 * @export
 * @interface ServersApiGetMetricsForServerRequest
 */
export type ServersApiGetMetricsForServerRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServersApiGetMetricsForServer
    */
    readonly id: number
    
    /**
    * Type of metrics to get
    * @type {'cpu' | 'disk' | 'network'}
    * @memberof ServersApiGetMetricsForServer
    */
    readonly type: 'cpu' | 'disk' | 'network'
    
    /**
    * Start of period to get Metrics for (in ISO-8601 format)
    * @type {string}
    * @memberof ServersApiGetMetricsForServer
    */
    readonly start: string
    
    /**
    * End of period to get Metrics for (in ISO-8601 format)
    * @type {string}
    * @memberof ServersApiGetMetricsForServer
    */
    readonly end: string
    
    /**
    * Resolution of results in seconds
    * @type {string}
    * @memberof ServersApiGetMetricsForServer
    */
    readonly step?: string
    
}

/**
 * Request parameters for getServer operation in ServersApi.
 * @export
 * @interface ServersApiGetServerRequest
 */
export type ServersApiGetServerRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServersApiGetServer
    */
    readonly id: number
    
}

/**
 * Request parameters for updateServer operation in ServersApi.
 * @export
 * @interface ServersApiUpdateServerRequest
 */
export type ServersApiUpdateServerRequest = {
    
    /**
    * ID of the Server
    * @type {number}
    * @memberof ServersApiUpdateServer
    */
    readonly id: number
    
} & ServersUpdateServerRequest

/**
 * ServersApiGenerated - object-oriented interface
 * @export
 * @class ServersApiGenerated
 * @extends {BaseAPI}
 */
export class ServersApiGenerated extends BaseAPI {
    /**
     * Creates a new Server. Returns preliminary information about the Server as well as an Action that covers progress of creation.
     * @summary Create a Server
     * @param {ServersApiCreateServerActionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServersApiGenerated
     */
    public createServerAction(requestParameters: ServersApiCreateServerActionRequest, options?: AxiosRequestConfig) {
        return ServersApiFp(this.configuration).createServerAction(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Deletes a Server. This immediately removes the Server from your account, and it is no longer accessible. Any resources attached to the server (like Volumes, Primary IPs, Floating IPs, Firewalls, Placement Groups) are detached while the server is deleted. 
     * @summary Delete a Server
     * @param {ServersApiDeleteServerRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServersApiGenerated
     */
    public deleteServer(requestParameters: ServersApiDeleteServerRequest, options?: AxiosRequestConfig) {
        return ServersApiFp(this.configuration).deleteServer(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns all existing Server objects
     * @summary Get all Servers
     * @param {ServersApiGetAllRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServersApiGenerated
     */
    public getAll(requestParameters: ServersApiGetAllRequest = {}, options?: AxiosRequestConfig) {
        return ServersApiFp(this.configuration).getAll(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get Metrics for specified Server.  You must specify the type of metric to get: cpu, disk or network. You can also specify more than one type by comma separation, e.g. cpu,disk.  Depending on the type you will get different time series data  | Type    | Timeseries              | Unit      | Description                                          | |---------|-------------------------|-----------|------------------------------------------------------| | cpu     | cpu                     | percent   | Percent CPU usage                                    | | disk    | disk.0.iops.read        | iop/s     | Number of read IO operations per second              | |         | disk.0.iops.write       | iop/s     | Number of write IO operations per second             | |         | disk.0.bandwidth.read   | bytes/s   | Bytes read per second                                | |         | disk.0.bandwidth.write  | bytes/s   | Bytes written per second                             | | network | network.0.pps.in        | packets/s | Public Network interface packets per second received | |         | network.0.pps.out       | packets/s | Public Network interface packets per second sent     | |         | network.0.bandwidth.in  | bytes/s   | Public Network interface bytes/s received            | |         | network.0.bandwidth.out | bytes/s   | Public Network interface bytes/s sent                |  Metrics are available for the last 30 days only.  If you do not provide the step argument we will automatically adjust it so that a maximum of 200 samples are returned.  We limit the number of samples returned to a maximum of 500 and will adjust the step parameter accordingly. 
     * @summary Get Metrics for a Server
     * @param {ServersApiGetMetricsForServerRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServersApiGenerated
     */
    public getMetricsForServer(requestParameters: ServersApiGetMetricsForServerRequest, options?: AxiosRequestConfig) {
        return ServersApiFp(this.configuration).getMetricsForServer(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a specific Server object. The Server must exist inside the Project
     * @summary Get a Server
     * @param {ServersApiGetServerRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServersApiGenerated
     */
    public getServer(requestParameters: ServersApiGetServerRequest, options?: AxiosRequestConfig) {
        return ServersApiFp(this.configuration).getServer(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Updates a Server. You can update a Server’s name and a Server’s labels. Please note that Server names must be unique per Project and valid hostnames as per RFC 1123 (i.e. may only contain letters, digits, periods, and dashes). Also note that when updating labels, the Server’s current set of labels will be replaced with the labels provided in the request body. So, for example, if you want to add a new label, you have to provide all existing labels plus the new label in the request body.
     * @summary Update a Server
     * @param {ServersApiUpdateServerRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ServersApiGenerated
     */
    public updateServer(requestParameters: ServersApiUpdateServerRequest, options?: AxiosRequestConfig) {
        return ServersApiFp(this.configuration).updateServer(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }
}
