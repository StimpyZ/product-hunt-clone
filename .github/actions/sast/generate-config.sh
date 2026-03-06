#!/usr/bin/env bash
set -euo pipefail

CONFIG_FILE="/tmp/sast-config.yaml"

build_include_list() {
  if [[ "${INPUT_MODE}" == "diff" ]]; then
    if [[ -z "${CHANGED_FILES}" ]]; then
      echo "::notice::No files changed. Skipping scan."
      echo "skip=true" >> "${GITHUB_OUTPUT}"
      return 1
    fi
    echo "${CHANGED_FILES}"
  else
    echo "${INPUT_TARGET}"
  fi
}

write_config() {
  local include_items="$1"

  cat > "${CONFIG_FILE}" << EOF
namespace: ${GITHUB_REPOSITORY}
language: ${INPUT_LANGUAGE}
strict: ${INPUT_STRICT}
tracing_opt_out: true
output:
  file_path: ${INPUT_OUTPUT_FILE}
  format: ${INPUT_OUTPUT_FORMAT}
sast:
  include:
EOF

  while IFS= read -r item; do
    [[ -n "${item}" ]] && echo "    - ${item}" >> "${CONFIG_FILE}"
  done <<< "${include_items}"

  if [[ -n "${INPUT_EXCLUDE}" ]]; then
    echo "  exclude:" >> "${CONFIG_FILE}"
    IFS=',' read -ra excludes <<< "${INPUT_EXCLUDE}"
    for path in "${excludes[@]}"; do
      echo "    - $(echo "${path}" | xargs)" >> "${CONFIG_FILE}"
    done
  fi

  if [[ -n "${INPUT_CHECKS}" ]]; then
    echo "checks:" >> "${CONFIG_FILE}"
    IFS=',' read -ra checks <<< "${INPUT_CHECKS}"
    for check in "${checks[@]}"; do
      echo "  - $(echo "${check}" | xargs)" >> "${CONFIG_FILE}"
    done
  fi
}

run_scan() {
  echo "::group::Generated configuration"
  cat "${CONFIG_FILE}"
  echo "::endgroup::"

  local exit_code=0
  docker run --rm \
    -v "${GITHUB_WORKSPACE}:/src" \
    -v "${CONFIG_FILE}:${CONFIG_FILE}:ro" \
    "docker.io/fluidattacks/sast:${INPUT_IMAGE_TAG}" \
    scan "${CONFIG_FILE}" || exit_code=$?

  if [[ ${exit_code} -eq 0 ]]; then
    echo "vulnerabilities_found=false" >> "${GITHUB_OUTPUT}"
  elif [[ ${exit_code} -eq 1 ]]; then
    echo "vulnerabilities_found=true" >> "${GITHUB_OUTPUT}"
  else
    echo "::error::Scanner exited with code ${exit_code}"
    exit "${exit_code}"
  fi

  if [[ "${INPUT_OUTPUT_FORMAT}" == "SARIF" || "${INPUT_OUTPUT_FORMAT}" == "ALL" ]]; then
    echo "sarif_file=${INPUT_OUTPUT_FILE}" >> "${GITHUB_OUTPUT}"
  fi
}

main() {
  local include_items
  if ! include_items=$(build_include_list); then
    exit 0
  fi

  echo "skip=false" >> "${GITHUB_OUTPUT}"
  write_config "${include_items}"
  run_scan
}

main
