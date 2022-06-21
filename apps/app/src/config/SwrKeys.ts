export const Swrs = [
  "CYBER_CONNECT_FOLLOWERS",
  "CYBER_CONNECT_FOLLOWINGS",
  "CYBER_CONNECT_IDENTITY",
  "CYBER_CONNECT_FEATURED",
  "CYBER_CONNECT_POPULAR",
  "CYBER_CONNECT_RANKINGS",
  "CYBER_CONNECT_RECOMMENDATIONS",
  "CYBER_CONNECT_STATUS",
  "ENS",
  "ENS_AVATAR",
  "ENS_RESOLVER",
  "ENS_QUERY",
  "OPENSEA_ASSET",
  "OPENSEA_ASSETS",
  "NETWORKS",
  "NETWORKS_RAW",
  "POAP_EVENT",
  "POAP_EVENT_TOKENS",
  "POAP_ACTIONS",
  "POAP_TOKEN",
  "QUEUE_ADDRESS",
  "QUEUE_NETWORK_CYBERCONNECT",
  "QUEUE_NETWORK_POAP",
  "QUEUE_NETWORK_SNAPSHOT",
  "SESSION",
  "SNAPSHOT_SPACE",
  "SNAPSHOT_VOTERS",
  "SNAPSHOT_VOTES",
  "TIMELINE_ADDRESS",
  "TIMELINE_NETWORK_CYBERCONNECT",
  "TIMELINE_NETWORK_POAP",
  "TIMELINE_NETWORK_SNAPSHOT",
  "USER",
] as const;

export const SwrKeys: {
  readonly [key in typeof Swrs[number]]: string;
} = {
  CYBER_CONNECT_FOLLOWERS: "/cyberconnect/followers",
  CYBER_CONNECT_FOLLOWINGS: "/cyberconnect/followings",
  CYBER_CONNECT_IDENTITY: "/cyberconnect/identity",
  CYBER_CONNECT_FEATURED: "/cyberconnect/featured",
  CYBER_CONNECT_POPULAR: "/cyberconnect/popular",
  CYBER_CONNECT_RANKINGS: "/cyberconnect/rankings",
  CYBER_CONNECT_RECOMMENDATIONS: "/cyberconnect/recommendations",
  CYBER_CONNECT_STATUS: "/cyberconnect/status",
  ENS: "/ens",
  ENS_AVATAR: "/ens/avatar",
  ENS_RESOLVER: "/ens/resolver",
  ENS_QUERY: "/ens/query",
  OPENSEA_ASSET: "/opensea/asset",
  OPENSEA_ASSETS: "/opensea/assets",
  NETWORKS: "/networks",
  NETWORKS_RAW: "/networks/raw",
  POAP_EVENT: "/poap/event",
  POAP_EVENT_TOKENS: "/poap/event/tokens",
  POAP_ACTIONS: "/poap/actions",
  POAP_TOKEN: "/poap/token",
  QUEUE_ADDRESS: "/queue/address",
  QUEUE_NETWORK_CYBERCONNECT: "/queue/network/cyberconnect",
  QUEUE_NETWORK_POAP: "/queue/network/poap",
  QUEUE_NETWORK_SNAPSHOT: "/queue/network/snapshot",
  SESSION: "/session",
  SNAPSHOT_SPACE: "/snapshot/space",
  SNAPSHOT_VOTERS: "/snapshot/voters",
  SNAPSHOT_VOTES: "/snapshot/votes",
  TIMELINE_ADDRESS: "/timeline/address",
  TIMELINE_NETWORK_CYBERCONNECT: "/timeline/network/cyberconnect",
  TIMELINE_NETWORK_POAP: "/timeline/network/poap",
  TIMELINE_NETWORK_SNAPSHOT: "/timeline/network/snapshot",
  USER: "/user",
};
