#!/bin/sh

if [ -e ./.clasprc.json ]; then
  cp ./.clasprc.json ~/.clasprc.json
fi

clasp push