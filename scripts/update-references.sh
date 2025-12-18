#!/usr/bin/env bash
set -euo pipefail

# Update or add upstream reference repos into reference_repos/ using git subtree.
# Usage: ./scripts/update-references.sh add|update

ACTION=${1:-update}

REPOS=(
  "carbon|https://github.com/carbon-design-system/carbon.git|main"
  "carbon-website|https://github.com/carbon-design-system/carbon-website.git|main"
  "carbon-design-kit|https://github.com/carbon-design-system/carbon-design-kit.git|master"
  "carbon-charts|https://github.com/carbon-design-system/carbon-charts.git|main"
  "orange3|https://github.com/biolab/orange3.git|main"
)

mkdir -p reference_repos

for entry in "${REPOS[@]}"; do
  name=${entry%%|*}
  url=${entry#*|}
  url=${url%%|*}
  branch=${entry##*|}
  remote_name="ref-$name"

  echo "\n==> Processing $name ($branch)"

  # add remote if missing
  if ! git remote get-url "$remote_name" >/dev/null 2>&1; then
    git remote add "$remote_name" "$url" || true
  fi

  git fetch "$remote_name" "$branch"

  if [ "$ACTION" = "add" ]; then
    if [ -d "reference_repos/$name" ]; then
      echo "reference_repos/$name already exists — skipping add"
    else
      git subtree add --prefix=reference_repos/$name "$remote_name" "$branch" --squash
    fi
  else
    if [ -d "reference_repos/$name" ]; then
      git subtree pull --prefix=reference_repos/$name "$remote_name" "$branch" --squash || true
    else
      git subtree add --prefix=reference_repos/$name "$remote_name" "$branch" --squash
    fi
  fi
done

echo "\nAll done. See reference_repos/ for the imported projects."
