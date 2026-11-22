#!/bin/bash

pandoc docs/??_*.md \
    --toc \
    --toc-depth=2 \
    --number-sections \
    --resource-path=docs \
    --metadata=tables-vrules \
    --include-before-body=docs/tex/frontpage.tex \
    -V papersize=a4 \
    -H docs/tex/header.tex \
    -V geometry:margin=2cm \
    --lua-filter=docs/lua/br.lua \
    --lua-filter=docs/lua/column-width.lua \
    --lua-filter=docs/lua/tables-rules.lua \
    -o docs/deliverables/PROINZ26_G09.1_BBTM.pdf