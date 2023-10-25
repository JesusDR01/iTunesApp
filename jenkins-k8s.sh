#!/bin/bash
source docker_functions.sh
source kube_redeploy.sh
pnpm prettier:check
check_registry

build_and_push itunes-app-storefront .


kubectl delete -f k8s
kubectl apply -f k8s
redeploy
exit 0;