#!/usr/bin/env bash
geth removedb
geth init genesis.json
geth --networkid 123412345 --syncmode "full" --bootnodes  "enode://e962e53530187b0c9d38e9d62b5f9ddb296b17a92c65600675b9f1ab4bd7089db1aa535bb5332784063bddd7ef9d15c407bf7becf65e0903e02530a91989e05b@192.168.99.100:30302" --rpc
