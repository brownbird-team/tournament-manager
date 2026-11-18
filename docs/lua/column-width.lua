
-- Content-aware Pandoc table column widths

local CHARS_PER_LINE = 90
local MIN_WIDTH = 0.2
local MAX_MIN_WIDTH = 0.55
local ATOM_PADDING = 2

-- Count UTF-8 characters rather than bytes
local function text_length(s)
    return utf8.len(s) or #s
end

-- Find the longest unbreakable word
local function longest_word(s)
    local maximum = 0

    for word in s:gmatch("[^%s%-]+") do
        local n = text_length(word)
        maximum = math.max(maximum, n)
    end

    return maximum
end

-- Distribute widths while respecting minimum widths
local function allocate_widths(weights, minimums, n)
    local widths = {}
    local active = {}
    local remaining = 1.0
    local total_weight = 0

    for i = 1, n do
        active[i] = true
        total_weight = total_weight + weights[i]
    end

    -- Reserve minimum widths first
    while true do
        local proposed = {}
        local changed = false

        for i = 1, n do
            if active[i] then
                proposed[i] =
                    remaining * weights[i] / total_weight
            end
        end

        for i = 1, n do
            if active[i] and proposed[i] < minimums[i] then
                widths[i] = minimums[i]
                remaining = remaining - minimums[i]
                total_weight = total_weight - weights[i]
                active[i] = false
                changed = true
            end
        end

        if not changed then
            break
        end
    end

    -- Distribute the remaining space proportionally
    for i = 1, n do
        if active[i] then
            widths[i] = remaining * weights[i] / total_weight
        end
    end

    return widths
end

function Table(tbl)

    local n = #tbl.colspecs

    if n < 2 then
        return nil
    end

    local chars = {}
    local longest = {}

    for i = 1, n do
        chars[i] = 0
        longest[i] = 0
    end

    -- Measure the text in a row
    local function measure_row(row)
        local col = 1

        for _, cell in ipairs(row.cells) do
            local span = cell.col_span or 1

            -- Ignore merged cells when measuring individual columns
            if span == 1 and col <= n then
                local text = pandoc.utils.stringify(
                    cell.contents
                )

                chars[col] = chars[col] + text_length(text)

                longest[col] = math.max(
                    longest[col],
                    longest_word(text)
                )
            end

            col = col + span
        end
    end

    -- Measure header
    for _, row in ipairs(tbl.head.rows) do
        measure_row(row)
    end

    -- Measure body, including intermediate headers
    for _, body in ipairs(tbl.bodies) do
        for _, row in ipairs(body.head) do
            measure_row(row)
        end

        for _, row in ipairs(body.body) do
            measure_row(row)
        end
    end

    -- Measure footer
    for _, row in ipairs(tbl.foot.rows) do
        measure_row(row)
    end

    -- Calculate minimum widths and content weights
    local weights = {}
    local minimums = {}
    local min_sum = 0
    local total_chars = 0

    for i = 1, n do
        weights[i] = math.max(chars[i], 1)

        minimums[i] = math.min(
            math.max(
                (longest[i] + ATOM_PADDING) / CHARS_PER_LINE,
                MIN_WIDTH
            ),
            MAX_MIN_WIDTH
        )

        min_sum = min_sum + minimums[i]
        total_chars = total_chars + chars[i]
    end

    if total_chars == 0 then
        return nil
    end

    -- Avoid impossible minimum-width requirements
    if min_sum > 0.95 then
        local factor = 0.95 / min_sum

        for i = 1, n do
            minimums[i] = minimums[i] * factor
        end
    end

    -- Allocate widths
    local widths = allocate_widths(weights, minimums, n)

    -- Preserve the original column alignments
    for i = 1, n do
        local alignment = tbl.colspecs[i][1]

        tbl.colspecs[i] = {
            alignment,
            widths[i]
        }
    end

    return tbl
end
