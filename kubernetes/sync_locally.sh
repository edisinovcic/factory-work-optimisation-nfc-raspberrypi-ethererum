#!/usr/bin/env bash

geth removedb
geth init genesis.json
geth --networkid 123412345 --syncmode "full" --bootnodes  "enode://eec98ce6ae292ca1afae9a2c25aaf2262840857026e4b38fe744f4898e3751b40b0ce28e1a53c996428de4cc6cd6fc0f822b86afa0b557ce8f7b1f1f8278bf90@127.0.0.1:30304" --rpc --gasprice=0
