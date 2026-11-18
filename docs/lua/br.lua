function RawInline(el)
    if el.format == "html" and el.text == "<br>" then
        return pandoc.RawInline("latex", "\\newline{}")
    end
end