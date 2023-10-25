#!/bin/bash
function build_and_push {
    local image_name="$1"
    local context_dir="$2"

    # Build the Docker image
    docker build -t "${image_name}" "${context_dir}"

    # Tag the image
    docker tag "${image_name}" localhost:5000/"${image_name}"

    # Push the image to the local Docker registry
    docker push localhost:5000/"${image_name}"
}

function check_registry {
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000)

  ATTEMPTS=0
  MAX_ATTEMPTS=5
  while [[ "$STATUS" != "200" && "$ATTEMPTS" -lt "$MAX_ATTEMPTS" ]]; do
   docker run -d -p 5000:5000 --restart=always --name registry registry:2
   sleep 10
    ATTEMPTS=$((ATTEMPTS+1))
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000)
  done

  if [[ "$STATUS" != "200" ]]; then
    echo "Registry creation failed after $MAX_ATTEMPTS attempts."
    exit 0;
  else
    echo "Registry is ready"
  fi
}