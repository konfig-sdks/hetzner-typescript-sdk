<div align="left">

[![Visit Hetzner](./header.png)](https://hetzner.com)

# [Hetzner](https://hetzner.com)<a id="hetzner"></a>

This is the official documentation for the Hetzner Cloud API.

## Introduction<a id="introduction"></a>

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

## Getting Started<a id="getting-started"></a>

To get started using the API you first need an API token. Sign in into the [Hetzner Cloud Console](https://console.hetzner.cloud/) choose a Project, go to `Security` → `API Tokens`, and generate a new token. Make sure to copy the token because it won’t be shown to you again. A token is bound to a Project, to interact with the API of another Project you have to create a new token inside the Project. Let’s say your new token is `LRK9DAWQ1ZAEFSrCNEEzLCUwhYX1U3g7wMg4dTlkkDC96fyDuyJ39nVbVjCKSDfj`.

You’re now ready to do your first request against the API. To get a list of all Servers in your Project, issue the example request on the right side using [curl](https://curl.se/).

Make sure to replace the token in the example command with the token you have just created. Since your Project probably does not contain any Servers yet, the example response will look like the response on the right side. We will almost always provide a resource root like `servers` inside the example response. A response can also contain a `meta` object with information like [Pagination](https://docs.hetzner.cloud).

**Example Request**

```bash
curl -H "Authorization: Bearer LRK9DAWQ1ZAEFSrCNEEzLCUwhYX1U3g7wMg4dTlkkDC96fyDuyJ39nVbVjCKSDfj" \
  https://api.hetzner.cloud/v1/servers
```

**Example Response**

```json
{
  "servers": [],
  "meta": {
    "pagination": {
      "page": 1,
      "per_page": 25,
      "previous_page": null,
      "next_page": null,
      "last_page": 1,
      "total_entries": 0
    }
  }
}
```

## Authentication<a id="authentication"></a>

All requests to the Hetzner Cloud API must be authenticated via a API token. Include your secret API token in every request you send to the API with the `Authorization` HTTP header.

To create a new API token for your Project, switch into the [Hetzner Cloud Console](https://console.hetzner.cloud/) choose a Project, go to `Security` → `API Tokens`, and generate a new token.

**Example Authorization header**

```http
Authorization: Bearer LRK9DAWQ1ZAEFSrCNEEzLCUwhYX1U3g7wMg4dTlkkDC96fyDuyJ39nVbVjCKSDfj
```

## Errors<a id="errors"></a>

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
  "error": {
    "code": "invalid_input",
    "message": "invalid input in field 'broken_field': is too long",
    "details": {
      "fields": [
        {
          "name": "broken_field",
          "messages": ["is too long"]
        }
      ]
    }
  }
}
```

### Error Codes<a id="error-codes"></a>

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
  "error": {
    "code": "invalid_input",
    "message": "invalid input in field 'broken_field': is too long",
    "details": {
      "fields": [
        {
          "name": "broken_field",
          "messages": ["is too long"]
        }
      ]
    }
  }
}
```

**uniqueness_error**

```json
{
  "error": {
    "code": "uniqueness_error",
    "message": "SSH key with the same fingerprint already exists",
    "details": {
      "fields": [
        {
          "name": "public_key"
        }
      ]
    }
  }
}
```

**resource_limit_exceeded**

```json
{
  "error": {
    "code": "resource_limit_exceeded",
    "message": "project limit exceeded",
    "details": {
      "limits": [
        {
          "name": "project_limit"
        }
      ]
    }
  }
}
```

## Labels<a id="labels"></a>

Labels are `key/value` pairs that can be attached to all resources.

Valid label keys have two segments: an optional prefix and name, separated by a slash (`/`). The name segment is required and must be a string of 63 characters or less, beginning and ending with an alphanumeric character (`[a-z0-9A-Z]`) with dashes (`-`), underscores (`_`), dots (`.`), and alphanumerics between. The prefix is optional. If specified, the prefix must be a DNS subdomain: a series of DNS labels separated by dots (`.`), not longer than 253 characters in total, followed by a slash (`/`).

Valid label values must be a string of 63 characters or less and must be empty or begin and end with an alphanumeric character (`[a-z0-9A-Z]`) with dashes (`-`), underscores (`_`), dots (`.`), and alphanumerics between.

The `hetzner.cloud/` prefix is reserved and cannot be used.

**Example Labels**

```json
{
  "labels": {
    "environment": "development",
    "service": "backend",
    "example.com/my": "label",
    "just-a-key": ""
  }
}
```

## Label Selector<a id="label-selector"></a>

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

### Examples<a id="examples"></a>

- Returns all resources that have a `env=production` label and that don't have a `type=database` label:

  `env=production,type!=database`

- Returns all resources that have a `env=testing` or `env=staging` label:

  `env in (testing,staging)`

- Returns all resources that don't have a `type` label:

  `!type`

## Pagination<a id="pagination"></a>

Responses which return multiple items support pagination. If they do support pagination, it can be controlled with following query string parameters:

- A `page` parameter specifies the page to fetch. The number of the first page is 1.
- A `per_page` parameter specifies the number of items returned per page. The default value is 25, the maximum value is 50 except otherwise specified in the documentation.

Responses contain a `Link` header with pagination information.

Additionally, if the response body is JSON and the root object is an object, that object has a `pagination` object inside the `meta` object with pagination information:

**Example Pagination**

```json
{
    "servers": [...],
    "meta": {
        "pagination": {
            "page": 2,
            "per_page": 25,
            "previous_page": 1,
            "next_page": 3,
            "last_page": 4,
            "total_entries": 100
        }
    }
}
```

The keys `previous_page`, `next_page`, `last_page`, and `total_entries` may be `null` when on the first page, last page, or when the total number of entries is unknown.

**Example Pagination Link header**

```http
Link: <https://api.hetzner.cloud/v1/actions?page=2&per_page=5>; rel="prev",
      <https://api.hetzner.cloud/v1/actions?page=4&per_page=5>; rel="next",
      <https://api.hetzner.cloud/v1/actions?page=6&per_page=5>; rel="last"
```

Line breaks have been added for display purposes only and responses may only contain some of the above `rel` values.

## Rate Limiting<a id="rate-limiting"></a>

All requests, whether they are authenticated or not, are subject to rate limiting. If you have reached your limit, your requests will be handled with a `429 Too Many Requests` error. Burst requests are allowed. Responses contain serveral headers which provide information about your current rate limit status.

- The `RateLimit-Limit` header contains the total number of requests you can perform per hour.
- The `RateLimit-Remaining` header contains the number of requests remaining in the current rate limit time frame.
- The `RateLimit-Reset` header contains a UNIX timestamp of the point in time when your rate limit will have recovered and you will have the full number of requests available again.

The default limit is 3600 requests per hour and per Project. The number of remaining requests increases gradually. For example, when your limit is 3600 requests per hour, the number of remaining requests will increase by 1 every second.

## Server Metadata<a id="server-metadata"></a>

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

## Sorting<a id="sorting"></a>

Some responses which return multiple items support sorting. If they do support sorting the documentation states which fields can be used for sorting. You specify sorting with the `sort` query string parameter. You can sort by multiple fields. You can set the sort direction by appending `:asc` or `:desc` to the field name. By default, ascending sorting is used.

**Example: Sorting**

```
https://api.hetzner.cloud/v1/actions?sort=status
https://api.hetzner.cloud/v1/actions?sort=status:asc
https://api.hetzner.cloud/v1/actions?sort=status:desc
https://api.hetzner.cloud/v1/actions?sort=status:asc&sort=command:desc
```

## Deprecation Notices<a id="deprecation-notices"></a>

You can find all announced deprecations in our [Changelog](https://docs.hetzner.cloud).


</div>

## Table of Contents<a id="table-of-contents"></a>

<!-- toc -->

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Reference](#reference)
  * [`hetzner.actions.getAll`](#hetzneractionsgetall)
  * [`hetzner.actions.getById`](#hetzneractionsgetbyid)
  * [`hetzner.certificateActions.getAction`](#hetznercertificateactionsgetaction)
  * [`hetzner.certificateActions.getActionById`](#hetznercertificateactionsgetactionbyid)
  * [`hetzner.certificateActions.getAllActions`](#hetznercertificateactionsgetallactions)
  * [`hetzner.certificateActions.getAllActions_0`](#hetznercertificateactionsgetallactions_0)
  * [`hetzner.certificateActions.retryIssuanceOrRenewal`](#hetznercertificateactionsretryissuanceorrenewal)
  * [`hetzner.certificates.createNewCertificate`](#hetznercertificatescreatenewcertificate)
  * [`hetzner.certificates.deleteCertificate`](#hetznercertificatesdeletecertificate)
  * [`hetzner.certificates.getAll`](#hetznercertificatesgetall)
  * [`hetzner.certificates.getById`](#hetznercertificatesgetbyid)
  * [`hetzner.certificates.updateById`](#hetznercertificatesupdatebyid)
  * [`hetzner.datacenters.getAll`](#hetznerdatacentersgetall)
  * [`hetzner.datacenters.getById`](#hetznerdatacentersgetbyid)
  * [`hetzner.firewallActions.applyToResources`](#hetznerfirewallactionsapplytoresources)
  * [`hetzner.firewallActions.getActionById`](#hetznerfirewallactionsgetactionbyid)
  * [`hetzner.firewallActions.getActionById_0`](#hetznerfirewallactionsgetactionbyid_0)
  * [`hetzner.firewallActions.getAllActions`](#hetznerfirewallactionsgetallactions)
  * [`hetzner.firewallActions.getAllActions_0`](#hetznerfirewallactionsgetallactions_0)
  * [`hetzner.firewallActions.removeFromResources`](#hetznerfirewallactionsremovefromresources)
  * [`hetzner.firewallActions.setRules`](#hetznerfirewallactionssetrules)
  * [`hetzner.firewalls.createFirewall`](#hetznerfirewallscreatefirewall)
  * [`hetzner.firewalls.deleteFirewallById`](#hetznerfirewallsdeletefirewallbyid)
  * [`hetzner.firewalls.getFirewallById`](#hetznerfirewallsgetfirewallbyid)
  * [`hetzner.firewalls.listAll`](#hetznerfirewallslistall)
  * [`hetzner.firewalls.updateFirewallById`](#hetznerfirewallsupdatefirewallbyid)
  * [`hetzner.floatingIpActions.assignToServer`](#hetznerfloatingipactionsassigntoserver)
  * [`hetzner.floatingIpActions.changeDnsPtr`](#hetznerfloatingipactionschangednsptr)
  * [`hetzner.floatingIpActions.changeProtection`](#hetznerfloatingipactionschangeprotection)
  * [`hetzner.floatingIpActions.getActionById`](#hetznerfloatingipactionsgetactionbyid)
  * [`hetzner.floatingIpActions.getActionById_0`](#hetznerfloatingipactionsgetactionbyid_0)
  * [`hetzner.floatingIpActions.getAllActions`](#hetznerfloatingipactionsgetallactions)
  * [`hetzner.floatingIpActions.getAllActions_0`](#hetznerfloatingipactionsgetallactions_0)
  * [`hetzner.floatingIpActions.unassignIp`](#hetznerfloatingipactionsunassignip)
  * [`hetzner.floatingIPs.createNewIp`](#hetznerfloatingipscreatenewip)
  * [`hetzner.floatingIPs.deleteIp`](#hetznerfloatingipsdeleteip)
  * [`hetzner.floatingIPs.get`](#hetznerfloatingipsget)
  * [`hetzner.floatingIPs.getAll`](#hetznerfloatingipsgetall)
  * [`hetzner.floatingIPs.updateDescriptionLabels`](#hetznerfloatingipsupdatedescriptionlabels)
  * [`hetzner.iSOs.get`](#hetznerisosget)
  * [`hetzner.iSOs.getAll`](#hetznerisosgetall)
  * [`hetzner.imageActions.changeProtection`](#hetznerimageactionschangeprotection)
  * [`hetzner.imageActions.getActionById`](#hetznerimageactionsgetactionbyid)
  * [`hetzner.imageActions.getActionById_0`](#hetznerimageactionsgetactionbyid_0)
  * [`hetzner.imageActions.getAllActions`](#hetznerimageactionsgetallactions)
  * [`hetzner.imageActions.getAllActions_0`](#hetznerimageactionsgetallactions_0)
  * [`hetzner.images.deleteImage`](#hetznerimagesdeleteimage)
  * [`hetzner.images.getAll`](#hetznerimagesgetall)
  * [`hetzner.images.getById`](#hetznerimagesgetbyid)
  * [`hetzner.images.updateImageById`](#hetznerimagesupdateimagebyid)
  * [`hetzner.loadBalancerActions.addService`](#hetznerloadbalanceractionsaddservice)
  * [`hetzner.loadBalancerActions.addTarget`](#hetznerloadbalanceractionsaddtarget)
  * [`hetzner.loadBalancerActions.attachToNetwork`](#hetznerloadbalanceractionsattachtonetwork)
  * [`hetzner.loadBalancerActions.changeAlgorithm`](#hetznerloadbalanceractionschangealgorithm)
  * [`hetzner.loadBalancerActions.changeDnsPtr`](#hetznerloadbalanceractionschangednsptr)
  * [`hetzner.loadBalancerActions.changeProtection`](#hetznerloadbalanceractionschangeprotection)
  * [`hetzner.loadBalancerActions.changeType`](#hetznerloadbalanceractionschangetype)
  * [`hetzner.loadBalancerActions.deleteService`](#hetznerloadbalanceractionsdeleteservice)
  * [`hetzner.loadBalancerActions.detachFromNetwork`](#hetznerloadbalanceractionsdetachfromnetwork)
  * [`hetzner.loadBalancerActions.disablePublicInterface`](#hetznerloadbalanceractionsdisablepublicinterface)
  * [`hetzner.loadBalancerActions.enablePublicInterface`](#hetznerloadbalanceractionsenablepublicinterface)
  * [`hetzner.loadBalancerActions.getAllActions`](#hetznerloadbalanceractionsgetallactions)
  * [`hetzner.loadBalancerActions.getAllActions_0`](#hetznerloadbalanceractionsgetallactions_0)
  * [`hetzner.loadBalancerActions.getSpecificAction`](#hetznerloadbalanceractionsgetspecificaction)
  * [`hetzner.loadBalancerActions.getSpecificAction_0`](#hetznerloadbalanceractionsgetspecificaction_0)
  * [`hetzner.loadBalancerActions.removeTarget`](#hetznerloadbalanceractionsremovetarget)
  * [`hetzner.loadBalancerActions.updateService`](#hetznerloadbalanceractionsupdateservice)
  * [`hetzner.loadBalancerTypes.getAllTypes`](#hetznerloadbalancertypesgetalltypes)
  * [`hetzner.loadBalancerTypes.getById`](#hetznerloadbalancertypesgetbyid)
  * [`hetzner.loadBalancers.createLoadBalancer`](#hetznerloadbalancerscreateloadbalancer)
  * [`hetzner.loadBalancers.deleteLoadBalancer`](#hetznerloadbalancersdeleteloadbalancer)
  * [`hetzner.loadBalancers.getAll`](#hetznerloadbalancersgetall)
  * [`hetzner.loadBalancers.getById`](#hetznerloadbalancersgetbyid)
  * [`hetzner.loadBalancers.getMetrics`](#hetznerloadbalancersgetmetrics)
  * [`hetzner.loadBalancers.updateBalancer`](#hetznerloadbalancersupdatebalancer)
  * [`hetzner.locations.getAllLocations`](#hetznerlocationsgetalllocations)
  * [`hetzner.locations.getLocationById`](#hetznerlocationsgetlocationbyid)
  * [`hetzner.networkActions.addRoute`](#hetznernetworkactionsaddroute)
  * [`hetzner.networkActions.addSubnet`](#hetznernetworkactionsaddsubnet)
  * [`hetzner.networkActions.changeIpRange`](#hetznernetworkactionschangeiprange)
  * [`hetzner.networkActions.changeProtection`](#hetznernetworkactionschangeprotection)
  * [`hetzner.networkActions.deleteRoute`](#hetznernetworkactionsdeleteroute)
  * [`hetzner.networkActions.deleteSubnet`](#hetznernetworkactionsdeletesubnet)
  * [`hetzner.networkActions.getAction`](#hetznernetworkactionsgetaction)
  * [`hetzner.networkActions.getAction_0`](#hetznernetworkactionsgetaction_0)
  * [`hetzner.networkActions.getAllActions`](#hetznernetworkactionsgetallactions)
  * [`hetzner.networkActions.getAllActions_0`](#hetznernetworkactionsgetallactions_0)
  * [`hetzner.networks.createNetwork`](#hetznernetworkscreatenetwork)
  * [`hetzner.networks.deleteNetwork`](#hetznernetworksdeletenetwork)
  * [`hetzner.networks.getAll`](#hetznernetworksgetall)
  * [`hetzner.networks.getById`](#hetznernetworksgetbyid)
  * [`hetzner.networks.updateProperties`](#hetznernetworksupdateproperties)
  * [`hetzner.placementGroups.createNewGroup`](#hetznerplacementgroupscreatenewgroup)
  * [`hetzner.placementGroups.deleteGroup`](#hetznerplacementgroupsdeletegroup)
  * [`hetzner.placementGroups.getAll`](#hetznerplacementgroupsgetall)
  * [`hetzner.placementGroups.getById`](#hetznerplacementgroupsgetbyid)
  * [`hetzner.placementGroups.updateProperties`](#hetznerplacementgroupsupdateproperties)
  * [`hetzner.pricing.getAllPrices`](#hetznerpricinggetallprices)
  * [`hetzner.primaryIpActions.assignPrimaryIpToResource`](#hetznerprimaryipactionsassignprimaryiptoresource)
  * [`hetzner.primaryIpActions.changeDnsPtr`](#hetznerprimaryipactionschangednsptr)
  * [`hetzner.primaryIpActions.changeProtectionPrimaryIp`](#hetznerprimaryipactionschangeprotectionprimaryip)
  * [`hetzner.primaryIpActions.getActionById`](#hetznerprimaryipactionsgetactionbyid)
  * [`hetzner.primaryIpActions.getAllActions`](#hetznerprimaryipactionsgetallactions)
  * [`hetzner.primaryIpActions.unassignPrimaryIp`](#hetznerprimaryipactionsunassignprimaryip)
  * [`hetzner.primaryIPs.createOrUpdate`](#hetznerprimaryipscreateorupdate)
  * [`hetzner.primaryIPs.deletePrimaryIp`](#hetznerprimaryipsdeleteprimaryip)
  * [`hetzner.primaryIPs.getAll`](#hetznerprimaryipsgetall)
  * [`hetzner.primaryIPs.getById`](#hetznerprimaryipsgetbyid)
  * [`hetzner.primaryIPs.updateIpLabels`](#hetznerprimaryipsupdateiplabels)
  * [`hetzner.sshKeys.createKey`](#hetznersshkeyscreatekey)
  * [`hetzner.sshKeys.deleteKey`](#hetznersshkeysdeletekey)
  * [`hetzner.sshKeys.getAllSshKeys`](#hetznersshkeysgetallsshkeys)
  * [`hetzner.sshKeys.getById`](#hetznersshkeysgetbyid)
  * [`hetzner.sshKeys.updateKey`](#hetznersshkeysupdatekey)
  * [`hetzner.serverActions.addToPlacementGroup`](#hetznerserveractionsaddtoplacementgroup)
  * [`hetzner.serverActions.attachIsoToServer`](#hetznerserveractionsattachisotoserver)
  * [`hetzner.serverActions.attachToNetwork`](#hetznerserveractionsattachtonetwork)
  * [`hetzner.serverActions.changeAliasIps`](#hetznerserveractionschangealiasips)
  * [`hetzner.serverActions.changeDnsPtr`](#hetznerserveractionschangednsptr)
  * [`hetzner.serverActions.changeProtection`](#hetznerserveractionschangeprotection)
  * [`hetzner.serverActions.changeServerType`](#hetznerserveractionschangeservertype)
  * [`hetzner.serverActions.createImage`](#hetznerserveractionscreateimage)
  * [`hetzner.serverActions.detachFromNetwork`](#hetznerserveractionsdetachfromnetwork)
  * [`hetzner.serverActions.detachIsoFromServer`](#hetznerserveractionsdetachisofromserver)
  * [`hetzner.serverActions.disableBackup`](#hetznerserveractionsdisablebackup)
  * [`hetzner.serverActions.disableRescueMode`](#hetznerserveractionsdisablerescuemode)
  * [`hetzner.serverActions.enableBackup`](#hetznerserveractionsenablebackup)
  * [`hetzner.serverActions.enableRescueMode`](#hetznerserveractionsenablerescuemode)
  * [`hetzner.serverActions.getActionById`](#hetznerserveractionsgetactionbyid)
  * [`hetzner.serverActions.getActionById_0`](#hetznerserveractionsgetactionbyid_0)
  * [`hetzner.serverActions.getAll`](#hetznerserveractionsgetall)
  * [`hetzner.serverActions.getAllActions`](#hetznerserveractionsgetallactions)
  * [`hetzner.serverActions.gracefulShutdown`](#hetznerserveractionsgracefulshutdown)
  * [`hetzner.serverActions.powerOffServer`](#hetznerserveractionspoweroffserver)
  * [`hetzner.serverActions.powerOnServer`](#hetznerserveractionspoweronserver)
  * [`hetzner.serverActions.rebuildServerFromImage`](#hetznerserveractionsrebuildserverfromimage)
  * [`hetzner.serverActions.removeFromPlacementGroup`](#hetznerserveractionsremovefromplacementgroup)
  * [`hetzner.serverActions.requestConsole`](#hetznerserveractionsrequestconsole)
  * [`hetzner.serverActions.resetServer`](#hetznerserveractionsresetserver)
  * [`hetzner.serverActions.resetServerPassword`](#hetznerserveractionsresetserverpassword)
  * [`hetzner.serverActions.softRebootServer`](#hetznerserveractionssoftrebootserver)
  * [`hetzner.serverTypes.getServerType`](#hetznerservertypesgetservertype)
  * [`hetzner.serverTypes.listAllServerTypes`](#hetznerservertypeslistallservertypes)
  * [`hetzner.servers.createServerAction`](#hetznerserverscreateserveraction)
  * [`hetzner.servers.deleteServer`](#hetznerserversdeleteserver)
  * [`hetzner.servers.getAll`](#hetznerserversgetall)
  * [`hetzner.servers.getMetricsForServer`](#hetznerserversgetmetricsforserver)
  * [`hetzner.servers.getServer`](#hetznerserversgetserver)
  * [`hetzner.servers.updateServer`](#hetznerserversupdateserver)
  * [`hetzner.volumeActions.attachVolumeToServer`](#hetznervolumeactionsattachvolumetoserver)
  * [`hetzner.volumeActions.changeProtectionVolume`](#hetznervolumeactionschangeprotectionvolume)
  * [`hetzner.volumeActions.changeSize`](#hetznervolumeactionschangesize)
  * [`hetzner.volumeActions.detachVolumeFromServer`](#hetznervolumeactionsdetachvolumefromserver)
  * [`hetzner.volumeActions.getAction`](#hetznervolumeactionsgetaction)
  * [`hetzner.volumeActions.getActionById`](#hetznervolumeactionsgetactionbyid)
  * [`hetzner.volumeActions.getAllActions`](#hetznervolumeactionsgetallactions)
  * [`hetzner.volumeActions.getAllActions_0`](#hetznervolumeactionsgetallactions_0)
  * [`hetzner.volumes.createVolume`](#hetznervolumescreatevolume)
  * [`hetzner.volumes.deleteVolume`](#hetznervolumesdeletevolume)
  * [`hetzner.volumes.getAll`](#hetznervolumesgetall)
  * [`hetzner.volumes.getById`](#hetznervolumesgetbyid)
  * [`hetzner.volumes.updateVolumeProperties`](#hetznervolumesupdatevolumeproperties)

<!-- tocstop -->

## Installation<a id="installation"></a>
<div align="center">
  <a href="https://konfigthis.com/sdk-sign-up?company=Hetzner&language=TypeScript">
    <img src="https://raw.githubusercontent.com/konfig-dev/brand-assets/HEAD/cta-images/typescript-cta.png" width="70%">
  </a>
</div>

## Getting Started<a id="getting-started"></a>

```typescript
import { Hetzner } from "hetzner-typescript-sdk";

const hetzner = new Hetzner({
  // Defining the base path is optional and defaults to https://api.hetzner.cloud/v1
  // basePath: "https://api.hetzner.cloud/v1",
  accessToken: "ACCESS_TOKEN",
});

const getAllResponse = await hetzner.actions.getAll({
  id: 42,
  sort: "id",
  status: "running",
  page: 2,
  perPage: 25,
});

console.log(getAllResponse);
```

## Reference<a id="reference"></a>


### `hetzner.actions.getAll`<a id="hetzneractionsgetall"></a>

Returns all Action objects. You can `sort` the results by using the sort URI parameter, and filter them with the `status` parameter.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllResponse = await hetzner.actions.getAll({
  id: 42,
  sort: "id",
  status: "running",
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

Filter the actions by ID. Can be used multiple times. The response will only contain actions matching the specified IDs. 

##### sort: `'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'`<a id="sort-id--idasc--iddesc--command--commandasc--commanddesc--status--statusasc--statusdesc--started--startedasc--starteddesc--finished--finishedasc--finisheddesc"></a>

Sort actions by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 

##### status: `'running' | 'success' | 'error'`<a id="status-running--success--error"></a>

Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[ActionsGetAllResponse](./models/actions-get-all-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/actions` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.actions.getById`<a id="hetzneractionsgetbyid"></a>

Returns a specific Action object.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByIdResponse = await hetzner.actions.getById({
  id: 42,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Resource.

#### 🔄 Return<a id="🔄-return"></a>

[ActionsGetByIdResponse](./models/actions-get-by-id-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/actions/{id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.certificateActions.getAction`<a id="hetznercertificateactionsgetaction"></a>

Returns a specific Action object.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getActionResponse = await hetzner.certificateActions.getAction({
  id: 42,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Action.

#### 🔄 Return<a id="🔄-return"></a>

[CertificateActionsGetActionResponse](./models/certificate-actions-get-action-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/certificates/actions/{id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.certificateActions.getActionById`<a id="hetznercertificateactionsgetactionbyid"></a>

Returns a specific Action for a Certificate. Only type `managed` Certificates have Actions.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getActionByIdResponse = await hetzner.certificateActions.getActionById({
  id: 1,
  actionId: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Certificate

##### actionId: `number`<a id="actionid-number"></a>

ID of the Action

#### 🔄 Return<a id="🔄-return"></a>

[CertificateActionsGetActionByIdResponse](./models/certificate-actions-get-action-by-id-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/certificates/{id}/actions/{action_id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.certificateActions.getAllActions`<a id="hetznercertificateactionsgetallactions"></a>

Returns all Action objects. You can `sort` the results by using the sort URI parameter, and filter them with the `status` and `id` parameter.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllActionsResponse = await hetzner.certificateActions.getAllActions({
  id: 42,
  sort: "id",
  status: "running",
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

Filter the actions by ID. Can be used multiple times. The response will only contain actions matching the specified IDs. 

##### sort: `'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'`<a id="sort-id--idasc--iddesc--command--commandasc--commanddesc--status--statusasc--statusdesc--started--startedasc--starteddesc--finished--finishedasc--finisheddesc"></a>

Sort actions by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 

##### status: `'running' | 'success' | 'error'`<a id="status-running--success--error"></a>

Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[CertificateActionsGetAllActionsResponse](./models/certificate-actions-get-all-actions-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/certificates/actions` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.certificateActions.getAllActions_0`<a id="hetznercertificateactionsgetallactions_0"></a>

Returns all Action objects for a Certificate. You can sort the results by using the `sort` URI parameter, and filter them with the `status` parameter.

Only type `managed` Certificates can have Actions. For type `uploaded` Certificates the `actions` key will always contain an empty array.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllActions_0Response =
  await hetzner.certificateActions.getAllActions_0({
    id: 42,
    sort: "id",
    status: "running",
    page: 2,
    perPage: 25,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Resource.

##### sort: `'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'`<a id="sort-id--idasc--iddesc--command--commandasc--commanddesc--status--statusasc--statusdesc--started--startedasc--starteddesc--finished--finishedasc--finisheddesc"></a>

Sort actions by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 

##### status: `'running' | 'success' | 'error'`<a id="status-running--success--error"></a>

Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[CertificateActionsGetAllActions200Response](./models/certificate-actions-get-all-actions200-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/certificates/{id}/actions` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.certificateActions.retryIssuanceOrRenewal`<a id="hetznercertificateactionsretryissuanceorrenewal"></a>

Retry a failed Certificate issuance or renewal.

Only applicable if the type of the Certificate is `managed` and the issuance or renewal status is `failed`.

#### Call specific error codes<a id="call-specific-error-codes"></a>

| Code                                                    | Description                                                               |
|---------------------------------------------------------|---------------------------------------------------------------------------|
| `caa_record_does_not_allow_ca`                          | CAA record does not allow certificate authority                           |
| `ca_dns_validation_failed`                              | Certificate Authority: DNS validation failed                              |
| `ca_too_many_authorizations_failed_recently`            | Certificate Authority: Too many authorizations failed recently            |
| `ca_too_many_certificates_issued_for_registered_domain` | Certificate Authority: Too many certificates issued for registered domain |
| `ca_too_many_duplicate_certificates`                    | Certificate Authority: Too many duplicate certificates                    |
| `could_not_verify_domain_delegated_to_zone`             | Could not verify domain delegated to zone                                 |
| `dns_zone_not_found`                                    | DNS zone not found                                                        |
| `dns_zone_is_secondary_zone`                            | DNS zone is a secondary zone                                              |


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const retryIssuanceOrRenewalResponse =
  await hetzner.certificateActions.retryIssuanceOrRenewal({
    id: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Certificate

#### 🔄 Return<a id="🔄-return"></a>

[CertificateActionsRetryIssuanceOrRenewalResponse](./models/certificate-actions-retry-issuance-or-renewal-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/certificates/{id}/actions/retry` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.certificates.createNewCertificate`<a id="hetznercertificatescreatenewcertificate"></a>

Creates a new Certificate.

The default type **uploaded** allows for uploading your existing `certificate` and `private_key` in PEM format. You have to monitor its expiration date and handle renewal yourself.

In contrast, type **managed** requests a new Certificate from *Let's Encrypt* for the specified `domain_names`. Only domains managed by *Hetzner DNS* are supported. We handle renewal and timely alert the project owner via email if problems occur.

For type `managed` Certificates the `action` key of the response contains the Action that allows for tracking the issuance process. For type `uploaded` Certificates the `action` is always null.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const createNewCertificateResponse =
  await hetzner.certificates.createNewCertificate({
    certificate: "-----BEGIN CERTIFICATE-----\n...",
    name: "my website cert",
    private_key: "-----BEGIN PRIVATE KEY-----\n...",
    type: "uploaded",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### name: `string`<a id="name-string"></a>

Name of the Certificate

##### certificate: `string`<a id="certificate-string"></a>

Certificate and chain in PEM format, in order so that each record directly certifies the one preceding. Required for type `uploaded` Certificates.

##### domain_names: `string`[]<a id="domain_names-string"></a>

Domains and subdomains that should be contained in the Certificate issued by *Let\\\'s Encrypt*. Required for type `managed` Certificates.

##### labels: `object`<a id="labels-object"></a>

User-defined labels (key-value pairs)

##### private_key: `string`<a id="private_key-string"></a>

Certificate key in PEM format. Required for type `uploaded` Certificates.

##### type: `string`<a id="type-string"></a>

Choose between uploading a Certificate in PEM format or requesting a managed *Let\\\'s Encrypt* Certificate.

#### 🔄 Return<a id="🔄-return"></a>

[CertificatesCreateNewCertificateResponse](./models/certificates-create-new-certificate-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/certificates` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.certificates.deleteCertificate`<a id="hetznercertificatesdeletecertificate"></a>

Deletes a Certificate.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const deleteCertificateResponse = await hetzner.certificates.deleteCertificate({
  id: 42,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Resource.

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/certificates/{id}` `DELETE`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.certificates.getAll`<a id="hetznercertificatesgetall"></a>

Returns all Certificate objects.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllResponse = await hetzner.certificates.getAll({
  sort: "id",
  type: "uploaded",
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### sort: `'id' | 'id:asc' | 'id:desc' | 'name' | 'name:asc' | 'name:desc' | 'created' | 'created:asc' | 'created:desc'`<a id="sort-id--idasc--iddesc--name--nameasc--namedesc--created--createdasc--createddesc"></a>

Sort resources by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 

##### name: `string`<a id="name-string"></a>

Filter resources by their name. The response will only contain the resources matching the specified name. 

##### labelSelector: `string`<a id="labelselector-string"></a>

Filter resources by labels. The response will only contain resources matching the label selector. For more information, see \"[Label Selector](https://docs.hetzner.cloud)\". 

##### type: `'uploaded' | 'managed'`<a id="type-uploaded--managed"></a>

Can be used multiple times. The response will only contain Certificates matching the type.

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[CertificatesGetAllResponse](./models/certificates-get-all-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/certificates` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.certificates.getById`<a id="hetznercertificatesgetbyid"></a>

Gets a specific Certificate object.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByIdResponse = await hetzner.certificates.getById({
  id: 42,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Resource.

#### 🔄 Return<a id="🔄-return"></a>

[CertificatesGetByIdResponse](./models/certificates-get-by-id-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/certificates/{id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.certificates.updateById`<a id="hetznercertificatesupdatebyid"></a>

Updates the Certificate properties.

Note that when updating labels, the Certificate’s current set of labels will be replaced with the labels provided in the request body. So, for example, if you want to add a new label, you have to provide all existing labels plus the new label in the request body.

Note: if the Certificate object changes during the request, the response will be a “conflict” error.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updateByIdResponse = await hetzner.certificates.updateById({
  id: 42,
  name: "my website cert",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Resource.

##### labels: `object`<a id="labels-object"></a>

User-defined labels (key-value pairs)

##### name: `string`<a id="name-string"></a>

New Certificate name

#### 🔄 Return<a id="🔄-return"></a>

[CertificatesUpdateByIdResponse](./models/certificates-update-by-id-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/certificates/{id}` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.datacenters.getAll`<a id="hetznerdatacentersgetall"></a>

Returns all Datacenter objects.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllResponse = await hetzner.datacenters.getAll({
  sort: "id",
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### name: `string`<a id="name-string"></a>

Can be used to filter Datacenters by their name. The response will only contain the Datacenter matching the specified name. When the name does not match the Datacenter name format, an `invalid_input` error is returned.

##### sort: `'id' | 'id:asc' | 'id:desc' | 'name' | 'name:asc' | 'name:desc'`<a id="sort-id--idasc--iddesc--name--nameasc--namedesc"></a>

Can be used multiple times.

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[DatacentersGetAllResponse](./models/datacenters-get-all-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/datacenters` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.datacenters.getById`<a id="hetznerdatacentersgetbyid"></a>

Returns a specific Datacenter object.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByIdResponse = await hetzner.datacenters.getById({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of Datacenter

#### 🔄 Return<a id="🔄-return"></a>

[DatacentersGetByIdResponse](./models/datacenters-get-by-id-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/datacenters/{id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.firewallActions.applyToResources`<a id="hetznerfirewallactionsapplytoresources"></a>

Applies one Firewall to multiple resources.

Currently servers (public network interface) and label selectors are supported.

#### Call specific error codes<a id="call-specific-error-codes"></a>

| Code                          | Description                                                   |
|-------------------------------|---------------------------------------------------------------|
| `firewall_already_applied`    | Firewall was already applied on resource                      |
| `incompatible_network_type`   | The Network type is incompatible for the given resource       |
| `firewall_resource_not_found` | The resource the Firewall should be attached to was not found |


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const applyToResourcesResponse = await hetzner.firewallActions.applyToResources(
  {
    id: 1,
    apply_to: [
      {
        type: "server",
      },
    ],
  }
);
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### apply_to: [`FirewallResource`](./models/firewall-resource.ts)[]<a id="apply_to-firewallresourcemodelsfirewall-resourcets"></a>

Resources the Firewall should be applied to

##### id: `number`<a id="id-number"></a>

ID of the Firewall

#### 🔄 Return<a id="🔄-return"></a>

[FirewallActionsApplyToResourcesResponse](./models/firewall-actions-apply-to-resources-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/firewalls/{id}/actions/apply_to_resources` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.firewallActions.getActionById`<a id="hetznerfirewallactionsgetactionbyid"></a>

Returns a specific Action object.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getActionByIdResponse = await hetzner.firewallActions.getActionById({
  id: 42,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Action.

#### 🔄 Return<a id="🔄-return"></a>

[FirewallActionsGetActionByIdResponse](./models/firewall-actions-get-action-by-id-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/firewalls/actions/{id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.firewallActions.getActionById_0`<a id="hetznerfirewallactionsgetactionbyid_0"></a>

Returns a specific Action for a Firewall.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getActionById_0Response = await hetzner.firewallActions.getActionById_0({
  id: 1,
  actionId: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Firewall

##### actionId: `number`<a id="actionid-number"></a>

ID of the Action

#### 🔄 Return<a id="🔄-return"></a>

[FirewallActionsGetActionById200Response](./models/firewall-actions-get-action-by-id200-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/firewalls/{id}/actions/{action_id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.firewallActions.getAllActions`<a id="hetznerfirewallactionsgetallactions"></a>

Returns all Action objects. You can `sort` the results by using the sort URI parameter, and filter them with the `status` and `id` parameter.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllActionsResponse = await hetzner.firewallActions.getAllActions({
  id: 42,
  sort: "id",
  status: "running",
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

Filter the actions by ID. Can be used multiple times. The response will only contain actions matching the specified IDs. 

##### sort: `'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'`<a id="sort-id--idasc--iddesc--command--commandasc--commanddesc--status--statusasc--statusdesc--started--startedasc--starteddesc--finished--finishedasc--finisheddesc"></a>

Sort actions by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 

##### status: `'running' | 'success' | 'error'`<a id="status-running--success--error"></a>

Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[FirewallActionsGetAllActionsResponse](./models/firewall-actions-get-all-actions-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/firewalls/actions` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.firewallActions.getAllActions_0`<a id="hetznerfirewallactionsgetallactions_0"></a>

Returns all Action objects for a Firewall. You can sort the results by using the `sort` URI parameter, and filter them with the `status` parameter.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllActions_0Response = await hetzner.firewallActions.getAllActions_0({
  id: 42,
  sort: "id",
  status: "running",
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Resource.

##### sort: `'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'`<a id="sort-id--idasc--iddesc--command--commandasc--commanddesc--status--statusasc--statusdesc--started--startedasc--starteddesc--finished--finishedasc--finisheddesc"></a>

Sort actions by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 

##### status: `'running' | 'success' | 'error'`<a id="status-running--success--error"></a>

Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[FirewallActionsGetAllActions200Response](./models/firewall-actions-get-all-actions200-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/firewalls/{id}/actions` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.firewallActions.removeFromResources`<a id="hetznerfirewallactionsremovefromresources"></a>

Removes one Firewall from multiple resources.

Currently only Servers (and their public network interfaces) are supported.

#### Call specific error codes<a id="call-specific-error-codes"></a>

| Code                                  | Description                                                            |
|---------------------------------------|------------------------------------------------------------------------|
| `firewall_already_removed`            | Firewall was already removed from the resource                         |
| `firewall_resource_not_found`         | The resource the Firewall should be attached to was not found          |
| `firewall_managed_by_label_selector`  | Firewall was applied via label selector and cannot be removed manually |


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const removeFromResourcesResponse =
  await hetzner.firewallActions.removeFromResources({
    id: 1,
    remove_from: [
      {
        type: "server",
      },
    ],
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### remove_from: [`FirewallResource1`](./models/firewall-resource1.ts)[]<a id="remove_from-firewallresource1modelsfirewall-resource1ts"></a>

Resources the Firewall should be removed from

##### id: `number`<a id="id-number"></a>

ID of the Firewall

#### 🔄 Return<a id="🔄-return"></a>

[FirewallActionsRemoveFromResourcesResponse](./models/firewall-actions-remove-from-resources-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/firewalls/{id}/actions/remove_from_resources` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.firewallActions.setRules`<a id="hetznerfirewallactionssetrules"></a>

Sets the rules of a Firewall.

All existing rules will be overwritten. Pass an empty `rules` array to remove all rules.
The maximum amount of rules that can be defined is 50.

#### Call specific error codes<a id="call-specific-error-codes"></a>

| Code                          | Description                                                   |
|-------------------------------|---------------------------------------------------------------|
| `firewall_resource_not_found` | The resource the Firewall should be attached to was not found |


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const setRulesResponse = await hetzner.firewallActions.setRules({
  id: 1,
  rules: [
    {
      destination_ips: [
        "28.239.13.1/32",
        "28.239.14.0/24",
        "ff21:1eac:9a3b:ee58:5ca:990c:8bc9:c03b/128",
      ],
      direction: "in",
      port: "80",
      protocol: "tcp",
      source_ips: [
        "28.239.13.1/32",
        "28.239.14.0/24",
        "ff21:1eac:9a3b:ee58:5ca:990c:8bc9:c03b/128",
      ],
    },
  ],
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### rules: [`Rule1`](./models/rule1.ts)[]<a id="rules-rule1modelsrule1ts"></a>

Array of rules

##### id: `number`<a id="id-number"></a>

ID of the Firewall

#### 🔄 Return<a id="🔄-return"></a>

[FirewallActionsSetRulesResponse](./models/firewall-actions-set-rules-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/firewalls/{id}/actions/set_rules` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.firewalls.createFirewall`<a id="hetznerfirewallscreatefirewall"></a>

Creates a new Firewall.

#### Call specific error codes<a id="call-specific-error-codes"></a>

| Code                          | Description                                                   |
|------------------------------ |-------------------------------------------------------------- |
| `server_already_added`        | Server added more than one time to resource                   |
| `incompatible_network_type`   | The Network type is incompatible for the given resource       |
| `firewall_resource_not_found` | The resource the Firewall should be attached to was not found |


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const createFirewallResponse = await hetzner.firewalls.createFirewall({
  name: "Corporate Intranet Protection",
  rules: [
    {
      destination_ips: [
        "28.239.13.1/32",
        "28.239.14.0/24",
        "ff21:1eac:9a3b:ee58:5ca:990c:8bc9:c03b/128",
      ],
      direction: "in",
      port: "80",
      protocol: "tcp",
      source_ips: [
        "28.239.13.1/32",
        "28.239.14.0/24",
        "ff21:1eac:9a3b:ee58:5ca:990c:8bc9:c03b/128",
      ],
    },
  ],
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### name: `string`<a id="name-string"></a>

Name of the Firewall

##### apply_to: [`FirewallsCreateFirewallRequestApplyToInner`](./models/firewalls-create-firewall-request-apply-to-inner.ts)[]<a id="apply_to-firewallscreatefirewallrequestapplytoinnermodelsfirewalls-create-firewall-request-apply-to-innerts"></a>

Resources the Firewall should be applied to after creation

##### labels: `object`<a id="labels-object"></a>

User-defined labels (key-value pairs)

##### rules: [`Rule`](./models/rule.ts)[]<a id="rules-rulemodelsrulets"></a>

Array of rules

#### 🔄 Return<a id="🔄-return"></a>

[FirewallsCreateFirewallResponse](./models/firewalls-create-firewall-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/firewalls` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.firewalls.deleteFirewallById`<a id="hetznerfirewallsdeletefirewallbyid"></a>

Deletes a Firewall.

#### Call specific error codes<a id="call-specific-error-codes"></a>

| Code                 | Description                               |
|--------------------- |-------------------------------------------|
| `resource_in_use`    | Firewall must not be in use to be deleted |


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const deleteFirewallByIdResponse = await hetzner.firewalls.deleteFirewallById({
  id: 42,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Resource.

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/firewalls/{id}` `DELETE`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.firewalls.getFirewallById`<a id="hetznerfirewallsgetfirewallbyid"></a>

Gets a specific Firewall object.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getFirewallByIdResponse = await hetzner.firewalls.getFirewallById({
  id: 42,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Resource.

#### 🔄 Return<a id="🔄-return"></a>

[FirewallsGetFirewallByIdResponse](./models/firewalls-get-firewall-by-id-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/firewalls/{id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.firewalls.listAll`<a id="hetznerfirewallslistall"></a>

Returns all Firewall objects.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const listAllResponse = await hetzner.firewalls.listAll({
  sort: "id",
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### sort: `'id' | 'id:asc' | 'id:desc' | 'name' | 'name:asc' | 'name:desc' | 'created' | 'created:asc' | 'created:desc'`<a id="sort-id--idasc--iddesc--name--nameasc--namedesc--created--createdasc--createddesc"></a>

Sort resources by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 

##### name: `string`<a id="name-string"></a>

Filter resources by their name. The response will only contain the resources matching the specified name. 

##### labelSelector: `string`<a id="labelselector-string"></a>

Filter resources by labels. The response will only contain resources matching the label selector. For more information, see \"[Label Selector](https://docs.hetzner.cloud)\". 

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[FirewallsListAllResponse](./models/firewalls-list-all-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/firewalls` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.firewalls.updateFirewallById`<a id="hetznerfirewallsupdatefirewallbyid"></a>

Updates the Firewall.

Note that when updating labels, the Firewall's current set of labels will be replaced with the labels provided in the request body. So, for example, if you want to add a new label, you have to provide all existing labels plus the new label in the request body.

Note: if the Firewall object changes during the request, the response will be a “conflict” error.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updateFirewallByIdResponse = await hetzner.firewalls.updateFirewallById({
  id: 42,
  name: "new-name",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Resource.

##### labels: `object`<a id="labels-object"></a>

User-defined labels (key-value pairs)

##### name: `string`<a id="name-string"></a>

New Firewall name

#### 🔄 Return<a id="🔄-return"></a>

[FirewallsUpdateFirewallByIdResponse](./models/firewalls-update-firewall-by-id-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/firewalls/{id}` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.floatingIpActions.assignToServer`<a id="hetznerfloatingipactionsassigntoserver"></a>

Assigns a Floating IP to a Server.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const assignToServerResponse = await hetzner.floatingIpActions.assignToServer({
  id: 1,
  server: 42,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### server: `number`<a id="server-number"></a>

ID of the Server the Floating IP shall be assigned to

##### id: `number`<a id="id-number"></a>

ID of the Floating IP

#### 🔄 Return<a id="🔄-return"></a>

[FloatingIpActionsAssignToServerResponse](./models/floating-ip-actions-assign-to-server-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/floating_ips/{id}/actions/assign` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.floatingIpActions.changeDnsPtr`<a id="hetznerfloatingipactionschangednsptr"></a>

Changes the hostname that will appear when getting the hostname belonging to this Floating IP.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const changeDnsPtrResponse = await hetzner.floatingIpActions.changeDnsPtr({
  id: 1,
  dns_ptr: "server02.example.com",
  ip: "1.2.3.4",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### dns_ptr: `string`<a id="dns_ptr-string"></a>

Hostname to set as a reverse DNS PTR entry, will reset to original default value if `null`

##### ip: `string`<a id="ip-string"></a>

IP address for which to set the reverse DNS entry

##### id: `number`<a id="id-number"></a>

ID of the Floating IP

#### 🔄 Return<a id="🔄-return"></a>

[FloatingIpActionsChangeDnsPtrResponse](./models/floating-ip-actions-change-dns-ptr-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/floating_ips/{id}/actions/change_dns_ptr` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.floatingIpActions.changeProtection`<a id="hetznerfloatingipactionschangeprotection"></a>

Changes the protection configuration of the Floating IP.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const changeProtectionResponse =
  await hetzner.floatingIpActions.changeProtection({
    id: 1,
    _delete: true,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Floating IP

##### delete: `boolean`<a id="delete-boolean"></a>

If true, prevents the Floating IP from being deleted

#### 🔄 Return<a id="🔄-return"></a>

[FloatingIpActionsChangeProtectionResponse](./models/floating-ip-actions-change-protection-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/floating_ips/{id}/actions/change_protection` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.floatingIpActions.getActionById`<a id="hetznerfloatingipactionsgetactionbyid"></a>

Returns a specific Action object.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getActionByIdResponse = await hetzner.floatingIpActions.getActionById({
  id: 42,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Action.

#### 🔄 Return<a id="🔄-return"></a>

[FloatingIpActionsGetActionByIdResponse](./models/floating-ip-actions-get-action-by-id-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/floating_ips/actions/{id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.floatingIpActions.getActionById_0`<a id="hetznerfloatingipactionsgetactionbyid_0"></a>

Returns a specific Action object for a Floating IP.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getActionById_0Response = await hetzner.floatingIpActions.getActionById_0(
  {
    id: 1,
    actionId: 1,
  }
);
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Floating IP

##### actionId: `number`<a id="actionid-number"></a>

ID of the Action

#### 🔄 Return<a id="🔄-return"></a>

[FloatingIpActionsGetActionById200Response](./models/floating-ip-actions-get-action-by-id200-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/floating_ips/{id}/actions/{action_id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.floatingIpActions.getAllActions`<a id="hetznerfloatingipactionsgetallactions"></a>

Returns all Action objects. You can `sort` the results by using the sort URI parameter, and filter them with the `status` and `id` parameter.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllActionsResponse = await hetzner.floatingIpActions.getAllActions({
  id: 42,
  sort: "id",
  status: "running",
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

Filter the actions by ID. Can be used multiple times. The response will only contain actions matching the specified IDs. 

##### sort: `'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'`<a id="sort-id--idasc--iddesc--command--commandasc--commanddesc--status--statusasc--statusdesc--started--startedasc--starteddesc--finished--finishedasc--finisheddesc"></a>

Sort actions by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 

##### status: `'running' | 'success' | 'error'`<a id="status-running--success--error"></a>

Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[FloatingIpActionsGetAllActionsResponse](./models/floating-ip-actions-get-all-actions-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/floating_ips/actions` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.floatingIpActions.getAllActions_0`<a id="hetznerfloatingipactionsgetallactions_0"></a>

Returns all Action objects for a Floating IP. You can sort the results by using the `sort` URI parameter, and filter them with the `status` parameter.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllActions_0Response = await hetzner.floatingIpActions.getAllActions_0(
  {
    id: 1,
    sort: "id",
    status: "running",
    page: 2,
    perPage: 25,
  }
);
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Floating IP

##### sort: `'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'`<a id="sort-id--idasc--iddesc--command--commandasc--commanddesc--status--statusasc--statusdesc--started--startedasc--starteddesc--finished--finishedasc--finisheddesc"></a>

Sort actions by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 

##### status: `'running' | 'success' | 'error'`<a id="status-running--success--error"></a>

Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[FloatingIpActionsGetAllActions200Response](./models/floating-ip-actions-get-all-actions200-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/floating_ips/{id}/actions` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.floatingIpActions.unassignIp`<a id="hetznerfloatingipactionsunassignip"></a>

Unassigns a Floating IP, resulting in it being unreachable. You may assign it to a Server again at a later time.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const unassignIpResponse = await hetzner.floatingIpActions.unassignIp({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Floating IP

#### 🔄 Return<a id="🔄-return"></a>

[FloatingIpActionsUnassignIpResponse](./models/floating-ip-actions-unassign-ip-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/floating_ips/{id}/actions/unassign` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.floatingIPs.createNewIp`<a id="hetznerfloatingipscreatenewip"></a>

Creates a new Floating IP assigned to a Server. If you want to create a Floating IP that is not bound to a Server, you need to provide the `home_location` key instead of `server`. This can be either the ID or the name of the Location this IP shall be created in. Note that a Floating IP can be assigned to a Server in any Location later on. For optimal routing it is advised to use the Floating IP in the same Location it was created in.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const createNewIpResponse = await hetzner.floatingIPs.createNewIp({
  description: "Web Frontend",
  home_location: "fsn1",
  name: "Web Frontend",
  server: 42,
  type: "ipv4",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### type: `string`<a id="type-string"></a>

Floating IP type

##### description: `string`<a id="description-string"></a>

##### home_location: `string`<a id="home_location-string"></a>

Home Location (routing is optimized for that Location). Only optional if Server argument is passed.

##### labels: `object`<a id="labels-object"></a>

User-defined labels (key-value pairs)

##### name: `string`<a id="name-string"></a>

##### server: `number`<a id="server-number"></a>

ID of the Server to assign the Floating IP to

#### 🔄 Return<a id="🔄-return"></a>

[FloatingIPsCreateNewIpResponse](./models/floating-ips-create-new-ip-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/floating_ips` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.floatingIPs.deleteIp`<a id="hetznerfloatingipsdeleteip"></a>

Deletes a Floating IP. If it is currently assigned to a Server it will automatically get unassigned.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const deleteIpResponse = await hetzner.floatingIPs.deleteIp({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Floating IP

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/floating_ips/{id}` `DELETE`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.floatingIPs.get`<a id="hetznerfloatingipsget"></a>

Returns a specific Floating IP object.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getResponse = await hetzner.floatingIPs.get({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Floating IP

#### 🔄 Return<a id="🔄-return"></a>

[FloatingIPsGetResponse](./models/floating-ips-get-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/floating_ips/{id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.floatingIPs.getAll`<a id="hetznerfloatingipsgetall"></a>

Returns all Floating IP objects.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllResponse = await hetzner.floatingIPs.getAll({
  sort: "id",
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### name: `string`<a id="name-string"></a>

Filter resources by their name. The response will only contain the resources matching the specified name. 

##### labelSelector: `string`<a id="labelselector-string"></a>

Filter resources by labels. The response will only contain resources matching the label selector. For more information, see \"[Label Selector](https://docs.hetzner.cloud)\". 

##### sort: `'id' | 'id:asc' | 'id:desc' | 'created' | 'created:asc' | 'created:desc'`<a id="sort-id--idasc--iddesc--created--createdasc--createddesc"></a>

Can be used multiple times. Choices id id:asc id:desc created created:asc created:desc

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[FloatingIPsGetAllResponse](./models/floating-ips-get-all-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/floating_ips` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.floatingIPs.updateDescriptionLabels`<a id="hetznerfloatingipsupdatedescriptionlabels"></a>

Updates the description or labels of a Floating IP.
Also note that when updating labels, the Floating IP’s current set of labels will be replaced with the labels provided in the request body. So, for example, if you want to add a new label, you have to provide all existing labels plus the new label in the request body.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updateDescriptionLabelsResponse =
  await hetzner.floatingIPs.updateDescriptionLabels({
    id: 1,
    description: "Web Frontend",
    name: "Web Frontend",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Floating IP

##### description: `string`<a id="description-string"></a>

New Description to set

##### labels: `object`<a id="labels-object"></a>

User-defined labels (key-value pairs)

##### name: `string`<a id="name-string"></a>

New unique name to set

#### 🔄 Return<a id="🔄-return"></a>

[FloatingIPsUpdateDescriptionLabelsResponse](./models/floating-ips-update-description-labels-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/floating_ips/{id}` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.iSOs.get`<a id="hetznerisosget"></a>

Returns a specific ISO object.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getResponse = await hetzner.iSOs.get({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the ISO

#### 🔄 Return<a id="🔄-return"></a>

[IsOsGetResponse](./models/is-os-get-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/isos/{id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.iSOs.getAll`<a id="hetznerisosgetall"></a>

Returns all available ISO objects.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllResponse = await hetzner.iSOs.getAll({
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### name: `string`<a id="name-string"></a>

Can be used to filter ISOs by their name. The response will only contain the ISO matching the specified name.

##### architecture: `string`<a id="architecture-string"></a>

Return only ISOs with the given architecture.

##### includeArchitectureWildcard: `boolean`<a id="includearchitecturewildcard-boolean"></a>

Include Images with wildcard architecture (architecture is null). Works only if architecture filter is specified.

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[IsOsGetAllResponse](./models/is-os-get-all-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/isos` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.imageActions.changeProtection`<a id="hetznerimageactionschangeprotection"></a>

Changes the protection configuration of the Image. Can only be used on snapshots.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const changeProtectionResponse = await hetzner.imageActions.changeProtection({
  id: 1,
  _delete: true,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Image

##### delete: `boolean`<a id="delete-boolean"></a>

If true, prevents the snapshot from being deleted

#### 🔄 Return<a id="🔄-return"></a>

[ImageActionsChangeProtectionResponse](./models/image-actions-change-protection-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/images/{id}/actions/change_protection` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.imageActions.getActionById`<a id="hetznerimageactionsgetactionbyid"></a>

Returns a specific Action object.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getActionByIdResponse = await hetzner.imageActions.getActionById({
  id: 42,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Action.

#### 🔄 Return<a id="🔄-return"></a>

[ImageActionsGetActionByIdResponse](./models/image-actions-get-action-by-id-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/images/actions/{id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.imageActions.getActionById_0`<a id="hetznerimageactionsgetactionbyid_0"></a>

Returns a specific Action for an Image.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getActionById_0Response = await hetzner.imageActions.getActionById_0({
  id: 1,
  actionId: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Image

##### actionId: `number`<a id="actionid-number"></a>

ID of the Action

#### 🔄 Return<a id="🔄-return"></a>

[ImageActionsGetActionById200Response](./models/image-actions-get-action-by-id200-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/images/{id}/actions/{action_id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.imageActions.getAllActions`<a id="hetznerimageactionsgetallactions"></a>

Returns all Action objects. You can `sort` the results by using the sort URI parameter, and filter them with the `status` and `id` parameter.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllActionsResponse = await hetzner.imageActions.getAllActions({
  id: 42,
  sort: "id",
  status: "running",
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

Filter the actions by ID. Can be used multiple times. The response will only contain actions matching the specified IDs. 

##### sort: `'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'`<a id="sort-id--idasc--iddesc--command--commandasc--commanddesc--status--statusasc--statusdesc--started--startedasc--starteddesc--finished--finishedasc--finisheddesc"></a>

Sort actions by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 

##### status: `'running' | 'success' | 'error'`<a id="status-running--success--error"></a>

Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[ImageActionsGetAllActionsResponse](./models/image-actions-get-all-actions-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/images/actions` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.imageActions.getAllActions_0`<a id="hetznerimageactionsgetallactions_0"></a>

Returns all Action objects for an Image. You can sort the results by using the `sort` URI parameter, and filter them with the `status` parameter.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllActions_0Response = await hetzner.imageActions.getAllActions_0({
  id: 1,
  sort: "id",
  status: "running",
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Image

##### sort: `'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'`<a id="sort-id--idasc--iddesc--command--commandasc--commanddesc--status--statusasc--statusdesc--started--startedasc--starteddesc--finished--finishedasc--finisheddesc"></a>

Sort actions by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 

##### status: `'running' | 'success' | 'error'`<a id="status-running--success--error"></a>

Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[ImageActionsGetAllActions200Response](./models/image-actions-get-all-actions200-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/images/{id}/actions` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.images.deleteImage`<a id="hetznerimagesdeleteimage"></a>

Deletes an Image. Only Images of type `snapshot` and `backup` can be deleted.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const deleteImageResponse = await hetzner.images.deleteImage({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Image

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/images/{id}` `DELETE`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.images.getAll`<a id="hetznerimagesgetall"></a>

Returns all Image objects. You can select specific Image types only and sort the results by using URI parameters.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllResponse = await hetzner.images.getAll({
  sort: "id",
  type: "system",
  status: "available",
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### sort: `'id' | 'id:asc' | 'id:desc' | 'name' | 'name:asc' | 'name:desc' | 'created' | 'created:asc' | 'created:desc'`<a id="sort-id--idasc--iddesc--name--nameasc--namedesc--created--createdasc--createddesc"></a>

Sort resources by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 

##### type: `'system' | 'snapshot' | 'backup' | 'app'`<a id="type-system--snapshot--backup--app"></a>

Can be used multiple times.

##### status: `'available' | 'creating'`<a id="status-available--creating"></a>

Can be used multiple times. The response will only contain Images matching the status.

##### boundTo: `string`<a id="boundto-string"></a>

Can be used multiple times. Server ID linked to the Image. Only available for Images of type `backup`

##### includeDeprecated: `boolean`<a id="includedeprecated-boolean"></a>

Can be used multiple times.

##### name: `string`<a id="name-string"></a>

Filter resources by their name. The response will only contain the resources matching the specified name. 

##### labelSelector: `string`<a id="labelselector-string"></a>

Filter resources by labels. The response will only contain resources matching the label selector. For more information, see \"[Label Selector](https://docs.hetzner.cloud)\". 

##### architecture: `string`<a id="architecture-string"></a>

Return only Images with the given architecture.

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[ImagesGetAllResponse](./models/images-get-all-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/images` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.images.getById`<a id="hetznerimagesgetbyid"></a>

Returns a specific Image object.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByIdResponse = await hetzner.images.getById({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Image

#### 🔄 Return<a id="🔄-return"></a>

[ImagesGetByIdResponse](./models/images-get-by-id-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/images/{id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.images.updateImageById`<a id="hetznerimagesupdateimagebyid"></a>

Updates the Image. You may change the description, convert a Backup Image to a Snapshot Image or change the Image labels. Only Images of type `snapshot` and `backup` can be updated.

Note that when updating labels, the current set of labels will be replaced with the labels provided in the request body. So, for example, if you want to add a new label, you have to provide all existing labels plus the new label in the request body.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updateImageByIdResponse = await hetzner.images.updateImageById({
  id: 1,
  description: "My new Image description",
  type: "snapshot",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Image

##### description: `string`<a id="description-string"></a>

New description of Image

##### labels: `object`<a id="labels-object"></a>

User-defined labels (key-value pairs)

##### type: `string`<a id="type-string"></a>

Destination Image type to convert to

#### 🔄 Return<a id="🔄-return"></a>

[ImagesUpdateImageByIdResponse](./models/images-update-image-by-id-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/images/{id}` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.loadBalancerActions.addService`<a id="hetznerloadbalanceractionsaddservice"></a>

Adds a service to a Load Balancer.

#### Call specific error codes<a id="call-specific-error-codes"></a>

| Code                       | Description                                             |
|----------------------------|---------------------------------------------------------|
| `source_port_already_used` | The source port you are trying to add is already in use |


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const addServiceResponse = await hetzner.loadBalancerActions.addService({
  id: 1,
  destination_port: 80,
  health_check: {
    interval: 15,
    port: 4711,
    protocol: "http",
    retries: 3,
    timeout: 10,
  },
  listen_port: 443,
  protocol: "https",
  proxyprotocol: false,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### destination_port: `number`<a id="destination_port-number"></a>

Port the Load Balancer will balance to

##### health_check: [`LoadBalancerServiceHealthCheckProperty1`](./models/load-balancer-service-health-check-property1.ts)<a id="health_check-loadbalancerservicehealthcheckproperty1modelsload-balancer-service-health-check-property1ts"></a>

##### listen_port: `number`<a id="listen_port-number"></a>

Port the Load Balancer listens on

##### protocol: `string`<a id="protocol-string"></a>

Protocol of the Load Balancer

##### proxyprotocol: `boolean`<a id="proxyprotocol-boolean"></a>

Is Proxyprotocol enabled or not

##### id: `number`<a id="id-number"></a>

ID of the Load Balancer

##### http: [`LoadBalancerServiceHTTPProperty1`](./models/load-balancer-service-httpproperty1.ts)<a id="http-loadbalancerservicehttpproperty1modelsload-balancer-service-httpproperty1ts"></a>

#### 🔄 Return<a id="🔄-return"></a>

[LoadBalancerActionsAddServiceResponse](./models/load-balancer-actions-add-service-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/load_balancers/{id}/actions/add_service` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.loadBalancerActions.addTarget`<a id="hetznerloadbalanceractionsaddtarget"></a>

Adds a target to a Load Balancer.

#### Call specific error codes<a id="call-specific-error-codes"></a>

| Code                                    | Description                                                                                           |
|-----------------------------------------|-------------------------------------------------------------------------------------------------------|
| `cloud_resource_ip_not_allowed`         | The IP you are trying to add as a target belongs to a Hetzner Cloud resource                          |
| `ip_not_owned`                          | The IP you are trying to add as a target is not owned by the Project owner                            |
| `load_balancer_not_attached_to_network` | The Load Balancer is not attached to a network                                                        |
| `robot_unavailable`                     | Robot was not available. The caller may retry the operation after a short delay.                      |
| `server_not_attached_to_network`        | The server you are trying to add as a target is not attached to the same network as the Load Balancer |
| `target_already_defined`                | The Load Balancer target you are trying to define is already defined                                  |


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const addTargetResponse = await hetzner.loadBalancerActions.addTarget({
  id: 1,
  type: "server",
  use_private_ip: true,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### type: `string`<a id="type-string"></a>

Type of the resource

##### id: `number`<a id="id-number"></a>

ID of the Load Balancer

##### ip: [`LoadBalancerTargetIPProperty1`](./models/load-balancer-target-ipproperty1.ts)<a id="ip-loadbalancertargetipproperty1modelsload-balancer-target-ipproperty1ts"></a>

##### label_selector: [`LoadBalancerActionsAddTargetRequestLabelSelector`](./models/load-balancer-actions-add-target-request-label-selector.ts)<a id="label_selector-loadbalanceractionsaddtargetrequestlabelselectormodelsload-balancer-actions-add-target-request-label-selectorts"></a>

##### server: [`LoadBalancerActionsAddTargetRequestServer`](./models/load-balancer-actions-add-target-request-server.ts)<a id="server-loadbalanceractionsaddtargetrequestservermodelsload-balancer-actions-add-target-request-serverts"></a>

##### use_private_ip: `boolean`<a id="use_private_ip-boolean"></a>

Use the private network IP instead of the public IP of the Server, requires the Server and Load Balancer to be in the same network.

#### 🔄 Return<a id="🔄-return"></a>

[LoadBalancerActionsAddTargetResponse](./models/load-balancer-actions-add-target-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/load_balancers/{id}/actions/add_target` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.loadBalancerActions.attachToNetwork`<a id="hetznerloadbalanceractionsattachtonetwork"></a>

Attach a Load Balancer to a Network.

**Call specific error codes**

| Code                             | Description                                                           |
|----------------------------------|-----------------------------------------------------------------------|
| `load_balancer_already_attached` | The Load Balancer is already attached to a network                    |
| `ip_not_available`               | The provided Network IP is not available                              |
| `no_subnet_available`            | No Subnet or IP is available for the Load Balancer within the network |


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const attachToNetworkResponse =
  await hetzner.loadBalancerActions.attachToNetwork({
    id: 1,
    ip: "10.0.1.1",
    network: 4711,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### network: `number`<a id="network-number"></a>

ID of an existing network to attach the Load Balancer to

##### id: `number`<a id="id-number"></a>

ID of the Load Balancer

##### ip: `string`<a id="ip-string"></a>

IP to request to be assigned to this Load Balancer; if you do not provide this then you will be auto assigned an IP address

#### 🔄 Return<a id="🔄-return"></a>

[LoadBalancerActionsAttachToNetworkResponse](./models/load-balancer-actions-attach-to-network-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/load_balancers/{id}/actions/attach_to_network` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.loadBalancerActions.changeAlgorithm`<a id="hetznerloadbalanceractionschangealgorithm"></a>

Change the algorithm that determines to which target new requests are sent.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const changeAlgorithmResponse =
  await hetzner.loadBalancerActions.changeAlgorithm({
    id: 1,
    type: "round_robin",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### type: `string`<a id="type-string"></a>

Algorithm of the Load Balancer

##### id: `number`<a id="id-number"></a>

ID of the Load Balancer

#### 🔄 Return<a id="🔄-return"></a>

[LoadBalancerActionsChangeAlgorithmResponse](./models/load-balancer-actions-change-algorithm-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/load_balancers/{id}/actions/change_algorithm` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.loadBalancerActions.changeDnsPtr`<a id="hetznerloadbalanceractionschangednsptr"></a>

Changes the hostname that will appear when getting the hostname belonging to the public IPs (IPv4 and IPv6) of this Load Balancer.

Floating IPs assigned to the Server are not affected by this.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const changeDnsPtrResponse = await hetzner.loadBalancerActions.changeDnsPtr({
  id: 1,
  dns_ptr: "lb1.example.com",
  ip: "1.2.3.4",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### dns_ptr: `string`<a id="dns_ptr-string"></a>

Hostname to set as a reverse DNS PTR entry

##### ip: `string`<a id="ip-string"></a>

Public IP address for which the reverse DNS entry should be set

##### id: `number`<a id="id-number"></a>

ID of the Load Balancer

#### 🔄 Return<a id="🔄-return"></a>

[LoadBalancerActionsChangeDnsPtrResponse](./models/load-balancer-actions-change-dns-ptr-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/load_balancers/{id}/actions/change_dns_ptr` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.loadBalancerActions.changeProtection`<a id="hetznerloadbalanceractionschangeprotection"></a>

Changes the protection configuration of a Load Balancer.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const changeProtectionResponse =
  await hetzner.loadBalancerActions.changeProtection({
    id: 1,
    _delete: true,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Load Balancer

##### delete: `boolean`<a id="delete-boolean"></a>

If true, prevents the Load Balancer from being deleted

#### 🔄 Return<a id="🔄-return"></a>

[LoadBalancerActionsChangeProtectionResponse](./models/load-balancer-actions-change-protection-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/load_balancers/{id}/actions/change_protection` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.loadBalancerActions.changeType`<a id="hetznerloadbalanceractionschangetype"></a>

Changes the type (Max Services, Max Targets and Max Connections) of a Load Balancer.

**Call specific error codes**

| Code                         | Description                                                     |
|------------------------------|-----------------------------------------------------------------|
| `invalid_load_balancer_type` | The Load Balancer type does not fit for the given Load Balancer |


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const changeTypeResponse = await hetzner.loadBalancerActions.changeType({
  id: 1,
  load_balancer_type: "lb21",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### load_balancer_type: `string`<a id="load_balancer_type-string"></a>

ID or name of Load Balancer type the Load Balancer should migrate to

##### id: `number`<a id="id-number"></a>

ID of the Load Balancer

#### 🔄 Return<a id="🔄-return"></a>

[LoadBalancerActionsChangeTypeResponse](./models/load-balancer-actions-change-type-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/load_balancers/{id}/actions/change_type` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.loadBalancerActions.deleteService`<a id="hetznerloadbalanceractionsdeleteservice"></a>

Delete a service of a Load Balancer.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const deleteServiceResponse = await hetzner.loadBalancerActions.deleteService({
  id: 1,
  listen_port: 443,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### listen_port: `number`<a id="listen_port-number"></a>

The listen port of the service you want to delete

##### id: `number`<a id="id-number"></a>

ID of the Load Balancer

#### 🔄 Return<a id="🔄-return"></a>

[LoadBalancerActionsDeleteServiceResponse](./models/load-balancer-actions-delete-service-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/load_balancers/{id}/actions/delete_service` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.loadBalancerActions.detachFromNetwork`<a id="hetznerloadbalanceractionsdetachfromnetwork"></a>

Detaches a Load Balancer from a network.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const detachFromNetworkResponse =
  await hetzner.loadBalancerActions.detachFromNetwork({
    id: 1,
    network: 4711,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### network: `number`<a id="network-number"></a>

ID of an existing network to detach the Load Balancer from

##### id: `number`<a id="id-number"></a>

ID of the Load Balancer

#### 🔄 Return<a id="🔄-return"></a>

[LoadBalancerActionsDetachFromNetworkResponse](./models/load-balancer-actions-detach-from-network-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/load_balancers/{id}/actions/detach_from_network` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.loadBalancerActions.disablePublicInterface`<a id="hetznerloadbalanceractionsdisablepublicinterface"></a>

Disable the public interface of a Load Balancer. The Load Balancer will be not accessible from the internet via its public IPs.

#### Call specific error codes<a id="call-specific-error-codes"></a>

| Code                                      | Description                                                                    |
|-------------------------------------------|--------------------------------------------------------------------------------|
| `load_balancer_not_attached_to_network`   |  The Load Balancer is not attached to a network                                |
| `targets_without_use_private_ip`          | The Load Balancer has targets that use the public IP instead of the private IP |


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const disablePublicInterfaceResponse =
  await hetzner.loadBalancerActions.disablePublicInterface({
    id: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Load Balancer

#### 🔄 Return<a id="🔄-return"></a>

[LoadBalancerActionsDisablePublicInterfaceResponse](./models/load-balancer-actions-disable-public-interface-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/load_balancers/{id}/actions/disable_public_interface` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.loadBalancerActions.enablePublicInterface`<a id="hetznerloadbalanceractionsenablepublicinterface"></a>

Enable the public interface of a Load Balancer. The Load Balancer will be accessible from the internet via its public IPs.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const enablePublicInterfaceResponse =
  await hetzner.loadBalancerActions.enablePublicInterface({
    id: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Load Balancer

#### 🔄 Return<a id="🔄-return"></a>

[LoadBalancerActionsEnablePublicInterfaceResponse](./models/load-balancer-actions-enable-public-interface-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/load_balancers/{id}/actions/enable_public_interface` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.loadBalancerActions.getAllActions`<a id="hetznerloadbalanceractionsgetallactions"></a>

Returns all Action objects. You can `sort` the results by using the sort URI parameter, and filter them with the `status` and `id` parameter.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllActionsResponse = await hetzner.loadBalancerActions.getAllActions({
  id: 42,
  sort: "id",
  status: "running",
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

Filter the actions by ID. Can be used multiple times. The response will only contain actions matching the specified IDs. 

##### sort: `'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'`<a id="sort-id--idasc--iddesc--command--commandasc--commanddesc--status--statusasc--statusdesc--started--startedasc--starteddesc--finished--finishedasc--finisheddesc"></a>

Sort actions by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 

##### status: `'running' | 'success' | 'error'`<a id="status-running--success--error"></a>

Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[LoadBalancerActionsGetAllActionsResponse](./models/load-balancer-actions-get-all-actions-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/load_balancers/actions` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.loadBalancerActions.getAllActions_0`<a id="hetznerloadbalanceractionsgetallactions_0"></a>

Returns all Action objects for a Load Balancer. You can sort the results by using the `sort` URI parameter, and filter them with the `status` parameter.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllActions_0Response =
  await hetzner.loadBalancerActions.getAllActions_0({
    id: 1,
    sort: "id",
    status: "running",
    page: 2,
    perPage: 25,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Load Balancer

##### sort: `'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'`<a id="sort-id--idasc--iddesc--command--commandasc--commanddesc--status--statusasc--statusdesc--started--startedasc--starteddesc--finished--finishedasc--finisheddesc"></a>

Sort actions by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 

##### status: `'running' | 'success' | 'error'`<a id="status-running--success--error"></a>

Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[LoadBalancerActionsGetAllActions200Response](./models/load-balancer-actions-get-all-actions200-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/load_balancers/{id}/actions` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.loadBalancerActions.getSpecificAction`<a id="hetznerloadbalanceractionsgetspecificaction"></a>

Returns a specific Action object.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getSpecificActionResponse =
  await hetzner.loadBalancerActions.getSpecificAction({
    id: 42,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Action.

#### 🔄 Return<a id="🔄-return"></a>

[LoadBalancerActionsGetSpecificActionResponse](./models/load-balancer-actions-get-specific-action-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/load_balancers/actions/{id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.loadBalancerActions.getSpecificAction_0`<a id="hetznerloadbalanceractionsgetspecificaction_0"></a>

Returns a specific Action for a Load Balancer.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getSpecificAction_0Response =
  await hetzner.loadBalancerActions.getSpecificAction_0({
    id: 1,
    actionId: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Load Balancer

##### actionId: `number`<a id="actionid-number"></a>

ID of the Action

#### 🔄 Return<a id="🔄-return"></a>

[LoadBalancerActionsGetSpecificAction200Response](./models/load-balancer-actions-get-specific-action200-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/load_balancers/{id}/actions/{action_id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.loadBalancerActions.removeTarget`<a id="hetznerloadbalanceractionsremovetarget"></a>

Removes a target from a Load Balancer.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const removeTargetResponse = await hetzner.loadBalancerActions.removeTarget({
  id: 1,
  type: "server",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### type: `string`<a id="type-string"></a>

Type of the resource

##### id: `number`<a id="id-number"></a>

ID of the Load Balancer

##### ip: [`LoadBalancerTargetIPProperty2`](./models/load-balancer-target-ipproperty2.ts)<a id="ip-loadbalancertargetipproperty2modelsload-balancer-target-ipproperty2ts"></a>

##### label_selector: [`LoadBalancerActionsRemoveTargetRequestLabelSelector`](./models/load-balancer-actions-remove-target-request-label-selector.ts)<a id="label_selector-loadbalanceractionsremovetargetrequestlabelselectormodelsload-balancer-actions-remove-target-request-label-selectorts"></a>

##### server: [`LoadBalancerActionsRemoveTargetRequestServer`](./models/load-balancer-actions-remove-target-request-server.ts)<a id="server-loadbalanceractionsremovetargetrequestservermodelsload-balancer-actions-remove-target-request-serverts"></a>

#### 🔄 Return<a id="🔄-return"></a>

[LoadBalancerActionsRemoveTargetResponse](./models/load-balancer-actions-remove-target-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/load_balancers/{id}/actions/remove_target` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.loadBalancerActions.updateService`<a id="hetznerloadbalanceractionsupdateservice"></a>

Updates a Load Balancer Service.

#### Call specific error codes<a id="call-specific-error-codes"></a>

| Code                       | Description                                             |
|----------------------------|---------------------------------------------------------|
| `source_port_already_used` | The source port you are trying to add is already in use |


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updateServiceResponse = await hetzner.loadBalancerActions.updateService({
  id: 1,
  destination_port: 80,
  listen_port: 443,
  protocol: "https",
  proxyprotocol: false,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### listen_port: `number`<a id="listen_port-number"></a>

Port the Load Balancer listens on

##### id: `number`<a id="id-number"></a>

ID of the Load Balancer

##### destination_port: `number`<a id="destination_port-number"></a>

Port the Load Balancer will balance to

##### health_check: [`UpdateLoadBalancerServiceHealthCheckProperty`](./models/update-load-balancer-service-health-check-property.ts)<a id="health_check-updateloadbalancerservicehealthcheckpropertymodelsupdate-load-balancer-service-health-check-propertyts"></a>

##### http: [`LoadBalancerServiceHTTPProperty2`](./models/load-balancer-service-httpproperty2.ts)<a id="http-loadbalancerservicehttpproperty2modelsload-balancer-service-httpproperty2ts"></a>

##### protocol: `string`<a id="protocol-string"></a>

Protocol of the Load Balancer

##### proxyprotocol: `boolean`<a id="proxyprotocol-boolean"></a>

Is Proxyprotocol enabled or not

#### 🔄 Return<a id="🔄-return"></a>

[LoadBalancerActionsUpdateServiceResponse](./models/load-balancer-actions-update-service-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/load_balancers/{id}/actions/update_service` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.loadBalancerTypes.getAllTypes`<a id="hetznerloadbalancertypesgetalltypes"></a>

Gets all Load Balancer type objects.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllTypesResponse = await hetzner.loadBalancerTypes.getAllTypes({
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### name: `string`<a id="name-string"></a>

Can be used to filter Load Balancer types by their name. The response will only contain the Load Balancer type matching the specified name.

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[LoadBalancerTypesGetAllTypesResponse](./models/load-balancer-types-get-all-types-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/load_balancer_types` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.loadBalancerTypes.getById`<a id="hetznerloadbalancertypesgetbyid"></a>

Gets a specific Load Balancer type object.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByIdResponse = await hetzner.loadBalancerTypes.getById({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of Load Balancer type

#### 🔄 Return<a id="🔄-return"></a>

[LoadBalancerTypesGetByIdResponse](./models/load-balancer-types-get-by-id-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/load_balancer_types/{id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.loadBalancers.createLoadBalancer`<a id="hetznerloadbalancerscreateloadbalancer"></a>

Creates a Load Balancer.

#### Call specific error codes<a id="call-specific-error-codes"></a>

| Code                                    | Description                                                                                           |
|-----------------------------------------|-------------------------------------------------------------------------------------------------------|
| `cloud_resource_ip_not_allowed`         | The IP you are trying to add as a target belongs to a Hetzner Cloud resource                          |
| `ip_not_owned`                          | The IP is not owned by the owner of the project of the Load Balancer                                  |
| `load_balancer_not_attached_to_network` | The Load Balancer is not attached to a network                                                        |
| `robot_unavailable`                     | Robot was not available. The caller may retry the operation after a short delay.                      |
| `server_not_attached_to_network`        | The server you are trying to add as a target is not attached to the same network as the Load Balancer |
| `source_port_already_used`              | The source port you are trying to add is already in use                                               |
| `target_already_defined`                | The Load Balancer target you are trying to define is already defined                                  |


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const createLoadBalancerResponse =
  await hetzner.loadBalancers.createLoadBalancer({
    load_balancer_type: "lb11",
    name: "Web Frontend",
    network: 123,
    network_zone: "eu-central",
    public_interface: true,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### load_balancer_type: `string`<a id="load_balancer_type-string"></a>

ID or name of the Load Balancer type this Load Balancer should be created with

##### name: `string`<a id="name-string"></a>

Name of the Load Balancer

##### algorithm: [`LoadBalancerAlgorithmProperty`](./models/load-balancer-algorithm-property.ts)<a id="algorithm-loadbalanceralgorithmpropertymodelsload-balancer-algorithm-propertyts"></a>

##### labels: [`LoadBalancersCreateLoadBalancerRequestLabels`](./models/load-balancers-create-load-balancer-request-labels.ts)<a id="labels-loadbalancerscreateloadbalancerrequestlabelsmodelsload-balancers-create-load-balancer-request-labelsts"></a>

##### location: `string`<a id="location-string"></a>

ID or name of Location to create Load Balancer in

##### network: `number`<a id="network-number"></a>

ID of the network the Load Balancer should be attached to on creation

##### network_zone: `string`<a id="network_zone-string"></a>

Name of network zone

##### public_interface: `boolean`<a id="public_interface-boolean"></a>

Enable or disable the public interface of the Load Balancer

##### services: [`LoadBalancerService`](./models/load-balancer-service.ts)[]<a id="services-loadbalancerservicemodelsload-balancer-servicets"></a>

Array of services

##### targets: [`LoadBalancerTarget`](./models/load-balancer-target.ts)[]<a id="targets-loadbalancertargetmodelsload-balancer-targetts"></a>

Array of targets

#### 🔄 Return<a id="🔄-return"></a>

[LoadBalancersCreateLoadBalancerResponse](./models/load-balancers-create-load-balancer-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/load_balancers` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.loadBalancers.deleteLoadBalancer`<a id="hetznerloadbalancersdeleteloadbalancer"></a>

Deletes a Load Balancer.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const deleteLoadBalancerResponse =
  await hetzner.loadBalancers.deleteLoadBalancer({
    id: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Load Balancer

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/load_balancers/{id}` `DELETE`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.loadBalancers.getAll`<a id="hetznerloadbalancersgetall"></a>

Gets all existing Load Balancers that you have available.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllResponse = await hetzner.loadBalancers.getAll({
  sort: "id",
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### sort: `'id' | 'id:asc' | 'id:desc' | 'name' | 'name:asc' | 'name:desc' | 'created' | 'created:asc' | 'created:desc'`<a id="sort-id--idasc--iddesc--name--nameasc--namedesc--created--createdasc--createddesc"></a>

Sort resources by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 

##### name: `string`<a id="name-string"></a>

Filter resources by their name. The response will only contain the resources matching the specified name. 

##### labelSelector: `string`<a id="labelselector-string"></a>

Filter resources by labels. The response will only contain resources matching the label selector. For more information, see \"[Label Selector](https://docs.hetzner.cloud)\". 

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[LoadBalancersGetAllResponse](./models/load-balancers-get-all-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/load_balancers` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.loadBalancers.getById`<a id="hetznerloadbalancersgetbyid"></a>

Gets a specific Load Balancer object.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByIdResponse = await hetzner.loadBalancers.getById({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Load Balancer

#### 🔄 Return<a id="🔄-return"></a>

[LoadBalancersGetByIdResponse](./models/load-balancers-get-by-id-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/load_balancers/{id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.loadBalancers.getMetrics`<a id="hetznerloadbalancersgetmetrics"></a>

You must specify the type of metric to get: `open_connections`, `connections_per_second`, `requests_per_second` or `bandwidth`. You can also specify more than one type by comma separation, e.g. `requests_per_second,bandwidth`.

Depending on the type you will get different time series data:

|Type | Timeseries | Unit | Description |
|---- |------------|------|-------------|
| open_connections | open_connections | number | Open connections |
| connections_per_second | connections_per_second | connections/s | Connections per second |
| requests_per_second | requests_per_second | requests/s | Requests per second |
| bandwidth | bandwidth.in | bytes/s | Ingress bandwidth |
|| bandwidth.out | bytes/s | Egress bandwidth |

Metrics are available for the last 30 days only.

If you do not provide the step argument we will automatically adjust it so that 200 samples are returned.

We limit the number of samples to a maximum of 500 and will adjust the step parameter accordingly.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getMetricsResponse = await hetzner.loadBalancers.getMetrics({
  id: 1,
  type: "open_connections",
  start: "start_example",
  end: "end_example",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Load Balancer

##### type: `'open_connections' | 'connections_per_second' | 'requests_per_second' | 'bandwidth'`<a id="type-open_connections--connections_per_second--requests_per_second--bandwidth"></a>

Type of metrics to get

##### start: `string`<a id="start-string"></a>

Start of period to get Metrics for (in ISO-8601 format)

##### end: `string`<a id="end-string"></a>

End of period to get Metrics for (in ISO-8601 format)

##### step: `string`<a id="step-string"></a>

Resolution of results in seconds

#### 🔄 Return<a id="🔄-return"></a>

[LoadBalancersGetMetricsResponse](./models/load-balancers-get-metrics-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/load_balancers/{id}/metrics` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.loadBalancers.updateBalancer`<a id="hetznerloadbalancersupdatebalancer"></a>

Updates a Load Balancer. You can update a Load Balancer’s name and a Load Balancer’s labels.

Note that when updating labels, the Load Balancer’s current set of labels will be replaced with the labels provided in the request body. So, for example, if you want to add a new label, you have to provide all existing labels plus the new label in the request body.

Note: if the Load Balancer object changes during the request, the response will be a “conflict” error.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updateBalancerResponse = await hetzner.loadBalancers.updateBalancer({
  id: 1,
  name: "new-name",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Load Balancer

##### labels: `object`<a id="labels-object"></a>

User-defined labels (key-value pairs)

##### name: `string`<a id="name-string"></a>

New Load Balancer name

#### 🔄 Return<a id="🔄-return"></a>

[LoadBalancersUpdateBalancerResponse](./models/load-balancers-update-balancer-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/load_balancers/{id}` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.locations.getAllLocations`<a id="hetznerlocationsgetalllocations"></a>

Returns all Location objects.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllLocationsResponse = await hetzner.locations.getAllLocations({
  sort: "id",
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### name: `string`<a id="name-string"></a>

Can be used to filter Locations by their name. The response will only contain the Location matching the specified name.

##### sort: `'id' | 'id:asc' | 'id:desc' | 'name' | 'name:asc' | 'name:desc'`<a id="sort-id--idasc--iddesc--name--nameasc--namedesc"></a>

Can be used multiple times.

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[LocationsGetAllLocationsResponse](./models/locations-get-all-locations-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/locations` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.locations.getLocationById`<a id="hetznerlocationsgetlocationbyid"></a>

Returns a specific Location object.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getLocationByIdResponse = await hetzner.locations.getLocationById({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of Location

#### 🔄 Return<a id="🔄-return"></a>

[LocationsGetLocationByIdResponse](./models/locations-get-location-by-id-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/locations/{id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.networkActions.addRoute`<a id="hetznernetworkactionsaddroute"></a>

Adds a route entry to a Network.

Note: if the Network object changes during the request, the response will be a “conflict” error.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const addRouteResponse = await hetzner.networkActions.addRoute({
  id: 1,
  destination: "10.100.1.0/24",
  gateway: "10.0.1.1",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### destination: `string`<a id="destination-string"></a>

Destination network or host of this route. Must not overlap with an existing ip_range in any subnets or with any destinations in other routes or with the first IP of the networks ip_range or with 172.31.1.1. Must be one of the private IPv4 ranges of RFC1918.

##### gateway: `string`<a id="gateway-string"></a>

Gateway for the route. Cannot be the first IP of the networks ip_range, an IP behind a vSwitch or 172.31.1.1, as this IP is being used as a gateway for the public network interface of Servers.

##### id: `number`<a id="id-number"></a>

ID of the Network

#### 🔄 Return<a id="🔄-return"></a>

[NetworkActionsAddRouteResponse](./models/network-actions-add-route-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/networks/{id}/actions/add_route` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.networkActions.addSubnet`<a id="hetznernetworkactionsaddsubnet"></a>

Adds a new subnet object to the Network. If you do not specify an `ip_range` for the subnet we will automatically pick the first available /24 range for you if possible.

Note: if the parent Network object changes during the request, the response will be a “conflict” error.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const addSubnetResponse = await hetzner.networkActions.addSubnet({
  id: 1,
  ip_range: "10.0.1.0/24",
  network_zone: "eu-central",
  type: "cloud",
  vswitch_id: 1000,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### network_zone: `string`<a id="network_zone-string"></a>

Name of Network zone. The Location object contains the `network_zone` property each Location belongs to.

##### type: `string`<a id="type-string"></a>

Type of Subnetwork

##### id: `number`<a id="id-number"></a>

ID of the Network

##### ip_range: `string`<a id="ip_range-string"></a>

Range to allocate IPs from. Must be a Subnet of the ip_range of the parent network object and must not overlap with any other subnets or with any destinations in routes. If the Subnet is of type vSwitch, it also can not overlap with any gateway in routes. Minimum Network size is /30. We suggest that you pick a bigger Network with a /24 netmask.

##### vswitch_id: `number`<a id="vswitch_id-number"></a>

ID of the robot vSwitch. Must be supplied if the subnet is of type vswitch.

#### 🔄 Return<a id="🔄-return"></a>

[NetworkActionsAddSubnetResponse](./models/network-actions-add-subnet-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/networks/{id}/actions/add_subnet` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.networkActions.changeIpRange`<a id="hetznernetworkactionschangeiprange"></a>

Changes the IP range of a Network. IP ranges can only be extended and never shrunk. You can only add IPs at the end of an existing IP range. This means that the IP part of your existing range must stay the same and you can only change its netmask.

For example if you have a range `10.0.0.0/16` you want to extend then your new range must also start with the IP `10.0.0.0`. Your CIDR netmask `/16` may change to a number that is smaller than `16` thereby increasing the IP range. So valid entries would be `10.0.0.0/15`, `10.0.0.0/14`, `10.0.0.0/13` and so on.

After changing the IP range you will have to adjust the routes on your connected Servers by either rebooting them or manually changing the routes to your private Network interface.

Note: if the Network object changes during the request, the response will be a “conflict” error.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const changeIpRangeResponse = await hetzner.networkActions.changeIpRange({
  id: 1,
  ip_range: "10.0.0.0/12",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### ip_range: `string`<a id="ip_range-string"></a>

The new prefix for the whole Network

##### id: `number`<a id="id-number"></a>

ID of the Network

#### 🔄 Return<a id="🔄-return"></a>

[NetworkActionsChangeIpRangeResponse](./models/network-actions-change-ip-range-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/networks/{id}/actions/change_ip_range` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.networkActions.changeProtection`<a id="hetznernetworkactionschangeprotection"></a>

Changes the protection configuration of a Network.

Note: if the Network object changes during the request, the response will be a “conflict” error.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const changeProtectionResponse = await hetzner.networkActions.changeProtection({
  id: 1,
  _delete: true,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Network

##### delete: `boolean`<a id="delete-boolean"></a>

If true, prevents the Network from being deleted

#### 🔄 Return<a id="🔄-return"></a>

[NetworkActionsChangeProtectionResponse](./models/network-actions-change-protection-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/networks/{id}/actions/change_protection` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.networkActions.deleteRoute`<a id="hetznernetworkactionsdeleteroute"></a>

Delete a route entry from a Network.

Note: if the Network object changes during the request, the response will be a “conflict” error.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const deleteRouteResponse = await hetzner.networkActions.deleteRoute({
  id: 1,
  destination: "10.100.1.0/24",
  gateway: "10.0.1.1",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### destination: `string`<a id="destination-string"></a>

Destination network or host of this route. Must not overlap with an existing ip_range in any subnets or with any destinations in other routes or with the first IP of the networks ip_range or with 172.31.1.1. Must be one of the private IPv4 ranges of RFC1918.

##### gateway: `string`<a id="gateway-string"></a>

Gateway for the route. Cannot be the first IP of the networks ip_range, an IP behind a vSwitch or 172.31.1.1, as this IP is being used as a gateway for the public network interface of Servers.

##### id: `number`<a id="id-number"></a>

ID of the Network

#### 🔄 Return<a id="🔄-return"></a>

[NetworkActionsDeleteRouteResponse](./models/network-actions-delete-route-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/networks/{id}/actions/delete_route` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.networkActions.deleteSubnet`<a id="hetznernetworkactionsdeletesubnet"></a>

Deletes a single subnet entry from a Network. You cannot delete subnets which still have Servers attached. If you have Servers attached you first need to detach all Servers that use IPs from this subnet before you can delete the subnet.

Note: if the Network object changes during the request, the response will be a “conflict” error.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const deleteSubnetResponse = await hetzner.networkActions.deleteSubnet({
  id: 1,
  ip_range: "10.0.1.0/24",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### ip_range: `string`<a id="ip_range-string"></a>

IP range of subnet to delete

##### id: `number`<a id="id-number"></a>

ID of the Network

#### 🔄 Return<a id="🔄-return"></a>

[NetworkActionsDeleteSubnetResponse](./models/network-actions-delete-subnet-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/networks/{id}/actions/delete_subnet` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.networkActions.getAction`<a id="hetznernetworkactionsgetaction"></a>

Returns a specific Action object.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getActionResponse = await hetzner.networkActions.getAction({
  id: 42,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Action.

#### 🔄 Return<a id="🔄-return"></a>

[NetworkActionsGetActionResponse](./models/network-actions-get-action-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/networks/actions/{id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.networkActions.getAction_0`<a id="hetznernetworkactionsgetaction_0"></a>

Returns a specific Action for a Network.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAction_0Response = await hetzner.networkActions.getAction_0({
  id: 1,
  actionId: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Network

##### actionId: `number`<a id="actionid-number"></a>

ID of the Action

#### 🔄 Return<a id="🔄-return"></a>

[NetworkActionsGetAction200Response](./models/network-actions-get-action200-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/networks/{id}/actions/{action_id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.networkActions.getAllActions`<a id="hetznernetworkactionsgetallactions"></a>

Returns all Action objects. You can `sort` the results by using the sort URI parameter, and filter them with the `status` and `id` parameter.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllActionsResponse = await hetzner.networkActions.getAllActions({
  id: 42,
  sort: "id",
  status: "running",
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

Filter the actions by ID. Can be used multiple times. The response will only contain actions matching the specified IDs. 

##### sort: `'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'`<a id="sort-id--idasc--iddesc--command--commandasc--commanddesc--status--statusasc--statusdesc--started--startedasc--starteddesc--finished--finishedasc--finisheddesc"></a>

Sort actions by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 

##### status: `'running' | 'success' | 'error'`<a id="status-running--success--error"></a>

Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[NetworkActionsGetAllActionsResponse](./models/network-actions-get-all-actions-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/networks/actions` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.networkActions.getAllActions_0`<a id="hetznernetworkactionsgetallactions_0"></a>

Returns all Action objects for a Network. You can sort the results by using the `sort` URI parameter, and filter them with the `status` parameter.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllActions_0Response = await hetzner.networkActions.getAllActions_0({
  id: 1,
  sort: "id",
  status: "running",
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Network

##### sort: `'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'`<a id="sort-id--idasc--iddesc--command--commandasc--commanddesc--status--statusasc--statusdesc--started--startedasc--starteddesc--finished--finishedasc--finisheddesc"></a>

Sort actions by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 

##### status: `'running' | 'success' | 'error'`<a id="status-running--success--error"></a>

Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[NetworkActionsGetAllActions200Response](./models/network-actions-get-all-actions200-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/networks/{id}/actions` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.networks.createNetwork`<a id="hetznernetworkscreatenetwork"></a>

Creates a network with the specified `ip_range`.

You may specify one or more `subnets`. You can also add more Subnets later by using the [add subnet action](https://docs.hetzner.cloud/#network-actions-add-a-subnet-to-a-network). If you do not specify an `ip_range` in the subnet we will automatically pick the first available /24 range for you.

You may specify one or more routes in `routes`. You can also add more routes later by using the [add route action](https://docs.hetzner.cloud/#network-actions-add-a-route-to-a-network).


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const createNetworkResponse = await hetzner.networks.createNetwork({
  expose_routes_to_vswitch: false,
  ip_range: "10.0.0.0/16",
  name: "mynet",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### ip_range: `string`<a id="ip_range-string"></a>

IP range of the whole network which must span all included subnets. Must be one of the private IPv4 ranges of RFC1918. Minimum network size is /24. We highly recommend that you pick a larger network with a /16 netmask.

##### name: `string`<a id="name-string"></a>

Name of the network

##### expose_routes_to_vswitch: `boolean`<a id="expose_routes_to_vswitch-boolean"></a>

Indicates if the routes from this network should be exposed to the vSwitch connection. The exposing only takes effect if a vSwitch connection is active.

##### labels: [`NetworksCreateNetworkRequestLabels`](./models/networks-create-network-request-labels.ts)<a id="labels-networkscreatenetworkrequestlabelsmodelsnetworks-create-network-request-labelsts"></a>

##### routes: [`NetworksCreateNetworkRequestRoutesInner`](./models/networks-create-network-request-routes-inner.ts)[]<a id="routes-networkscreatenetworkrequestroutesinnermodelsnetworks-create-network-request-routes-innerts"></a>

Array of routes set in this network. The destination of the route must be one of the private IPv4 ranges of RFC1918. The gateway must be a subnet/IP of the ip_range of the network object. The destination must not overlap with an existing ip_range in any subnets or with any destinations in other routes or with the first IP of the networks ip_range or with 172.31.1.1. The gateway cannot be the first IP of the networks ip_range and also cannot be 172.31.1.1.

##### subnets: [`NetworksCreateNetworkRequestSubnetsInner`](./models/networks-create-network-request-subnets-inner.ts)[]<a id="subnets-networkscreatenetworkrequestsubnetsinnermodelsnetworks-create-network-request-subnets-innerts"></a>

Array of subnets allocated.

#### 🔄 Return<a id="🔄-return"></a>

[NetworksCreateNetworkResponse](./models/networks-create-network-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/networks` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.networks.deleteNetwork`<a id="hetznernetworksdeletenetwork"></a>

Deletes a network. If there are Servers attached they will be detached in the background.

Note: if the network object changes during the request, the response will be a “conflict” error.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const deleteNetworkResponse = await hetzner.networks.deleteNetwork({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the network

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/networks/{id}` `DELETE`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.networks.getAll`<a id="hetznernetworksgetall"></a>

Gets all existing networks that you have available.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllResponse = await hetzner.networks.getAll({
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### name: `string`<a id="name-string"></a>

Filter resources by their name. The response will only contain the resources matching the specified name. 

##### labelSelector: `string`<a id="labelselector-string"></a>

Filter resources by labels. The response will only contain resources matching the label selector. For more information, see \"[Label Selector](https://docs.hetzner.cloud)\". 

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[NetworksGetAllResponse](./models/networks-get-all-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/networks` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.networks.getById`<a id="hetznernetworksgetbyid"></a>

Gets a specific network object.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByIdResponse = await hetzner.networks.getById({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the network

#### 🔄 Return<a id="🔄-return"></a>

[NetworksGetByIdResponse](./models/networks-get-by-id-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/networks/{id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.networks.updateProperties`<a id="hetznernetworksupdateproperties"></a>

Updates the network properties.

Note that when updating labels, the network’s current set of labels will be replaced with the labels provided in the request body. So, for example, if you want to add a new label, you have to provide all existing labels plus the new label in the request body.

Note: if the network object changes during the request, the response will be a “conflict” error.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updatePropertiesResponse = await hetzner.networks.updateProperties({
  id: 1,
  expose_routes_to_vswitch: false,
  name: "new-name",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the network

##### expose_routes_to_vswitch: `boolean`<a id="expose_routes_to_vswitch-boolean"></a>

Indicates if the routes from this network should be exposed to the vSwitch connection. The exposing only takes effect if a vSwitch connection is active.

##### labels: [`NetworksUpdatePropertiesRequestLabels`](./models/networks-update-properties-request-labels.ts)<a id="labels-networksupdatepropertiesrequestlabelsmodelsnetworks-update-properties-request-labelsts"></a>

##### name: `string`<a id="name-string"></a>

New network name

#### 🔄 Return<a id="🔄-return"></a>

[NetworksUpdatePropertiesResponse](./models/networks-update-properties-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/networks/{id}` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.placementGroups.createNewGroup`<a id="hetznerplacementgroupscreatenewgroup"></a>

Creates a new PlacementGroup.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const createNewGroupResponse = await hetzner.placementGroups.createNewGroup({
  name: "my Placement Group",
  type: "spread",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### name: `string`<a id="name-string"></a>

Name of the PlacementGroup

##### type: `string`<a id="type-string"></a>

Define the Placement Group Type.

##### labels: `object`<a id="labels-object"></a>

User-defined labels (key-value pairs)

#### 🔄 Return<a id="🔄-return"></a>

[PlacementGroupsCreateNewGroupResponse](./models/placement-groups-create-new-group-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/placement_groups` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.placementGroups.deleteGroup`<a id="hetznerplacementgroupsdeletegroup"></a>

Deletes a PlacementGroup.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const deleteGroupResponse = await hetzner.placementGroups.deleteGroup({
  id: 42,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Resource.

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/placement_groups/{id}` `DELETE`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.placementGroups.getAll`<a id="hetznerplacementgroupsgetall"></a>

Returns all PlacementGroup objects.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllResponse = await hetzner.placementGroups.getAll({
  sort: "id",
  type: "spread",
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### sort: `'id' | 'id:asc' | 'id:desc' | 'name' | 'name:asc' | 'name:desc' | 'created' | 'created:asc' | 'created:desc'`<a id="sort-id--idasc--iddesc--name--nameasc--namedesc--created--createdasc--createddesc"></a>

Sort resources by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 

##### name: `string`<a id="name-string"></a>

Filter resources by their name. The response will only contain the resources matching the specified name. 

##### labelSelector: `string`<a id="labelselector-string"></a>

Filter resources by labels. The response will only contain resources matching the label selector. For more information, see \"[Label Selector](https://docs.hetzner.cloud)\". 

##### type: `'spread'`<a id="type-spread"></a>

Can be used multiple times. The response will only contain PlacementGroups matching the type.

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[PlacementGroupsGetAllResponse](./models/placement-groups-get-all-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/placement_groups` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.placementGroups.getById`<a id="hetznerplacementgroupsgetbyid"></a>

Gets a specific PlacementGroup object.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByIdResponse = await hetzner.placementGroups.getById({
  id: 42,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Resource.

#### 🔄 Return<a id="🔄-return"></a>

[PlacementGroupsGetByIdResponse](./models/placement-groups-get-by-id-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/placement_groups/{id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.placementGroups.updateProperties`<a id="hetznerplacementgroupsupdateproperties"></a>

Updates the PlacementGroup properties.

Note that when updating labels, the PlacementGroup’s current set of labels will be replaced with the labels provided in the request body. So, for example, if you want to add a new label, you have to provide all existing labels plus the new label in the request body.

Note: if the PlacementGroup object changes during the request, the response will be a “conflict” error.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updatePropertiesResponse = await hetzner.placementGroups.updateProperties(
  {
    id: 42,
    name: "my Placement Group",
  }
);
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Resource.

##### labels: `object`<a id="labels-object"></a>

User-defined labels (key-value pairs)

##### name: `string`<a id="name-string"></a>

New PlacementGroup name

#### 🔄 Return<a id="🔄-return"></a>

[PlacementGroupsUpdatePropertiesResponse](./models/placement-groups-update-properties-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/placement_groups/{id}` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.pricing.getAllPrices`<a id="hetznerpricinggetallprices"></a>

Returns prices for all resources available on the platform. VAT and currency of the Project owner are used for calculations.

Both net and gross prices are included in the response.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllPricesResponse = await hetzner.pricing.getAllPrices();
```

#### 🔄 Return<a id="🔄-return"></a>

[PricingGetAllPricesResponse](./models/pricing-get-all-prices-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/pricing` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.primaryIpActions.assignPrimaryIpToResource`<a id="hetznerprimaryipactionsassignprimaryiptoresource"></a>

Assigns a Primary IP to a Server.

A Server can only have one Primary IP of type `ipv4` and one of type `ipv6` assigned. If you need more IPs use Floating IPs.

The Server must be powered off (status `off`) in order for this operation to succeed.

#### Call specific error codes<a id="call-specific-error-codes"></a>

| Code                          | Description                                                   |
|------------------------------ |-------------------------------------------------------------- |
| `server_not_stopped`          | The server is running, but needs to be powered off            |
| `primary_ip_already_assigned` | Primary ip is already assigned to a different server          |
| `server_has_ipv4`             | The server already has an ipv4 address                        |
| `server_has_ipv6`             | The server already has an ipv6 address                        |


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const assignPrimaryIpToResourceResponse =
  await hetzner.primaryIpActions.assignPrimaryIpToResource({
    id: 1,
    assignee_id: 4711,
    assignee_type: "server",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### assignee_id: `number`<a id="assignee_id-number"></a>

ID of a resource of type `assignee_type`

##### assignee_type: `string`<a id="assignee_type-string"></a>

Type of resource assigning the Primary IP to

##### id: `number`<a id="id-number"></a>

ID of the Primary IP

#### 🔄 Return<a id="🔄-return"></a>

[PrimaryIpActionsAssignPrimaryIpToResourceResponse](./models/primary-ip-actions-assign-primary-ip-to-resource-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/primary_ips/{id}/actions/assign` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.primaryIpActions.changeDnsPtr`<a id="hetznerprimaryipactionschangednsptr"></a>

Changes the hostname that will appear when getting the hostname belonging to this Primary IP.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const changeDnsPtrResponse = await hetzner.primaryIpActions.changeDnsPtr({
  id: 1,
  dns_ptr: "server02.example.com",
  ip: "1.2.3.4",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### dns_ptr: `string`<a id="dns_ptr-string"></a>

Hostname to set as a reverse DNS PTR entry, will reset to original default value if `null`

##### ip: `string`<a id="ip-string"></a>

IP address for which to set the reverse DNS entry

##### id: `number`<a id="id-number"></a>

ID of the Primary IP

#### 🔄 Return<a id="🔄-return"></a>

[PrimaryIpActionsChangeDnsPtrResponse](./models/primary-ip-actions-change-dns-ptr-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/primary_ips/{id}/actions/change_dns_ptr` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.primaryIpActions.changeProtectionPrimaryIp`<a id="hetznerprimaryipactionschangeprotectionprimaryip"></a>

Changes the protection configuration of a Primary IP.

A Primary IP can only be delete protected if its `auto_delete` property is set to `false`.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const changeProtectionPrimaryIpResponse =
  await hetzner.primaryIpActions.changeProtectionPrimaryIp({
    id: 1,
    _delete: true,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Primary IP

##### delete: `boolean`<a id="delete-boolean"></a>

If true, prevents the Primary IP from being deleted

#### 🔄 Return<a id="🔄-return"></a>

[PrimaryIpActionsChangeProtectionPrimaryIpResponse](./models/primary-ip-actions-change-protection-primary-ip-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/primary_ips/{id}/actions/change_protection` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.primaryIpActions.getActionById`<a id="hetznerprimaryipactionsgetactionbyid"></a>

Returns a specific Action object.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getActionByIdResponse = await hetzner.primaryIpActions.getActionById({
  id: 42,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Action.

#### 🔄 Return<a id="🔄-return"></a>

[PrimaryIpActionsGetActionByIdResponse](./models/primary-ip-actions-get-action-by-id-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/primary_ips/actions/{id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.primaryIpActions.getAllActions`<a id="hetznerprimaryipactionsgetallactions"></a>

Returns all Action objects. You can `sort` the results by using the sort URI parameter, and filter them with the `status` and `id` parameter.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllActionsResponse = await hetzner.primaryIpActions.getAllActions({
  id: 42,
  sort: "id",
  status: "running",
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

Filter the actions by ID. Can be used multiple times. The response will only contain actions matching the specified IDs. 

##### sort: `'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'`<a id="sort-id--idasc--iddesc--command--commandasc--commanddesc--status--statusasc--statusdesc--started--startedasc--starteddesc--finished--finishedasc--finisheddesc"></a>

Sort actions by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 

##### status: `'running' | 'success' | 'error'`<a id="status-running--success--error"></a>

Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[PrimaryIpActionsGetAllActionsResponse](./models/primary-ip-actions-get-all-actions-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/primary_ips/actions` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.primaryIpActions.unassignPrimaryIp`<a id="hetznerprimaryipactionsunassignprimaryip"></a>

Unassigns a Primary IP from a Server.

The Server must be powered off (status `off`) in order for this operation to succeed.

Note that only Servers that have at least one network interface (public or private) attached can be powered on.

#### Call specific error codes<a id="call-specific-error-codes"></a>

| Code                              | Description                                                   |
|---------------------------------- |-------------------------------------------------------------- |
| `server_not_stopped`              | The server is running, but needs to be powered off            |
| `server_is_load_balancer_target`  | The server ipv4 address is a loadbalancer target              |


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const unassignPrimaryIpResponse =
  await hetzner.primaryIpActions.unassignPrimaryIp({
    id: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Primary IP

#### 🔄 Return<a id="🔄-return"></a>

[PrimaryIpActionsUnassignPrimaryIpResponse](./models/primary-ip-actions-unassign-primary-ip-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/primary_ips/{id}/actions/unassign` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.primaryIPs.createOrUpdate`<a id="hetznerprimaryipscreateorupdate"></a>

Creates a new Primary IP, optionally assigned to a Server.

If you want to create a Primary IP that is not assigned to a Server, you need to provide the `datacenter` key instead of `assignee_id`. This can be either the ID or the name of the Datacenter this Primary IP shall be created in.

Note that a Primary IP can only be assigned to a Server in the same Datacenter later on.

#### Call specific error codes<a id="call-specific-error-codes"></a>

| Code                          | Description                                                   |
|------------------------------ |-------------------------------------------------------------- |
| `server_not_stopped`          | The specified server is running, but needs to be powered off  |
| `server_has_ipv4`             | The server already has an ipv4 address                        |
| `server_has_ipv6`             | The server already has an ipv6 address                        |


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const createOrUpdateResponse = await hetzner.primaryIPs.createOrUpdate({
  assignee_id: 17,
  assignee_type: "server",
  auto_delete: false,
  datacenter: "fsn1-dc8",
  name: "my-ip",
  type: "ipv4",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### assignee_type: `string`<a id="assignee_type-string"></a>

Resource type the Primary IP can be assigned to

##### name: `string`<a id="name-string"></a>

##### type: `string`<a id="type-string"></a>

Primary IP type

##### assignee_id: `number`<a id="assignee_id-number"></a>

ID of the resource the Primary IP should be assigned to. Omitted if it should not be assigned.

##### auto_delete: `boolean`<a id="auto_delete-boolean"></a>

Delete the Primary IP when the Server it is assigned to is deleted.

##### datacenter: `string`<a id="datacenter-string"></a>

ID or name of Datacenter the Primary IP will be bound to. Needs to be omitted if `assignee_id` is passed.

##### labels: `object`<a id="labels-object"></a>

User-defined labels (key-value pairs)

#### 🔄 Return<a id="🔄-return"></a>

[PrimaryIPsCreateOrUpdateResponse](./models/primary-ips-create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/primary_ips` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.primaryIPs.deletePrimaryIp`<a id="hetznerprimaryipsdeleteprimaryip"></a>

Deletes a Primary IP.

The Primary IP may be assigned to a Server. In this case it is unassigned automatically. The Server must be powered off (status `off`) in order for this operation to succeed.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const deletePrimaryIpResponse = await hetzner.primaryIPs.deletePrimaryIp({
  id: 42,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Resource.

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/primary_ips/{id}` `DELETE`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.primaryIPs.getAll`<a id="hetznerprimaryipsgetall"></a>

Returns all Primary IP objects.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllResponse = await hetzner.primaryIPs.getAll({
  page: 2,
  perPage: 25,
  sort: "id",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### name: `string`<a id="name-string"></a>

Filter resources by their name. The response will only contain the resources matching the specified name. 

##### labelSelector: `string`<a id="labelselector-string"></a>

Filter resources by labels. The response will only contain resources matching the label selector. For more information, see \"[Label Selector](https://docs.hetzner.cloud)\". 

##### ip: `string`<a id="ip-string"></a>

Can be used to filter resources by their ip. The response will only contain the resources matching the specified ip.

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### sort: `'id' | 'id:asc' | 'id:desc' | 'created' | 'created:asc' | 'created:desc'`<a id="sort-id--idasc--iddesc--created--createdasc--createddesc"></a>

Can be used multiple times. Choices id id:asc id:desc created created:asc created:desc

#### 🔄 Return<a id="🔄-return"></a>

[PrimaryIPsGetAllResponse](./models/primary-ips-get-all-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/primary_ips` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.primaryIPs.getById`<a id="hetznerprimaryipsgetbyid"></a>

Returns a specific Primary IP object.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByIdResponse = await hetzner.primaryIPs.getById({
  id: 42,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Resource.

#### 🔄 Return<a id="🔄-return"></a>

[PrimaryIPsGetByIdResponse](./models/primary-ips-get-by-id-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/primary_ips/{id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.primaryIPs.updateIpLabels`<a id="hetznerprimaryipsupdateiplabels"></a>

Updates the Primary IP.

Note that when updating labels, the Primary IP's current set of labels will be replaced with the labels provided in the request body. So, for example, if you want to add a new label, you have to provide all existing labels plus the new label in the request body.

If the Primary IP object changes during the request, the response will be a “conflict” error.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updateIpLabelsResponse = await hetzner.primaryIPs.updateIpLabels({
  id: 42,
  auto_delete: true,
  name: "my-ip",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Resource.

##### auto_delete: `boolean`<a id="auto_delete-boolean"></a>

Delete this Primary IP when the resource it is assigned to is deleted

##### labels: `object`<a id="labels-object"></a>

User-defined labels (key-value pairs)

##### name: `string`<a id="name-string"></a>

New unique name to set

#### 🔄 Return<a id="🔄-return"></a>

[PrimaryIPsUpdateIpLabelsResponse](./models/primary-ips-update-ip-labels-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/primary_ips/{id}` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.sshKeys.createKey`<a id="hetznersshkeyscreatekey"></a>

Creates a new SSH key with the given `name` and `public_key`. Once an SSH key is created, it can be used in other calls such as creating Servers.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const createKeyResponse = await hetzner.sshKeys.createKey({
  name: "My ssh key",
  public_key: "ssh-rsa AAAjjk76kgf...Xt",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### name: `string`<a id="name-string"></a>

Name of the SSH key

##### public_key: `string`<a id="public_key-string"></a>

Public key

##### labels: `object`<a id="labels-object"></a>

User-defined labels (key-value pairs)

#### 🔄 Return<a id="🔄-return"></a>

[SshKeysCreateKeyResponse](./models/ssh-keys-create-key-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/ssh_keys` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.sshKeys.deleteKey`<a id="hetznersshkeysdeletekey"></a>

Deletes an SSH key. It cannot be used anymore.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const deleteKeyResponse = await hetzner.sshKeys.deleteKey({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the SSH key

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/ssh_keys/{id}` `DELETE`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.sshKeys.getAllSshKeys`<a id="hetznersshkeysgetallsshkeys"></a>

Returns all SSH key objects.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllSshKeysResponse = await hetzner.sshKeys.getAllSshKeys({
  sort: "id",
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### sort: `'id' | 'id:asc' | 'id:desc' | 'name' | 'name:asc' | 'name:desc'`<a id="sort-id--idasc--iddesc--name--nameasc--namedesc"></a>

Can be used multiple times.

##### name: `string`<a id="name-string"></a>

Filter resources by their name. The response will only contain the resources matching the specified name. 

##### fingerprint: `string`<a id="fingerprint-string"></a>

Can be used to filter SSH keys by their fingerprint. The response will only contain the SSH key matching the specified fingerprint.

##### labelSelector: `string`<a id="labelselector-string"></a>

Filter resources by labels. The response will only contain resources matching the label selector. For more information, see \"[Label Selector](https://docs.hetzner.cloud)\". 

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[SshKeysGetAllSshKeysResponse](./models/ssh-keys-get-all-ssh-keys-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/ssh_keys` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.sshKeys.getById`<a id="hetznersshkeysgetbyid"></a>

Returns a specific SSH key object.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByIdResponse = await hetzner.sshKeys.getById({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the SSH key

#### 🔄 Return<a id="🔄-return"></a>

[SshKeysGetByIdResponse](./models/ssh-keys-get-by-id-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/ssh_keys/{id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.sshKeys.updateKey`<a id="hetznersshkeysupdatekey"></a>

Updates an SSH key. You can update an SSH key name and an SSH key labels.

Please note that when updating labels, the SSH key current set of labels will be replaced with the labels provided in the request body. So, for example, if you want to add a new label, you have to provide all existing labels plus the new label in the request body.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updateKeyResponse = await hetzner.sshKeys.updateKey({
  id: 1,
  name: "My ssh key",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the SSH key

##### labels: `object`<a id="labels-object"></a>

User-defined labels (key-value pairs)

##### name: `string`<a id="name-string"></a>

New name Name to set

#### 🔄 Return<a id="🔄-return"></a>

[SshKeysUpdateKeyResponse](./models/ssh-keys-update-key-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/ssh_keys/{id}` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.addToPlacementGroup`<a id="hetznerserveractionsaddtoplacementgroup"></a>

Adds a Server to a Placement Group.

Server must be powered off for this command to succeed.

#### Call specific error codes<a id="call-specific-error-codes"></a>

| Code                          | Description                                                          |
|-------------------------------|----------------------------------------------------------------------|
| `server_not_stopped`          | The action requires a stopped server                                 |


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const addToPlacementGroupResponse =
  await hetzner.serverActions.addToPlacementGroup({
    id: 1,
    placement_group: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### placement_group: `number`<a id="placement_group-number"></a>

ID of Placement Group the Server should be added to

##### id: `number`<a id="id-number"></a>

ID of the Server

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsAddToPlacementGroupResponse](./models/server-actions-add-to-placement-group-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}/actions/add_to_placement_group` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.attachIsoToServer`<a id="hetznerserveractionsattachisotoserver"></a>

Attaches an ISO to a Server. The Server will immediately see it as a new disk. An already attached ISO will automatically be detached before the new ISO is attached.

Servers with attached ISOs have a modified boot order: They will try to boot from the ISO first before falling back to hard disk.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const attachIsoToServerResponse = await hetzner.serverActions.attachIsoToServer(
  {
    id: 1,
    iso: "FreeBSD-11.0-RELEASE-amd64-dvd1",
  }
);
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### iso: `string`<a id="iso-string"></a>

ID or name of ISO to attach to the Server as listed in GET `/isos`

##### id: `number`<a id="id-number"></a>

ID of the Server

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsAttachIsoToServerResponse](./models/server-actions-attach-iso-to-server-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}/actions/attach_iso` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.attachToNetwork`<a id="hetznerserveractionsattachtonetwork"></a>

Attaches a Server to a network. This will complement the fixed public Server interface by adding an additional ethernet interface to the Server which is connected to the specified network.

The Server will get an IP auto assigned from a subnet of type `server` in the same `network_zone`.

Using the `alias_ips` attribute you can also define one or more additional IPs to the Servers. Please note that you will have to configure these IPs by hand on your Server since only the primary IP will be given out by DHCP.

**Call specific error codes**

| Code                             | Description                                                           |
|----------------------------------|-----------------------------------------------------------------------|
| `server_already_attached`        | The server is already attached to the network                         |
| `ip_not_available`               | The provided Network IP is not available                              |
| `no_subnet_available`            | No Subnet or IP is available for the Server within the network        |
| `networks_overlap`               | The network IP range overlaps with one of the server networks         |


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const attachToNetworkResponse = await hetzner.serverActions.attachToNetwork({
  id: 1,
  alias_ips: ["10.0.1.2"],
  ip: "10.0.1.1",
  network: 4711,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### network: `number`<a id="network-number"></a>

ID of an existing network to attach the Server to

##### id: `number`<a id="id-number"></a>

ID of the Server

##### alias_ips: `string`[]<a id="alias_ips-string"></a>

Additional IPs to be assigned to this Server

##### ip: `string`<a id="ip-string"></a>

IP to request to be assigned to this Server; if you do not provide this then you will be auto assigned an IP address

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsAttachToNetworkResponse](./models/server-actions-attach-to-network-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}/actions/attach_to_network` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.changeAliasIps`<a id="hetznerserveractionschangealiasips"></a>

Changes the alias IPs of an already attached Network. Note that the existing aliases for the specified Network will be replaced with these provided in the request body. So if you want to add an alias IP, you have to provide the existing ones from the Network plus the new alias IP in the request body.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const changeAliasIpsResponse = await hetzner.serverActions.changeAliasIps({
  id: 1,
  alias_ips: ["10.0.1.2"],
  network: 4711,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### alias_ips: `string`[]<a id="alias_ips-string"></a>

New alias IPs to set for this Server

##### network: `number`<a id="network-number"></a>

ID of an existing Network already attached to the Server

##### id: `number`<a id="id-number"></a>

ID of the Server

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsChangeAliasIpsResponse](./models/server-actions-change-alias-ips-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}/actions/change_alias_ips` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.changeDnsPtr`<a id="hetznerserveractionschangednsptr"></a>

Changes the hostname that will appear when getting the hostname belonging to the primary IPs (IPv4 and IPv6) of this Server.

Floating IPs assigned to the Server are not affected by this.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const changeDnsPtrResponse = await hetzner.serverActions.changeDnsPtr({
  id: 1,
  dns_ptr: "server01.example.com",
  ip: "1.2.3.4",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### dns_ptr: `string`<a id="dns_ptr-string"></a>

Hostname to set as a reverse DNS PTR entry, reset to original value if `null`

##### ip: `string`<a id="ip-string"></a>

Primary IP address for which the reverse DNS entry should be set

##### id: `number`<a id="id-number"></a>

ID of the Server

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsChangeDnsPtrResponse](./models/server-actions-change-dns-ptr-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}/actions/change_dns_ptr` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.changeProtection`<a id="hetznerserveractionschangeprotection"></a>

Changes the protection configuration of the Server.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const changeProtectionResponse = await hetzner.serverActions.changeProtection({
  id: 1,
  _delete: true,
  rebuild: true,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Server

##### delete: `boolean`<a id="delete-boolean"></a>

If true, prevents the Server from being deleted (currently delete and rebuild attribute needs to have the same value)

##### rebuild: `boolean`<a id="rebuild-boolean"></a>

If true, prevents the Server from being rebuilt (currently delete and rebuild attribute needs to have the same value)

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsChangeProtectionResponse](./models/server-actions-change-protection-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}/actions/change_protection` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.changeServerType`<a id="hetznerserveractionschangeservertype"></a>

Changes the type (Cores, RAM and disk sizes) of a Server.

Server must be powered off for this command to succeed.

This copies the content of its disk, and starts it again.

You can only migrate to Server types with the same `storage_type` and equal or bigger disks. Shrinking disks is not possible as it might destroy data.

If the disk gets upgraded, the Server type can not be downgraded any more. If you plan to downgrade the Server type, set `upgrade_disk` to `false`.

#### Call specific error codes<a id="call-specific-error-codes"></a>

| Code                          | Description                                                          |
|-------------------------------|----------------------------------------------------------------------|
| `invalid_server_type`         | The server type does not fit for the given server or is deprecated   |
| `server_not_stopped`          | The action requires a stopped server                                 |


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const changeServerTypeResponse = await hetzner.serverActions.changeServerType({
  id: 1,
  server_type: "cx11",
  upgrade_disk: true,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### server_type: `string`<a id="server_type-string"></a>

ID or name of Server type the Server should migrate to

##### upgrade_disk: `boolean`<a id="upgrade_disk-boolean"></a>

If false, do not upgrade the disk (this allows downgrading the Server type later)

##### id: `number`<a id="id-number"></a>

ID of the Server

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsChangeServerTypeResponse](./models/server-actions-change-server-type-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}/actions/change_type` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.createImage`<a id="hetznerserveractionscreateimage"></a>

Creates an Image (snapshot) from a Server by copying the contents of its disks. This creates a snapshot of the current state of the disk and copies it into an Image. If the Server is currently running you must make sure that its disk content is consistent. Otherwise, the created Image may not be readable.

To make sure disk content is consistent, we recommend to shut down the Server prior to creating an Image.

You can either create a `backup` Image that is bound to the Server and therefore will be deleted when the Server is deleted, or you can create a `snapshot` Image which is completely independent of the Server it was created from and will survive Server deletion. Backup Images are only available when the backup option is enabled for the Server. Snapshot Images are billed on a per GB basis.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const createImageResponse = await hetzner.serverActions.createImage({
  id: 1,
  description: "my image",
  type: "snapshot",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Server

##### description: `string`<a id="description-string"></a>

Description of the Image, will be auto-generated if not set

##### labels: [`ServerActionsCreateImageRequestLabels`](./models/server-actions-create-image-request-labels.ts)<a id="labels-serveractionscreateimagerequestlabelsmodelsserver-actions-create-image-request-labelsts"></a>

##### type: `string`<a id="type-string"></a>

Type of Image to create.

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsCreateImageResponse](./models/server-actions-create-image-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}/actions/create_image` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.detachFromNetwork`<a id="hetznerserveractionsdetachfromnetwork"></a>

Detaches a Server from a network. The interface for this network will vanish.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const detachFromNetworkResponse = await hetzner.serverActions.detachFromNetwork(
  {
    id: 1,
    network: 4711,
  }
);
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### network: `number`<a id="network-number"></a>

ID of an existing network to detach the Server from

##### id: `number`<a id="id-number"></a>

ID of the Server

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsDetachFromNetworkResponse](./models/server-actions-detach-from-network-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}/actions/detach_from_network` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.detachIsoFromServer`<a id="hetznerserveractionsdetachisofromserver"></a>

Detaches an ISO from a Server. In case no ISO Image is attached to the Server, the status of the returned Action is immediately set to `success`

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const detachIsoFromServerResponse =
  await hetzner.serverActions.detachIsoFromServer({
    id: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Server

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsDetachIsoFromServerResponse](./models/server-actions-detach-iso-from-server-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}/actions/detach_iso` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.disableBackup`<a id="hetznerserveractionsdisablebackup"></a>

Disables the automatic backup option and deletes all existing Backups for a Server. No more additional charges for backups will be made.

Caution: This immediately removes all existing backups for the Server!


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const disableBackupResponse = await hetzner.serverActions.disableBackup({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Server

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsDisableBackupResponse](./models/server-actions-disable-backup-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}/actions/disable_backup` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.disableRescueMode`<a id="hetznerserveractionsdisablerescuemode"></a>

Disables the Hetzner Rescue System for a Server. This makes a Server start from its disks on next reboot.

Rescue Mode is automatically disabled when you first boot into it or if you do not use it for 60 minutes.

Disabling rescue mode will not reboot your Server — you will have to do this yourself.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const disableRescueModeResponse = await hetzner.serverActions.disableRescueMode(
  {
    id: 1,
  }
);
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Server

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsDisableRescueModeResponse](./models/server-actions-disable-rescue-mode-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}/actions/disable_rescue` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.enableBackup`<a id="hetznerserveractionsenablebackup"></a>

Enables and configures the automatic daily backup option for the Server. Enabling automatic backups will increase the price of the Server by 20%. In return, you will get seven slots where Images of type backup can be stored.

Backups are automatically created daily.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const enableBackupResponse = await hetzner.serverActions.enableBackup({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Server

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsEnableBackupResponse](./models/server-actions-enable-backup-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}/actions/enable_backup` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.enableRescueMode`<a id="hetznerserveractionsenablerescuemode"></a>

Enable the Hetzner Rescue System for this Server. The next time a Server with enabled rescue mode boots it will start a special minimal Linux distribution designed for repair and reinstall.

In case a Server cannot boot on its own you can use this to access a Server’s disks.

Rescue Mode is automatically disabled when you first boot into it or if you do not use it for 60 minutes.

Enabling rescue mode will not [reboot](https://docs.hetzner.cloud/#server-actions-soft-reboot-a-server) your Server — you will have to do this yourself.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const enableRescueModeResponse = await hetzner.serverActions.enableRescueMode({
  id: 1,
  ssh_keys: [2323],
  type: "linux64",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Server

##### ssh_keys: `number`[]<a id="ssh_keys-number"></a>

Array of SSH key IDs which should be injected into the rescue system.

##### type: `string`<a id="type-string"></a>

Type of rescue system to boot.

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsEnableRescueModeResponse](./models/server-actions-enable-rescue-mode-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}/actions/enable_rescue` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.getActionById`<a id="hetznerserveractionsgetactionbyid"></a>

Returns a specific Action object.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getActionByIdResponse = await hetzner.serverActions.getActionById({
  id: 42,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Action.

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsGetActionByIdResponse](./models/server-actions-get-action-by-id-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/actions/{id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.getActionById_0`<a id="hetznerserveractionsgetactionbyid_0"></a>

Returns a specific Action object for a Server.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getActionById_0Response = await hetzner.serverActions.getActionById_0({
  id: 1,
  actionId: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Server

##### actionId: `number`<a id="actionid-number"></a>

ID of the Action

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsGetActionById200Response](./models/server-actions-get-action-by-id200-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}/actions/{action_id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.getAll`<a id="hetznerserveractionsgetall"></a>

Returns all Action objects. You can `sort` the results by using the sort URI parameter, and filter them with the `status` and `id` parameter.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllResponse = await hetzner.serverActions.getAll({
  id: 42,
  sort: "id",
  status: "running",
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

Filter the actions by ID. Can be used multiple times. The response will only contain actions matching the specified IDs. 

##### sort: `'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'`<a id="sort-id--idasc--iddesc--command--commandasc--commanddesc--status--statusasc--statusdesc--started--startedasc--starteddesc--finished--finishedasc--finisheddesc"></a>

Sort actions by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 

##### status: `'running' | 'success' | 'error'`<a id="status-running--success--error"></a>

Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsGetAllResponse](./models/server-actions-get-all-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/actions` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.getAllActions`<a id="hetznerserveractionsgetallactions"></a>

Returns all Action objects for a Server. You can `sort` the results by using the sort URI parameter, and filter them with the `status` parameter.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllActionsResponse = await hetzner.serverActions.getAllActions({
  id: 42,
  sort: "id",
  status: "running",
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Resource.

##### sort: `'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'`<a id="sort-id--idasc--iddesc--command--commandasc--commanddesc--status--statusasc--statusdesc--started--startedasc--starteddesc--finished--finishedasc--finisheddesc"></a>

Sort actions by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 

##### status: `'running' | 'success' | 'error'`<a id="status-running--success--error"></a>

Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsGetAllActionsResponse](./models/server-actions-get-all-actions-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}/actions` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.gracefulShutdown`<a id="hetznerserveractionsgracefulshutdown"></a>

Shuts down a Server gracefully by sending an ACPI shutdown request. The Server operating system must support ACPI
and react to the request, otherwise the Server will not shut down. Please note that the `action` status in this case
only reflects whether the action was sent to the server. It does not mean that the server actually shut down
successfully. If you need to ensure that the server is off, use the `poweroff` action


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const gracefulShutdownResponse = await hetzner.serverActions.gracefulShutdown({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Server

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsGracefulShutdownResponse](./models/server-actions-graceful-shutdown-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}/actions/shutdown` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.powerOffServer`<a id="hetznerserveractionspoweroffserver"></a>

Cuts power to the Server. This forcefully stops it without giving the Server operating system time to gracefully stop. May lead to data loss, equivalent to pulling the power cord. Power off should only be used when shutdown does not work.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const powerOffServerResponse = await hetzner.serverActions.powerOffServer({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Server

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsPowerOffServerResponse](./models/server-actions-power-off-server-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}/actions/poweroff` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.powerOnServer`<a id="hetznerserveractionspoweronserver"></a>

Starts a Server by turning its power on.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const powerOnServerResponse = await hetzner.serverActions.powerOnServer({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Server

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsPowerOnServerResponse](./models/server-actions-power-on-server-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}/actions/poweron` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.rebuildServerFromImage`<a id="hetznerserveractionsrebuildserverfromimage"></a>

Rebuilds a Server overwriting its disk with the content of an Image, thereby **destroying all data** on the target Server

The Image can either be one you have created earlier (`backup` or `snapshot` Image) or it can be a completely fresh `system` Image provided by us. You can get a list of all available Images with `GET /images`.

Your Server will automatically be powered off before the rebuild command executes.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const rebuildServerFromImageResponse =
  await hetzner.serverActions.rebuildServerFromImage({
    id: 1,
    image: "ubuntu-20.04",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### image: `string`<a id="image-string"></a>

ID or name of Image to rebuilt from.

##### id: `number`<a id="id-number"></a>

ID of the Server

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsRebuildServerFromImageResponse](./models/server-actions-rebuild-server-from-image-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}/actions/rebuild` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.removeFromPlacementGroup`<a id="hetznerserveractionsremovefromplacementgroup"></a>

Removes a Server from a Placement Group.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const removeFromPlacementGroupResponse =
  await hetzner.serverActions.removeFromPlacementGroup({
    id: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Server

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsRemoveFromPlacementGroupResponse](./models/server-actions-remove-from-placement-group-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}/actions/remove_from_placement_group` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.requestConsole`<a id="hetznerserveractionsrequestconsole"></a>

Requests credentials for remote access via VNC over websocket to keyboard, monitor, and mouse for a Server. The provided URL is valid for 1 minute, after this period a new url needs to be created to connect to the Server. How long the connection is open after the initial connect is not subject to this timeout.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const requestConsoleResponse = await hetzner.serverActions.requestConsole({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Server

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsRequestConsoleResponse](./models/server-actions-request-console-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}/actions/request_console` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.resetServer`<a id="hetznerserveractionsresetserver"></a>

Cuts power to a Server and starts it again. This forcefully stops it without giving the Server operating system time to gracefully stop. This may lead to data loss, it’s equivalent to pulling the power cord and plugging it in again. Reset should only be used when reboot does not work.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const resetServerResponse = await hetzner.serverActions.resetServer({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Server

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsResetServerResponse](./models/server-actions-reset-server-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}/actions/reset` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.resetServerPassword`<a id="hetznerserveractionsresetserverpassword"></a>

Resets the root password. Only works for Linux systems that are running the qemu guest agent. Server must be powered on (status `running`) in order for this operation to succeed.

This will generate a new password for this Server and return it.

If this does not succeed you can use the rescue system to netboot the Server and manually change your Server password by hand.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const resetServerPasswordResponse =
  await hetzner.serverActions.resetServerPassword({
    id: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Server

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsResetServerPasswordResponse](./models/server-actions-reset-server-password-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}/actions/reset_password` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverActions.softRebootServer`<a id="hetznerserveractionssoftrebootserver"></a>

Reboots a Server gracefully by sending an ACPI request. The Server operating system must support ACPI and react to the request, otherwise the Server will not reboot.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const softRebootServerResponse = await hetzner.serverActions.softRebootServer({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Server

#### 🔄 Return<a id="🔄-return"></a>

[ServerActionsSoftRebootServerResponse](./models/server-actions-soft-reboot-server-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}/actions/reboot` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverTypes.getServerType`<a id="hetznerservertypesgetservertype"></a>

Gets a specific Server type object.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getServerTypeResponse = await hetzner.serverTypes.getServerType({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of Server Type

#### 🔄 Return<a id="🔄-return"></a>

[ServerTypesGetServerTypeResponse](./models/server-types-get-server-type-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/server_types/{id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.serverTypes.listAllServerTypes`<a id="hetznerservertypeslistallservertypes"></a>

Gets all Server type objects.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const listAllServerTypesResponse = await hetzner.serverTypes.listAllServerTypes(
  {
    page: 2,
    perPage: 25,
  }
);
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### name: `string`<a id="name-string"></a>

Can be used to filter Server types by their name. The response will only contain the Server type matching the specified name.

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[ServerTypesListAllServerTypesResponse](./models/server-types-list-all-server-types-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/server_types` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.servers.createServerAction`<a id="hetznerserverscreateserveraction"></a>

Creates a new Server. Returns preliminary information about the Server as well as an Action that covers progress of creation.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const createServerActionResponse = await hetzner.servers.createServerAction({
  automount: false,
  datacenter: "nbg1-dc3",
  firewalls: [
    {
      firewall: 1,
    },
  ],
  image: "ubuntu-20.04",
  location: "nbg1",
  name: "my-server",
  networks: [456],
  placement_group: 1,
  server_type: "cx11",
  ssh_keys: ["my-ssh-key"],
  start_after_create: true,
  user_data: "#cloud-config\nruncmd:\n- [touch, /root/cloud-init-worked]\n",
  volumes: [123],
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### image: `string`<a id="image-string"></a>

ID or name of the Image the Server is created from

##### name: `string`<a id="name-string"></a>

Name of the Server to create (must be unique per Project and a valid hostname as per RFC 1123)

##### server_type: `string`<a id="server_type-string"></a>

ID or name of the Server type this Server should be created with

##### automount: `boolean`<a id="automount-boolean"></a>

Auto-mount Volumes after attach

##### datacenter: `string`<a id="datacenter-string"></a>

ID or name of Datacenter to create Server in (must not be used together with location)

##### firewalls: [`ServersCreateServerActionRequestFirewallsInner`](./models/servers-create-server-action-request-firewalls-inner.ts)[]<a id="firewalls-serverscreateserveractionrequestfirewallsinnermodelsservers-create-server-action-request-firewalls-innerts"></a>

Firewalls which should be applied on the Server\\\'s public network interface at creation time

##### labels: `object`<a id="labels-object"></a>

User-defined labels (key-value pairs)

##### location: `string`<a id="location-string"></a>

ID or name of Location to create Server in (must not be used together with datacenter)

##### networks: `number`[]<a id="networks-number"></a>

Network IDs which should be attached to the Server private network interface at the creation time

##### placement_group: `number`<a id="placement_group-number"></a>

ID of the Placement Group the server should be in

##### public_net: [`ServersCreateServerActionRequestPublicNet`](./models/servers-create-server-action-request-public-net.ts)<a id="public_net-serverscreateserveractionrequestpublicnetmodelsservers-create-server-action-request-public-netts"></a>

##### ssh_keys: `string`[]<a id="ssh_keys-string"></a>

SSH key IDs (`integer`) or names (`string`) which should be injected into the Server at creation time

##### start_after_create: `boolean`<a id="start_after_create-boolean"></a>

This automatically triggers a [Power on a Server-Server Action](https://docs.hetzner.cloud) after the creation is finished and is returned in the `next_actions` response object.

##### user_data: `string`<a id="user_data-string"></a>

Cloud-Init user data to use during Server creation. This field is limited to 32KiB.

##### volumes: `number`[]<a id="volumes-number"></a>

Volume IDs which should be attached to the Server at the creation time. Volumes must be in the same Location.

#### 🔄 Return<a id="🔄-return"></a>

[ServersCreateServerActionResponse](./models/servers-create-server-action-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.servers.deleteServer`<a id="hetznerserversdeleteserver"></a>

Deletes a Server. This immediately removes the Server from your account, and it is no longer accessible. Any resources attached to the server (like Volumes, Primary IPs, Floating IPs, Firewalls, Placement Groups) are detached while the server is deleted.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const deleteServerResponse = await hetzner.servers.deleteServer({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Server

#### 🔄 Return<a id="🔄-return"></a>

[ServersDeleteServerResponse](./models/servers-delete-server-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}` `DELETE`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.servers.getAll`<a id="hetznerserversgetall"></a>

Returns all existing Server objects

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllResponse = await hetzner.servers.getAll({
  sort: "id",
  status: "initializing",
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### name: `string`<a id="name-string"></a>

Filter resources by their name. The response will only contain the resources matching the specified name. 

##### labelSelector: `string`<a id="labelselector-string"></a>

Filter resources by labels. The response will only contain resources matching the label selector. For more information, see \"[Label Selector](https://docs.hetzner.cloud)\". 

##### sort: `'id' | 'id:asc' | 'id:desc' | 'name' | 'name:asc' | 'name:desc' | 'created' | 'created:asc' | 'created:desc'`<a id="sort-id--idasc--iddesc--name--nameasc--namedesc--created--createdasc--createddesc"></a>

Sort resources by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 

##### status: `'initializing' | 'starting' | 'running' | 'stopping' | 'false' | 'deleting' | 'rebuilding' | 'migrating' | 'unknown'`<a id="status-initializing--starting--running--stopping--false--deleting--rebuilding--migrating--unknown"></a>

Can be used multiple times. The response will only contain Server matching the status

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[ServersGetAllResponse](./models/servers-get-all-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.servers.getMetricsForServer`<a id="hetznerserversgetmetricsforserver"></a>

Get Metrics for specified Server.

You must specify the type of metric to get: cpu, disk or network. You can also specify more than one type by comma separation, e.g. cpu,disk.

Depending on the type you will get different time series data

| Type    | Timeseries              | Unit      | Description                                          |
|---------|-------------------------|-----------|------------------------------------------------------|
| cpu     | cpu                     | percent   | Percent CPU usage                                    |
| disk    | disk.0.iops.read        | iop/s     | Number of read IO operations per second              |
|         | disk.0.iops.write       | iop/s     | Number of write IO operations per second             |
|         | disk.0.bandwidth.read   | bytes/s   | Bytes read per second                                |
|         | disk.0.bandwidth.write  | bytes/s   | Bytes written per second                             |
| network | network.0.pps.in        | packets/s | Public Network interface packets per second received |
|         | network.0.pps.out       | packets/s | Public Network interface packets per second sent     |
|         | network.0.bandwidth.in  | bytes/s   | Public Network interface bytes/s received            |
|         | network.0.bandwidth.out | bytes/s   | Public Network interface bytes/s sent                |

Metrics are available for the last 30 days only.

If you do not provide the step argument we will automatically adjust it so that a maximum of 200 samples are returned.

We limit the number of samples returned to a maximum of 500 and will adjust the step parameter accordingly.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getMetricsForServerResponse = await hetzner.servers.getMetricsForServer({
  id: 1,
  type: "cpu",
  start: "start_example",
  end: "end_example",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Server

##### type: `'cpu' | 'disk' | 'network'`<a id="type-cpu--disk--network"></a>

Type of metrics to get

##### start: `string`<a id="start-string"></a>

Start of period to get Metrics for (in ISO-8601 format)

##### end: `string`<a id="end-string"></a>

End of period to get Metrics for (in ISO-8601 format)

##### step: `string`<a id="step-string"></a>

Resolution of results in seconds

#### 🔄 Return<a id="🔄-return"></a>

[ServersGetMetricsForServerResponse](./models/servers-get-metrics-for-server-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}/metrics` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.servers.getServer`<a id="hetznerserversgetserver"></a>

Returns a specific Server object. The Server must exist inside the Project

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getServerResponse = await hetzner.servers.getServer({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Server

#### 🔄 Return<a id="🔄-return"></a>

[ServersGetServerResponse](./models/servers-get-server-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.servers.updateServer`<a id="hetznerserversupdateserver"></a>

Updates a Server. You can update a Server’s name and a Server’s labels.
Please note that Server names must be unique per Project and valid hostnames as per RFC 1123 (i.e. may only contain letters, digits, periods, and dashes).
Also note that when updating labels, the Server’s current set of labels will be replaced with the labels provided in the request body. So, for example, if you want to add a new label, you have to provide all existing labels plus the new label in the request body.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updateServerResponse = await hetzner.servers.updateServer({
  id: 1,
  name: "my-server",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Server

##### labels: `object`<a id="labels-object"></a>

User-defined labels (key-value pairs)

##### name: `string`<a id="name-string"></a>

New name to set

#### 🔄 Return<a id="🔄-return"></a>

[ServersUpdateServerResponse](./models/servers-update-server-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/servers/{id}` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.volumeActions.attachVolumeToServer`<a id="hetznervolumeactionsattachvolumetoserver"></a>

Attaches a Volume to a Server. Works only if the Server is in the same Location as the Volume.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const attachVolumeToServerResponse =
  await hetzner.volumeActions.attachVolumeToServer({
    id: 1,
    automount: false,
    server: 43,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### server: `number`<a id="server-number"></a>

ID of the Server the Volume will be attached to

##### id: `number`<a id="id-number"></a>

ID of the Volume

##### automount: `boolean`<a id="automount-boolean"></a>

Auto-mount the Volume after attaching it

#### 🔄 Return<a id="🔄-return"></a>

[VolumeActionsAttachVolumeToServerResponse](./models/volume-actions-attach-volume-to-server-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/volumes/{id}/actions/attach` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.volumeActions.changeProtectionVolume`<a id="hetznervolumeactionschangeprotectionvolume"></a>

Changes the protection configuration of a Volume.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const changeProtectionVolumeResponse =
  await hetzner.volumeActions.changeProtectionVolume({
    id: 1,
    _delete: true,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Volume

##### delete: `boolean`<a id="delete-boolean"></a>

If true, prevents the Volume from being deleted

#### 🔄 Return<a id="🔄-return"></a>

[VolumeActionsChangeProtectionVolumeResponse](./models/volume-actions-change-protection-volume-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/volumes/{id}/actions/change_protection` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.volumeActions.changeSize`<a id="hetznervolumeactionschangesize"></a>

Changes the size of a Volume. Note that downsizing a Volume is not possible.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const changeSizeResponse = await hetzner.volumeActions.changeSize({
  id: 1,
  size: 50,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### size: `number`<a id="size-number"></a>

New Volume size in GB (must be greater than current size)

##### id: `number`<a id="id-number"></a>

ID of the Volume

#### 🔄 Return<a id="🔄-return"></a>

[VolumeActionsChangeSizeResponse](./models/volume-actions-change-size-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/volumes/{id}/actions/resize` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.volumeActions.detachVolumeFromServer`<a id="hetznervolumeactionsdetachvolumefromserver"></a>

Detaches a Volume from the Server it’s attached to. You may attach it to a Server again at a later time.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const detachVolumeFromServerResponse =
  await hetzner.volumeActions.detachVolumeFromServer({
    id: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Volume

#### 🔄 Return<a id="🔄-return"></a>

[VolumeActionsDetachVolumeFromServerResponse](./models/volume-actions-detach-volume-from-server-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/volumes/{id}/actions/detach` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.volumeActions.getAction`<a id="hetznervolumeactionsgetaction"></a>

Returns a specific Action for a Volume.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getActionResponse = await hetzner.volumeActions.getAction({
  id: 1,
  actionId: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Volume

##### actionId: `number`<a id="actionid-number"></a>

ID of the Action

#### 🔄 Return<a id="🔄-return"></a>

[VolumeActionsGetActionResponse](./models/volume-actions-get-action-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/volumes/{id}/actions/{action_id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.volumeActions.getActionById`<a id="hetznervolumeactionsgetactionbyid"></a>

Returns a specific Action object.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getActionByIdResponse = await hetzner.volumeActions.getActionById({
  id: 42,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Action.

#### 🔄 Return<a id="🔄-return"></a>

[VolumeActionsGetActionByIdResponse](./models/volume-actions-get-action-by-id-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/volumes/actions/{id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.volumeActions.getAllActions`<a id="hetznervolumeactionsgetallactions"></a>

Returns all Action objects. You can `sort` the results by using the sort URI parameter, and filter them with the `status` and `id` parameter.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllActionsResponse = await hetzner.volumeActions.getAllActions({
  id: 42,
  sort: "id",
  status: "running",
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

Filter the actions by ID. Can be used multiple times. The response will only contain actions matching the specified IDs. 

##### sort: `'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'`<a id="sort-id--idasc--iddesc--command--commandasc--commanddesc--status--statusasc--statusdesc--started--startedasc--starteddesc--finished--finishedasc--finisheddesc"></a>

Sort actions by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 

##### status: `'running' | 'success' | 'error'`<a id="status-running--success--error"></a>

Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[VolumeActionsGetAllActionsResponse](./models/volume-actions-get-all-actions-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/volumes/actions` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.volumeActions.getAllActions_0`<a id="hetznervolumeactionsgetallactions_0"></a>

Returns all Action objects for a Volume. You can `sort` the results by using the sort URI parameter, and filter them with the `status` parameter.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllActions_0Response = await hetzner.volumeActions.getAllActions_0({
  id: 1,
  sort: "id",
  status: "running",
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Volume

##### sort: `'id' | 'id:asc' | 'id:desc' | 'command' | 'command:asc' | 'command:desc' | 'status' | 'status:asc' | 'status:desc' | 'started' | 'started:asc' | 'started:desc' | 'finished' | 'finished:asc' | 'finished:desc'`<a id="sort-id--idasc--iddesc--command--commandasc--commanddesc--status--statusasc--statusdesc--started--startedasc--starteddesc--finished--finishedasc--finisheddesc"></a>

Sort actions by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 

##### status: `'running' | 'success' | 'error'`<a id="status-running--success--error"></a>

Filter the actions by status. Can be used multiple times. The response will only contain actions matching the specified statuses. 

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[VolumeActionsGetAllActions200Response](./models/volume-actions-get-all-actions200-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/volumes/{id}/actions` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.volumes.createVolume`<a id="hetznervolumescreatevolume"></a>

Creates a new Volume attached to a Server. If you want to create a Volume that is not attached to a Server, you need to provide the `location` key instead of `server`. This can be either the ID or the name of the Location this Volume will be created in. Note that a Volume can be attached to a Server only in the same Location as the Volume itself.

Specifying the Server during Volume creation will automatically attach the Volume to that Server after it has been initialized. In that case, the `next_actions` key in the response is an array which contains a single `attach_volume` action.

The minimum Volume size is 10GB and the maximum size is 10TB (10240GB).

A volume’s name can consist of alphanumeric characters, dashes, underscores, and dots, but has to start and end with an alphanumeric character. The total length is limited to 64 characters. Volume names must be unique per Project.

#### Call specific error codes<a id="call-specific-error-codes"></a>

| Code                                | Description                                         |
|-------------------------------------|-----------------------------------------------------|
| `no_space_left_in_location`         | There is no volume space left in the given location |


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const createVolumeResponse = await hetzner.volumes.createVolume({
  automount: false,
  format: "xfs",
  location: "nbg1",
  name: "databases-storage",
  size: 42,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### name: `string`<a id="name-string"></a>

Name of the volume

##### size: `number`<a id="size-number"></a>

Size of the Volume in GB

##### automount: `boolean`<a id="automount-boolean"></a>

Auto-mount Volume after attach. `server` must be provided.

##### format: `string`<a id="format-string"></a>

Format Volume after creation. One of: `xfs`, `ext4`

##### labels: `object`<a id="labels-object"></a>

User-defined labels (key-value pairs)

##### location: `string`<a id="location-string"></a>

Location to create the Volume in (can be omitted if Server is specified)

##### server: `number`<a id="server-number"></a>

Server to which to attach the Volume once it\\\'s created (Volume will be created in the same Location as the server)

#### 🔄 Return<a id="🔄-return"></a>

[VolumesCreateVolumeResponse](./models/volumes-create-volume-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/volumes` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.volumes.deleteVolume`<a id="hetznervolumesdeletevolume"></a>

Deletes a volume. All Volume data is irreversibly destroyed. The Volume must not be attached to a Server and it must not have delete protection enabled.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const deleteVolumeResponse = await hetzner.volumes.deleteVolume({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Volume

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/volumes/{id}` `DELETE`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.volumes.getAll`<a id="hetznervolumesgetall"></a>

Gets all existing Volumes that you have available.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAllResponse = await hetzner.volumes.getAll({
  status: "available",
  sort: "id",
  page: 2,
  perPage: 25,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### status: `'available' | 'creating'`<a id="status-available--creating"></a>

Can be used multiple times. The response will only contain Volumes matching the status.

##### sort: `'id' | 'id:asc' | 'id:desc' | 'name' | 'name:asc' | 'name:desc' | 'created' | 'created:asc' | 'created:desc'`<a id="sort-id--idasc--iddesc--name--nameasc--namedesc--created--createdasc--createddesc"></a>

Sort resources by field and direction. Can be used multiple times. For more information, see \"[Sorting](https://docs.hetzner.cloud)\". 

##### name: `string`<a id="name-string"></a>

Filter resources by their name. The response will only contain the resources matching the specified name. 

##### labelSelector: `string`<a id="labelselector-string"></a>

Filter resources by labels. The response will only contain resources matching the label selector. For more information, see \"[Label Selector](https://docs.hetzner.cloud)\". 

##### page: `number`<a id="page-number"></a>

Page number to return. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

##### perPage: `number`<a id="perpage-number"></a>

Maximum number of entries returned per page. For more information, see \"[Pagination](https://docs.hetzner.cloud)\".

#### 🔄 Return<a id="🔄-return"></a>

[VolumesGetAllResponse](./models/volumes-get-all-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/volumes` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.volumes.getById`<a id="hetznervolumesgetbyid"></a>

Gets a specific Volume object.

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByIdResponse = await hetzner.volumes.getById({
  id: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Volume

#### 🔄 Return<a id="🔄-return"></a>

[VolumesGetByIdResponse](./models/volumes-get-by-id-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/volumes/{id}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `hetzner.volumes.updateVolumeProperties`<a id="hetznervolumesupdatevolumeproperties"></a>

Updates the Volume properties.

Note that when updating labels, the volume’s current set of labels will be replaced with the labels provided in the request body. So, for example, if you want to add a new label, you have to provide all existing labels plus the new label in the request body.


#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updateVolumePropertiesResponse =
  await hetzner.volumes.updateVolumeProperties({
    id: 1,
    name: "database-storage",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### id: `number`<a id="id-number"></a>

ID of the Volume to update

##### labels: [`VolumesUpdateVolumePropertiesRequestLabels`](./models/volumes-update-volume-properties-request-labels.ts)<a id="labels-volumesupdatevolumepropertiesrequestlabelsmodelsvolumes-update-volume-properties-request-labelsts"></a>

##### name: `string`<a id="name-string"></a>

New Volume name

#### 🔄 Return<a id="🔄-return"></a>

[VolumesUpdateVolumePropertiesResponse](./models/volumes-update-volume-properties-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/volumes/{id}` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


## Author<a id="author"></a>
This TypeScript package is automatically generated by [Konfig](https://konfigthis.com)
