#!/bin/bash
function redeploy {

  kubectl delete -f k8s
  kubectl apply -f k8s
  kubectl get certificate node-tls --output=jsonpath='{.status.conditions[0].status}' -n itunes-app-store

  STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://itunesApp.bules.eu)

  ATTEMPTS=0
  MAX_ATTEMPTS=10
  while [[ "$STATUS" != "200" && "$ATTEMPTS" -lt "$MAX_ATTEMPTS" ]]; do
    kubectl delete -f k8s/ingress.yaml
    kubectl apply -f k8s/ingress.yaml
    sleep 10
    ATTEMPTS=$((ATTEMPTS+1))
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://itunesApp.bules.eu)
  done

  if [[ "$STATUS" != "200" ]]; then
    echo "Deployment failed after $MAX_ATTEMPTS attempts."
    exit 1;
  else
    echo "Deployment is ready"
    exit 0;
  fi

}