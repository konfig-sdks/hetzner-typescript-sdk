type Parameter = {
    name: string
}
type Entry = {
    parameters: Parameter[]
}
export const operationParameterMap: Record<string, Entry> = {
    '/actions-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'sort'
            },
            {
                name: 'status'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/actions/{id}-GET': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/certificates/actions/{id}-GET': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/certificates/{id}/actions/{action_id}-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'action_id'
            },
        ]
    },
    '/certificates/actions-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'sort'
            },
            {
                name: 'status'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/certificates/{id}/actions-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'sort'
            },
            {
                name: 'status'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/certificates/{id}/actions/retry-POST': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/certificates-POST': {
        parameters: [
            {
                name: 'name'
            },
            {
                name: 'certificate'
            },
            {
                name: 'domain_names'
            },
            {
                name: 'labels'
            },
            {
                name: 'private_key'
            },
            {
                name: 'type'
            },
        ]
    },
    '/certificates/{id}-DELETE': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/certificates-GET': {
        parameters: [
            {
                name: 'sort'
            },
            {
                name: 'name'
            },
            {
                name: 'label_selector'
            },
            {
                name: 'type'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/certificates/{id}-GET': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/certificates/{id}-PUT': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'labels'
            },
            {
                name: 'name'
            },
        ]
    },
    '/datacenters-GET': {
        parameters: [
            {
                name: 'name'
            },
            {
                name: 'sort'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/datacenters/{id}-GET': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/firewalls/{id}/actions/apply_to_resources-POST': {
        parameters: [
            {
                name: 'apply_to'
            },
            {
                name: 'id'
            },
        ]
    },
    '/firewalls/actions/{id}-GET': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/firewalls/{id}/actions/{action_id}-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'action_id'
            },
        ]
    },
    '/firewalls/actions-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'sort'
            },
            {
                name: 'status'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/firewalls/{id}/actions-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'sort'
            },
            {
                name: 'status'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/firewalls/{id}/actions/remove_from_resources-POST': {
        parameters: [
            {
                name: 'remove_from'
            },
            {
                name: 'id'
            },
        ]
    },
    '/firewalls/{id}/actions/set_rules-POST': {
        parameters: [
            {
                name: 'rules'
            },
            {
                name: 'id'
            },
        ]
    },
    '/firewalls-POST': {
        parameters: [
            {
                name: 'name'
            },
            {
                name: 'apply_to'
            },
            {
                name: 'labels'
            },
            {
                name: 'rules'
            },
        ]
    },
    '/firewalls/{id}-DELETE': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/firewalls/{id}-GET': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/firewalls-GET': {
        parameters: [
            {
                name: 'sort'
            },
            {
                name: 'name'
            },
            {
                name: 'label_selector'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/firewalls/{id}-PUT': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'labels'
            },
            {
                name: 'name'
            },
        ]
    },
    '/floating_ips/{id}/actions/assign-POST': {
        parameters: [
            {
                name: 'server'
            },
            {
                name: 'id'
            },
        ]
    },
    '/floating_ips/{id}/actions/change_dns_ptr-POST': {
        parameters: [
            {
                name: 'dns_ptr'
            },
            {
                name: 'ip'
            },
            {
                name: 'id'
            },
        ]
    },
    '/floating_ips/{id}/actions/change_protection-POST': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'delete'
            },
        ]
    },
    '/floating_ips/actions/{id}-GET': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/floating_ips/{id}/actions/{action_id}-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'action_id'
            },
        ]
    },
    '/floating_ips/actions-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'sort'
            },
            {
                name: 'status'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/floating_ips/{id}/actions-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'sort'
            },
            {
                name: 'status'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/floating_ips/{id}/actions/unassign-POST': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/floating_ips-POST': {
        parameters: [
            {
                name: 'type'
            },
            {
                name: 'description'
            },
            {
                name: 'home_location'
            },
            {
                name: 'labels'
            },
            {
                name: 'name'
            },
            {
                name: 'server'
            },
        ]
    },
    '/floating_ips/{id}-DELETE': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/floating_ips/{id}-GET': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/floating_ips-GET': {
        parameters: [
            {
                name: 'name'
            },
            {
                name: 'label_selector'
            },
            {
                name: 'sort'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/floating_ips/{id}-PUT': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'description'
            },
            {
                name: 'labels'
            },
            {
                name: 'name'
            },
        ]
    },
    '/isos/{id}-GET': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/isos-GET': {
        parameters: [
            {
                name: 'name'
            },
            {
                name: 'architecture'
            },
            {
                name: 'include_architecture_wildcard'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/images/{id}/actions/change_protection-POST': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'delete'
            },
        ]
    },
    '/images/actions/{id}-GET': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/images/{id}/actions/{action_id}-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'action_id'
            },
        ]
    },
    '/images/actions-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'sort'
            },
            {
                name: 'status'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/images/{id}/actions-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'sort'
            },
            {
                name: 'status'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/images/{id}-DELETE': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/images-GET': {
        parameters: [
            {
                name: 'sort'
            },
            {
                name: 'type'
            },
            {
                name: 'status'
            },
            {
                name: 'bound_to'
            },
            {
                name: 'include_deprecated'
            },
            {
                name: 'name'
            },
            {
                name: 'label_selector'
            },
            {
                name: 'architecture'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/images/{id}-GET': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/images/{id}-PUT': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'description'
            },
            {
                name: 'labels'
            },
            {
                name: 'type'
            },
        ]
    },
    '/load_balancers/{id}/actions/add_service-POST': {
        parameters: [
            {
                name: 'destination_port'
            },
            {
                name: 'health_check'
            },
            {
                name: 'listen_port'
            },
            {
                name: 'protocol'
            },
            {
                name: 'proxyprotocol'
            },
            {
                name: 'id'
            },
            {
                name: 'http'
            },
        ]
    },
    '/load_balancers/{id}/actions/add_target-POST': {
        parameters: [
            {
                name: 'type'
            },
            {
                name: 'id'
            },
            {
                name: 'ip'
            },
            {
                name: 'label_selector'
            },
            {
                name: 'server'
            },
            {
                name: 'use_private_ip'
            },
        ]
    },
    '/load_balancers/{id}/actions/attach_to_network-POST': {
        parameters: [
            {
                name: 'network'
            },
            {
                name: 'id'
            },
            {
                name: 'ip'
            },
        ]
    },
    '/load_balancers/{id}/actions/change_algorithm-POST': {
        parameters: [
            {
                name: 'type'
            },
            {
                name: 'id'
            },
        ]
    },
    '/load_balancers/{id}/actions/change_dns_ptr-POST': {
        parameters: [
            {
                name: 'dns_ptr'
            },
            {
                name: 'ip'
            },
            {
                name: 'id'
            },
        ]
    },
    '/load_balancers/{id}/actions/change_protection-POST': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'delete'
            },
        ]
    },
    '/load_balancers/{id}/actions/change_type-POST': {
        parameters: [
            {
                name: 'load_balancer_type'
            },
            {
                name: 'id'
            },
        ]
    },
    '/load_balancers/{id}/actions/delete_service-POST': {
        parameters: [
            {
                name: 'listen_port'
            },
            {
                name: 'id'
            },
        ]
    },
    '/load_balancers/{id}/actions/detach_from_network-POST': {
        parameters: [
            {
                name: 'network'
            },
            {
                name: 'id'
            },
        ]
    },
    '/load_balancers/{id}/actions/disable_public_interface-POST': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/load_balancers/{id}/actions/enable_public_interface-POST': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/load_balancers/actions-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'sort'
            },
            {
                name: 'status'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/load_balancers/{id}/actions-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'sort'
            },
            {
                name: 'status'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/load_balancers/actions/{id}-GET': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/load_balancers/{id}/actions/{action_id}-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'action_id'
            },
        ]
    },
    '/load_balancers/{id}/actions/remove_target-POST': {
        parameters: [
            {
                name: 'type'
            },
            {
                name: 'id'
            },
            {
                name: 'ip'
            },
            {
                name: 'label_selector'
            },
            {
                name: 'server'
            },
        ]
    },
    '/load_balancers/{id}/actions/update_service-POST': {
        parameters: [
            {
                name: 'listen_port'
            },
            {
                name: 'id'
            },
            {
                name: 'destination_port'
            },
            {
                name: 'health_check'
            },
            {
                name: 'http'
            },
            {
                name: 'protocol'
            },
            {
                name: 'proxyprotocol'
            },
        ]
    },
    '/load_balancer_types-GET': {
        parameters: [
            {
                name: 'name'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/load_balancer_types/{id}-GET': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/load_balancers-POST': {
        parameters: [
            {
                name: 'load_balancer_type'
            },
            {
                name: 'name'
            },
            {
                name: 'algorithm'
            },
            {
                name: 'labels'
            },
            {
                name: 'location'
            },
            {
                name: 'network'
            },
            {
                name: 'network_zone'
            },
            {
                name: 'public_interface'
            },
            {
                name: 'services'
            },
            {
                name: 'targets'
            },
        ]
    },
    '/load_balancers/{id}-DELETE': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/load_balancers-GET': {
        parameters: [
            {
                name: 'sort'
            },
            {
                name: 'name'
            },
            {
                name: 'label_selector'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/load_balancers/{id}-GET': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/load_balancers/{id}/metrics-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'type'
            },
            {
                name: 'start'
            },
            {
                name: 'end'
            },
            {
                name: 'step'
            },
        ]
    },
    '/load_balancers/{id}-PUT': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'labels'
            },
            {
                name: 'name'
            },
        ]
    },
    '/locations-GET': {
        parameters: [
            {
                name: 'name'
            },
            {
                name: 'sort'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/locations/{id}-GET': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/networks/{id}/actions/add_route-POST': {
        parameters: [
            {
                name: 'destination'
            },
            {
                name: 'gateway'
            },
            {
                name: 'id'
            },
        ]
    },
    '/networks/{id}/actions/add_subnet-POST': {
        parameters: [
            {
                name: 'network_zone'
            },
            {
                name: 'type'
            },
            {
                name: 'id'
            },
            {
                name: 'ip_range'
            },
            {
                name: 'vswitch_id'
            },
        ]
    },
    '/networks/{id}/actions/change_ip_range-POST': {
        parameters: [
            {
                name: 'ip_range'
            },
            {
                name: 'id'
            },
        ]
    },
    '/networks/{id}/actions/change_protection-POST': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'delete'
            },
        ]
    },
    '/networks/{id}/actions/delete_route-POST': {
        parameters: [
            {
                name: 'destination'
            },
            {
                name: 'gateway'
            },
            {
                name: 'id'
            },
        ]
    },
    '/networks/{id}/actions/delete_subnet-POST': {
        parameters: [
            {
                name: 'ip_range'
            },
            {
                name: 'id'
            },
        ]
    },
    '/networks/actions/{id}-GET': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/networks/{id}/actions/{action_id}-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'action_id'
            },
        ]
    },
    '/networks/actions-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'sort'
            },
            {
                name: 'status'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/networks/{id}/actions-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'sort'
            },
            {
                name: 'status'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/networks-POST': {
        parameters: [
            {
                name: 'ip_range'
            },
            {
                name: 'name'
            },
            {
                name: 'expose_routes_to_vswitch'
            },
            {
                name: 'labels'
            },
            {
                name: 'routes'
            },
            {
                name: 'subnets'
            },
        ]
    },
    '/networks/{id}-DELETE': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/networks-GET': {
        parameters: [
            {
                name: 'name'
            },
            {
                name: 'label_selector'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/networks/{id}-GET': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/networks/{id}-PUT': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'expose_routes_to_vswitch'
            },
            {
                name: 'labels'
            },
            {
                name: 'name'
            },
        ]
    },
    '/placement_groups-POST': {
        parameters: [
            {
                name: 'name'
            },
            {
                name: 'type'
            },
            {
                name: 'labels'
            },
        ]
    },
    '/placement_groups/{id}-DELETE': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/placement_groups-GET': {
        parameters: [
            {
                name: 'sort'
            },
            {
                name: 'name'
            },
            {
                name: 'label_selector'
            },
            {
                name: 'type'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/placement_groups/{id}-GET': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/placement_groups/{id}-PUT': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'labels'
            },
            {
                name: 'name'
            },
        ]
    },
    '/pricing-GET': {
        parameters: [
        ]
    },
    '/primary_ips/{id}/actions/assign-POST': {
        parameters: [
            {
                name: 'assignee_id'
            },
            {
                name: 'assignee_type'
            },
            {
                name: 'id'
            },
        ]
    },
    '/primary_ips/{id}/actions/change_dns_ptr-POST': {
        parameters: [
            {
                name: 'dns_ptr'
            },
            {
                name: 'ip'
            },
            {
                name: 'id'
            },
        ]
    },
    '/primary_ips/{id}/actions/change_protection-POST': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'delete'
            },
        ]
    },
    '/primary_ips/actions/{id}-GET': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/primary_ips/actions-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'sort'
            },
            {
                name: 'status'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/primary_ips/{id}/actions/unassign-POST': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/primary_ips-POST': {
        parameters: [
            {
                name: 'assignee_type'
            },
            {
                name: 'name'
            },
            {
                name: 'type'
            },
            {
                name: 'assignee_id'
            },
            {
                name: 'auto_delete'
            },
            {
                name: 'datacenter'
            },
            {
                name: 'labels'
            },
        ]
    },
    '/primary_ips/{id}-DELETE': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/primary_ips-GET': {
        parameters: [
            {
                name: 'name'
            },
            {
                name: 'label_selector'
            },
            {
                name: 'ip'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
            {
                name: 'sort'
            },
        ]
    },
    '/primary_ips/{id}-GET': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/primary_ips/{id}-PUT': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'auto_delete'
            },
            {
                name: 'labels'
            },
            {
                name: 'name'
            },
        ]
    },
    '/ssh_keys-POST': {
        parameters: [
            {
                name: 'name'
            },
            {
                name: 'public_key'
            },
            {
                name: 'labels'
            },
        ]
    },
    '/ssh_keys/{id}-DELETE': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/ssh_keys-GET': {
        parameters: [
            {
                name: 'sort'
            },
            {
                name: 'name'
            },
            {
                name: 'fingerprint'
            },
            {
                name: 'label_selector'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/ssh_keys/{id}-GET': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/ssh_keys/{id}-PUT': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'labels'
            },
            {
                name: 'name'
            },
        ]
    },
    '/servers/{id}/actions/add_to_placement_group-POST': {
        parameters: [
            {
                name: 'placement_group'
            },
            {
                name: 'id'
            },
        ]
    },
    '/servers/{id}/actions/attach_iso-POST': {
        parameters: [
            {
                name: 'iso'
            },
            {
                name: 'id'
            },
        ]
    },
    '/servers/{id}/actions/attach_to_network-POST': {
        parameters: [
            {
                name: 'network'
            },
            {
                name: 'id'
            },
            {
                name: 'alias_ips'
            },
            {
                name: 'ip'
            },
        ]
    },
    '/servers/{id}/actions/change_alias_ips-POST': {
        parameters: [
            {
                name: 'alias_ips'
            },
            {
                name: 'network'
            },
            {
                name: 'id'
            },
        ]
    },
    '/servers/{id}/actions/change_dns_ptr-POST': {
        parameters: [
            {
                name: 'dns_ptr'
            },
            {
                name: 'ip'
            },
            {
                name: 'id'
            },
        ]
    },
    '/servers/{id}/actions/change_protection-POST': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'delete'
            },
            {
                name: 'rebuild'
            },
        ]
    },
    '/servers/{id}/actions/change_type-POST': {
        parameters: [
            {
                name: 'server_type'
            },
            {
                name: 'upgrade_disk'
            },
            {
                name: 'id'
            },
        ]
    },
    '/servers/{id}/actions/create_image-POST': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'description'
            },
            {
                name: 'labels'
            },
            {
                name: 'type'
            },
        ]
    },
    '/servers/{id}/actions/detach_from_network-POST': {
        parameters: [
            {
                name: 'network'
            },
            {
                name: 'id'
            },
        ]
    },
    '/servers/{id}/actions/detach_iso-POST': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/servers/{id}/actions/disable_backup-POST': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/servers/{id}/actions/disable_rescue-POST': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/servers/{id}/actions/enable_backup-POST': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/servers/{id}/actions/enable_rescue-POST': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'ssh_keys'
            },
            {
                name: 'type'
            },
        ]
    },
    '/servers/actions/{id}-GET': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/servers/{id}/actions/{action_id}-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'action_id'
            },
        ]
    },
    '/servers/actions-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'sort'
            },
            {
                name: 'status'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/servers/{id}/actions-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'sort'
            },
            {
                name: 'status'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/servers/{id}/actions/shutdown-POST': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/servers/{id}/actions/poweroff-POST': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/servers/{id}/actions/poweron-POST': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/servers/{id}/actions/rebuild-POST': {
        parameters: [
            {
                name: 'image'
            },
            {
                name: 'id'
            },
        ]
    },
    '/servers/{id}/actions/remove_from_placement_group-POST': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/servers/{id}/actions/request_console-POST': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/servers/{id}/actions/reset-POST': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/servers/{id}/actions/reset_password-POST': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/servers/{id}/actions/reboot-POST': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/server_types/{id}-GET': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/server_types-GET': {
        parameters: [
            {
                name: 'name'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/servers-POST': {
        parameters: [
            {
                name: 'image'
            },
            {
                name: 'name'
            },
            {
                name: 'server_type'
            },
            {
                name: 'automount'
            },
            {
                name: 'datacenter'
            },
            {
                name: 'firewalls'
            },
            {
                name: 'labels'
            },
            {
                name: 'location'
            },
            {
                name: 'networks'
            },
            {
                name: 'placement_group'
            },
            {
                name: 'public_net'
            },
            {
                name: 'ssh_keys'
            },
            {
                name: 'start_after_create'
            },
            {
                name: 'user_data'
            },
            {
                name: 'volumes'
            },
        ]
    },
    '/servers/{id}-DELETE': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/servers-GET': {
        parameters: [
            {
                name: 'name'
            },
            {
                name: 'label_selector'
            },
            {
                name: 'sort'
            },
            {
                name: 'status'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/servers/{id}/metrics-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'type'
            },
            {
                name: 'start'
            },
            {
                name: 'end'
            },
            {
                name: 'step'
            },
        ]
    },
    '/servers/{id}-GET': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/servers/{id}-PUT': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'labels'
            },
            {
                name: 'name'
            },
        ]
    },
    '/volumes/{id}/actions/attach-POST': {
        parameters: [
            {
                name: 'server'
            },
            {
                name: 'id'
            },
            {
                name: 'automount'
            },
        ]
    },
    '/volumes/{id}/actions/change_protection-POST': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'delete'
            },
        ]
    },
    '/volumes/{id}/actions/resize-POST': {
        parameters: [
            {
                name: 'size'
            },
            {
                name: 'id'
            },
        ]
    },
    '/volumes/{id}/actions/detach-POST': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/volumes/{id}/actions/{action_id}-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'action_id'
            },
        ]
    },
    '/volumes/actions/{id}-GET': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/volumes/actions-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'sort'
            },
            {
                name: 'status'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/volumes/{id}/actions-GET': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'sort'
            },
            {
                name: 'status'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/volumes-POST': {
        parameters: [
            {
                name: 'name'
            },
            {
                name: 'size'
            },
            {
                name: 'automount'
            },
            {
                name: 'format'
            },
            {
                name: 'labels'
            },
            {
                name: 'location'
            },
            {
                name: 'server'
            },
        ]
    },
    '/volumes/{id}-DELETE': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/volumes-GET': {
        parameters: [
            {
                name: 'status'
            },
            {
                name: 'sort'
            },
            {
                name: 'name'
            },
            {
                name: 'label_selector'
            },
            {
                name: 'page'
            },
            {
                name: 'per_page'
            },
        ]
    },
    '/volumes/{id}-GET': {
        parameters: [
            {
                name: 'id'
            },
        ]
    },
    '/volumes/{id}-PUT': {
        parameters: [
            {
                name: 'id'
            },
            {
                name: 'labels'
            },
            {
                name: 'name'
            },
        ]
    },
}