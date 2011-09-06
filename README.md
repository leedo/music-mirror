This is a collection of servers for syncing and indexing music files
across many servers.

Things are broken down into three basic components:

 * Storage - maps hashes to filesystem (maybe other backends)
 * Indexer - maps hashes to metadata and vice-versa
 * Mirror - HTTP interface for accessing data and/or metadata

Ideally one could run a single indexer, but have multiple storage
backends running in various places.
