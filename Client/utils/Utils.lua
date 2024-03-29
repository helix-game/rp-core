function table.wipe(tbl)
    for key in next, tbl do
        tbl[key] = nil
    end
end