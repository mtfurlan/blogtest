#!/usr/bin/env bash
set -euo pipefail

# shellcheck disable=SC2120
h () {
    # if arguments, print them
    [ $# == 0 ] || echo "$*"

  cat <<EOF
Usage: $(basename "${BASH_SOURCE[0]}") [OPTION]... BLOGPOST
  BLOGPOST: path to markdown file

move something from draft to blog
Available options:
  -h, --help       display this help and exit
EOF

    # if args, exit 1 else exit 0
    [ $# == 0 ] || exit 1
    exit 0
}
msg() {
    echo >&2 -e "${*-}"
}

die() {
    local msg=$1
    local code=${2-1} # default exit status 1
    msg "$msg"
    exit "$code"
}

# getopt short options go together, long options have commas
TEMP=$(getopt -o h --long help -n "$0" -- "$@")
#shellcheck disable=SC2181
if [ $? != 0 ] ; then
    die "something wrong with getopt"
fi
eval set -- "$TEMP"

while true ; do
    case "$1" in
        -h|--help) h ;;
        --) shift ; break ;;
        *) die "issue parsing args, unexpected argument '$1'!" ;;
    esac
done

blogpsot=${1:-}
if [[ -z "$blogpost" ]] || [[ ! -f "$blogpost" ]]; then
    h "need to pass in path to blog post to release, or you passed a file that doesn't exist"
fi



last modified date git log -1 --format=%at



